import { Router } from 'express';
import { CourseRoutes } from '../modules/course/Course.route';

const router = Router();

const ModuleRoutes = [
  {
    path: '/course',
    route: CourseRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
