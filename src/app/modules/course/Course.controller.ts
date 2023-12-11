import { catchAsync } from '../../utils/catchAsync';
import { courseServices } from './course.servicee';
const createcourse = catchAsync(async (req, res) => {
  const result = await courseServices.createcourseIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'course successfully created',
    data: result,
  });
});

const getAllcourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllcoursesFromDb();
  res.status(200).json({
    success: true,
    message: 'courses successfully retrieved',
    data: result,
  });
});

const getSinglecourse = catchAsync(async (req, res) => {
  const courseId = req.params.id;
  const result = await courseServices.getSinglecourseFromDb(courseId);

  res.status(200).json({
    success: true,
    message: 'Here is your course',
    data: result,
  });
});

const updatecourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.updatecourseIntoDB(courseId, req.body);
  res.status(200).json({
    success: true,
    message: 'course Updated',
    data: result,
  });
});

const deletecourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.deletecourseIntoDB(courseId);
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
