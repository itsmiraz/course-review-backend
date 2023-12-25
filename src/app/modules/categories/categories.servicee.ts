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
  const result = await Categories.find({}); // Your Business Logic
  return result;
};

export const categoriesServices = {
  createcategoriesIntoDB,
  getAllcategoriessFromDb,
};
