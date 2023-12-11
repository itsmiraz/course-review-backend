import { Router } from 'express';
import {
  createCourseRoutes,
  otherCourseRoutes,
} from '../modules/course/course.route';
import { CategoriesRoutes } from '../modules/categories/categories.route';
import { ReviewRoutes } from '../modules/review/review.route';

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
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
