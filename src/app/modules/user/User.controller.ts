import { catchAsync } from '../../utils/catchAsync';
import { UserServices } from './User.service';
const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'User successfully created',
    data: result,
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
  createUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
