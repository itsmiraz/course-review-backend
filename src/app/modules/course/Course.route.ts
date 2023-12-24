import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';

const createRouter = express.Router();
const router = express.Router();

createRouter.post(
  '/',
  validateRequest(CourseValidations.createCourseValidationSchema),
  courseControllers.createcourse,
);

router.get('/', courseControllers.getAllcourses);
router.put(
  '/:courseId',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  courseControllers.updatecourse,
);
router.get('/:courseId/reviews', courseControllers.getReviews);
createRouter.get('/best', courseControllers.getBestCourse);

export const createCourseRoutes = createRouter;
export const otherCourseRoutes = router;
