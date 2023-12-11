import { catchAsync } from './utils/catchAsync';
import { categoriesServices } from './categories.servicee';
const createcategories = catchAsync(async (req, res) => {
  const result = await categoriesServices.createcategoriesIntoDB(req.body);

  res.status(200).json({
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
    message: 'categoriess successfully retrieved',
    data: result,
  });
});

export const categoriesControllers = {
  createcategories,
  getAllcategoriess,
};
