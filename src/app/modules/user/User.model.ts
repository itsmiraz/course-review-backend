import { Schema, model } from 'mongoose';
import {
  TPasswod,
  TUser,
  TUserPasswordHistory,
  UserModel,
} from './User.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const passwordSchema = new Schema<TPasswod>(
  {
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const userPasswordHistorySchema = new Schema<TUserPasswordHistory>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  history: {
    type: [passwordSchema],
    required: true,
  },
});

const UserSchema = new Schema<TUser, UserModel>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Pre save middleware /hook
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //document
  // Hashing user password and save to the db
  //check this user password strength
  const weakPattern = /^(.{8,})$/;
  const mediumPattern = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!weakPattern.test(user.password)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User Passoword is Weak. Use More Stonger Password. Try to use Special Characters',
    );
  } else if (!mediumPattern.test(user.password)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User Passoword is Medium');
  } else if (!strongPattern.test(user.password)) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
    next();
  }
});

// Static Methods
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  HashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, HashedPassword);
};

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};
export const User = model<TUser, UserModel>('User', UserSchema);
export const UserPasswordHistory = model<TUserPasswordHistory>(
  'UserPasswordHistory',
  userPasswordHistorySchema,
);
