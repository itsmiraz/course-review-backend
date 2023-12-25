import { Router } from 'express';
import {
  createCourseRoutes,
  otherCourseRoutes,
} from '../modules/course/course.route';
import { CategoriesRoutes } from '../modules/categories/categories.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { UserRoutes } from '../modules/user/User.route';

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
  {
    path: '/auth',
    route: UserRoutes,
  },
];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
