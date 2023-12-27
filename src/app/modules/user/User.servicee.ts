import { User, UserPasswordHistory } from './User.model';
import { TUser } from './User.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import { createToken } from './User.utils';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

const registerUserIntoDb = async (payload: TUser) => {
  const result = await User.create(payload);
  const storePassword = new UserPasswordHistory({
    user: result._id,
    history: [
      {
        password: result.password,
      },
    ],
  });
  await storePassword.save();

  return result;
};

const loginUserIntoDb = async (payload: Partial<TUser>) => {
  const user = await User.findOne({ username: payload.username }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(404, 'User Not Found');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password as string,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password');
  }

  const jwtPayload = {
    _id: user._id, // User's _id
    role: user.role, // User's role
    email: user.email,
  };

  const userData = {
    _id: user._id, // User's _id
    username: user.username, // User's _id
    email: user.email,
    role: user.role, // User's role
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string,
  );

  return {
    user: {
      userData,
    },
    accessToken,
  };
};

const changePasswordIntoDb = async (
  user: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const isUserExists = await User.findById(user._id).select('+password');
  if (!isUserExists) {
    throw new AppError(404, 'User Not Found');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.currentPassword,
    isUserExists.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Old Password');
  }

  // check if the new password is exist on last two password

  /**
   * Get Latest Two Passwords from the password history
   * Add checks that the new password already exists on the history
   * If exists throw error
   */
  const LastPasswords = await UserPasswordHistory.aggregate([
    {
      $match: {
        user: new Types.ObjectId(user._id),
      },
    },
    {
      $project: {
        _id: 0,
        result: {
          $sortArray: { input: '$history', sortBy: { createdAt: -1 } },
        },
      },
    },
    {
      $limit: 2,
    },
  ]);
  const LastTwoPasswords = LastPasswords[0]?.result?.slice(0, 2);

  for (const Password of LastTwoPasswords) {
    const isPasswordExists = await bcrypt.compare(
      payload.newPassword,
      Password.password,
    );
    if (isPasswordExists) {
      return {
        statusCode: 400,
        success: false,
        message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${new Date(
          Password.createdAt,
        )}).`,
        data: null,
      };
      // throw new AppError(
      //   httpStatus.BAD_REQUEST,
      //   `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${new Date(
      //     Password.createdAt,
      //   )}).`,
      // );
    }
  }
  // const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  // console.log(strongPattern.test(payload.newPassword));

  // //  const pattern = new RegExp
  // if (!strongPattern.test(payload.newPassword)) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     'User Passoword is Weak. Use More Stonger Password. Try to use Special Characters',
  //   );
  // }

  // hash new Pass
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findByIdAndUpdate(
    user._id,
    {
      password: newHashedPassword,
    },
    { new: true },
  );

  // Storing new Password into user History
  await UserPasswordHistory.findOneAndUpdate(
    {
      user: user._id,
    },
    {
      $addToSet: {
        history: {
          password: newHashedPassword,
        },
      },
    },
  );
  return {
    data: result,
  };
};

export const UserServices = {
  registerUserIntoDb,
  loginUserIntoDb,
  changePasswordIntoDb,
};
