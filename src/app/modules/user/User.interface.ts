import { Model } from 'mongoose';
import { USER_ROLE } from './User.constants';

/* eslint-disable no-unused-vars */
export interface TUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface UserModel extends Model<TUser> {
  isUserExistsWithUsername(username: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    HashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
