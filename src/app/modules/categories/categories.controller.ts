import { catchAsync } from '../../utils/catchAsync';
import { categoriesServices } from './categories.servicee';
const createcategories = catchAsync(async (req, res) => {
  const createdById = req.user._id;
  const result = await categoriesServices.createcategoriesIntoDB(
    createdById,
    req.body,
  );

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllcategoriess = catchAsync(async (req, res) => {
  const result = await categoriesServices.getAllcategoriessFromDb();
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const categoriesControllers = {
  createcategories,
  getAllcategoriess,
};
