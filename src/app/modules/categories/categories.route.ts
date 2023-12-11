import express from 'express';
import { categoriesControllers } from './categories.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CatagoryValidation } from './categories.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CatagoryValidation.categoriesValidationSchema),
  categoriesControllers.createcategories,
);

router.get('/', categoriesControllers.getAllcategoriess);

export const CategoriesRoutes = router;
