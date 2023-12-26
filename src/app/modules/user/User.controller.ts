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

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb();
  res.status(200).json({
    success: true,
    message: 'Users successfully retrieved',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const UserId = req.params.id;
  const result = await UserServices.getSingleUserFromDb(UserId);

  res.status(200).json({
    success: true,
    message: 'Here is your User',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { UserId } = req.params;
  const result = await UserServices.updateUserIntoDB(UserId, req.body);
  res.status(200).json({
    success: true,
    message: 'User Updated',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { UserId } = req.params;
  const result = await UserServices.deleteUserIntoDB(UserId);
  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  loginUser,
  updateUser,
  changePassword,
};
