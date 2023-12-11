import { catchAsync } from '../../utils/catchAsync';
import { CourseServices } from './Course.service';
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Course successfully created',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDb();
  res.status(200).json({
    success: true,
    message: 'Courses successfully retrieved',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const CourseId = req.params.id;
  const result = await CourseServices.getSingleCourseFromDb(CourseId);

  res.status(200).json({
    success: true,
    message: 'Here is your Course',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { CourseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(CourseId, req.body);
  res.status(200).json({
    success: true,
    message: 'Course Updated',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { CourseId } = req.params;
  const result = await CourseServices.deleteCourseIntoDB(CourseId);
  res.status(200).json({
    success: true,
    message: 'Course Deleted Successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
};
