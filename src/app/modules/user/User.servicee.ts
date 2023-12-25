import { User } from './User.model';
import { TUser } from './User.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import config from '../../config';
import { createToken } from './User.utils';

const registerUserIntoDb = async (payload: TUser) => {
  const result = await User.create(payload);

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

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string,
  );

  return {
    user,
    accessToken,
  };
};

const getAllUsersFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSingleUserFromDb = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  registerUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  updateUserIntoDB,
  deleteUserIntoDB,
  loginUserIntoDb,
};
