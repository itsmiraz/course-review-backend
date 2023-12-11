import express from 'express';
import { categoriesControllers } from './categories.controller';

const router = express.Router();

router.post('/', categoriesControllers.createcategories);

router.get('/', categoriesControllers.getAllcategoriess);

export const CategoriesRoutes = router;
