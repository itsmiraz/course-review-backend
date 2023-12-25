import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/User.interface';
import { User } from '../modules/user/User.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      throw new AppError(404, 'User Not Found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized -');
    }
    req.user = decoded;
    next();
  });
};

export default auth;
