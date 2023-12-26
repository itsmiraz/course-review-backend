import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './User.servicee';
const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserIntoDb(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserIntoDb(req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User login successful',
    data: {
      user: result.user,
      token: result.accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserServices.changePasswordIntoDb(user, req.body);
  res.status(200).json({
    success: result?.success ? result?.success : true,
    statusCode: result?.statusCode ? result?.statusCode : 200,
    message: result?.message
      ? result?.message
      : 'Password changed successfully',
    data: result?.data,
  });
});

export const UserControllers = {
  registerUser,
  loginUser,
  changePassword,
};
