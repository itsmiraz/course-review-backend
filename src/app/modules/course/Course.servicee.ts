import { Course } from './course.model';
import { TCourse } from './course.interface';

const createcourseIntoDB = async (payload: Tcourse) => {
  const result = await Course.create(payload);

  return result;
};

const getAllCoursesFromDb = async () => {
  const result = ''; // Your Business Logic
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id);

  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllcoursesFromDb,
  getSinglecourseFromDb,
  updatecourseIntoDB,
  deletecourseIntoDB,
};
