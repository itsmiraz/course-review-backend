import { User } from './User.model';
import { TUser } from './User.interface';

const registerUserIntoDb = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
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
};
