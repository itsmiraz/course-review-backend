import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import auth from '../../middlewares/auth';

const createRouter = express.Router();
const router = express.Router();

createRouter.post(
  '/',
  auth('admin'),
  validateRequest(CourseValidations.createCourseValidationSchema),
  courseControllers.createcourse,
);

router.get('/', courseControllers.getAllcourses);
router.put(
  '/:courseId',
  auth('admin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  courseControllers.updatecourse,
);
router.get('/:courseId/reviews', courseControllers.getReviews);
createRouter.get('/best', courseControllers.getBestCourse);

export const createCourseRoutes = createRouter;
export const otherCourseRoutes = router;
