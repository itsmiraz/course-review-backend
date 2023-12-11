import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { CourseServices } from './course.servicee';
import { getDurationInWeeks } from './course.utils';

const createcourse = catchAsync(async (req, res) => {
  const payload = req.body;
  // console.log(payload);

  const durationInWeeks = getDurationInWeeks(
    payload.startDate,
    payload.endDate,
  );

  const NewCourse = {
    ...payload,
    durationInWeeks,
  };
  const result = await CourseServices.createcourseIntoDB(NewCourse);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllcourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllcoursesFromDb();
  res.status(200).json({
    success: true,
    message: 'courses successfully retrieved',
    data: result,
  });
});

const getSinglecourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const result = await CourseServices.getSinglecourseFromDb(courseId);

  res.status(200).json({
    success: true,
    message: 'Here is your course',
    data: result,
  });
});

const updatecourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updatecourseIntoDB(courseId, req.body);
  res.status(200).json({
    success: true,
    message: 'course Updated',
    data: result,
  });
});

const deletecourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.deletecourseIntoDB(courseId);
  res.status(200).json({
    success: true,
    message: 'course Deleted Successfully',
    data: result,
  });
});

export const courseControllers = {
  createcourse,
  getSinglecourse,
  getAllcourses,
  deletecourse,
  updatecourse,
};
