import { Router } from 'express';
import {
  createCourseRoutes,
  otherCourseRoutes,
} from '../modules/course/course.route';
import { CategoriesRoutes } from '../modules/categories/categories.route';

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
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
