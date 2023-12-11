import express from 'express';
import { CourseControllers } from './Course.controller';

const router = express.Router();

router.post('/create', CourseControllers.createCourse);

router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.patch('/:id', CourseControllers.updateCourse);
router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
