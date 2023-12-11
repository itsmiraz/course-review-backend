import express from 'express';
import { courseControllers } from './course.controller';

const router = express.Router();

router.post('/create', courseControllers.createcourse);

router.get('/', courseControllers.getAllcourses);
router.get('/:id', courseControllers.getSinglecourse);
router.patch('/:id', courseControllers.updatecourse);
router.delete('/:id', courseControllers.deletecourse);

export const CourseRoutes = router;
