import { course } from './course.model';
import { Tcourse } from './course.interface';

const createcourseIntoDB = async (payload: Tcourse) => {
  const result = await course.create(payload);

  return result;
};

const getAllcoursesFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSinglecourseFromDb = async (id: string) => {
  const result = await course.findById(id);

  return result;
};

const updatecourseIntoDB = async (id: string, payload: Partial<Tcourse>) => {
  const result = await course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deletecourseIntoDB = async (id: string) => {
  const result = await course.findByIdAndDelete(id);
  return result;
};

export const courseServices = {
  createcourseIntoDB,
  getAllcoursesFromDb,
  getSinglecourseFromDb,
  updatecourseIntoDB,
  deletecourseIntoDB,
};
