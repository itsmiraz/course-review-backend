import { Router } from 'express';
import {
  createCourseRoutes,
  otherCourseRoutes,
} from '../modules/course/course.route';

const router = Router();

const ModuleRoutes = [
  {
    path: '/course',
    route: createCourseRoutes,
  },
  {
    path: '/courses',
    route: otherCourseRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
