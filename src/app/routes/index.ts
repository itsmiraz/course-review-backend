import { Router } from 'express';

const router = Router();

const ModuleRoutes = [{}];

ModuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
