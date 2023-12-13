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
  const query = req.query;

  const result = await CourseServices.getAllcoursesFromDb(query);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta: result.metaData,
    data: result.data,
  });
});

const updatecourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updatecourseIntoDB(courseId, req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: result,
  });
});

const getReviews = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.getReviewsFromDb(courseId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});
const getBestCourse = catchAsync(async (req, res) => {
  // const { courseId } = req.params;

  const result = await CourseServices.getBestCourseFromDb();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const courseControllers = {
  createcourse,
  getAllcourses,
  updatecourse,
  getReviews,
  getBestCourse,
};
