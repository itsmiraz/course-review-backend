import { Course } from './course.model';
import { TCourse } from './course.interface';

const createcourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

const getAllcoursesFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSinglecourseFromDb = async (id: string) => {
  const result = await Course.findById(id);

  return result;
};

const updatecourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deletecourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseServices = {
  createcourseIntoDB,
  getAllcoursesFromDb,
  getSinglecourseFromDb,
  updatecourseIntoDB,
  deletecourseIntoDB,
};
