import express from 'express';
import { courseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CourseValidations.createCourseValidationSchema),
  courseControllers.createcourse,
);

router.get('/', courseControllers.getAllcourses);
router.get('/:id', courseControllers.getSinglecourse);
router.patch('/:id', courseControllers.updatecourse);
router.delete('/:id', courseControllers.deletecourse);

export const CourseRoutes = router;
