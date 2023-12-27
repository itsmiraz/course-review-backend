import { Categories } from './categories.model';
import { TCategories } from './categories.interface';

const createcategoriesIntoDB = async (
  createdById: string,
  payload: TCategories,
) => {
  const result = await Categories.create({
    ...payload,
    createdBy: createdById,
  });
  return result;
};

const getAllcategoriessFromDb = async () => {
  const result = await Categories.find({}).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v', // Exclude createdAt, updatedAt, and __v
  }); 
  return { categories: result };
};

export const categoriesServices = {
  createcategoriesIntoDB,
  getAllcategoriessFromDb,
};
