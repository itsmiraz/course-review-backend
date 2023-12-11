import { Course } from './course.model';
import { TCourse } from './course.interface';
import AppError from '../../errors/AppError';

const createcourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

const getAllcoursesFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }

  const excludeFields = [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
    'minPrice',
    'tags',
    'startDate endDate',
    'language',
    'provider',
    'durationInWeeks',
    'level',
  ];
  excludeFields.forEach((el) => delete queryObj[el]);

  //Pagination

  let page = 1;
  let limit = 10;
  let skip = 0;

  if (query?.limit) {
    limit = Number(query?.limit);
  }

  if (query?.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = Course.find({}).skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  const sortByFields = [
    'title',
    'price',
    'startDate',
    'endDate',
    'language',
    'duration',
  ];

  let sortBy = '-createdAt';
  if (query?.sortBy) {
    const sortByFieldExist = sortByFields.find((el) => el === query?.sortBy);
    if (!sortByFieldExist) {
      throw new AppError(400, 'Invalid Sort By Field');
    } else {
      sortBy = query?.sortBy as string;
    }
  }

  // createdAt:-1
  const sortByQuery = limitQuery.sort(sortBy);

  let sortByOder = '-createdAt';

  if (query?.sortOrder) {
    if (query?.sortOrder === 'asc') {
      sortByOder = 'createdAt';
    } else if (query?.sortOrder === 'desc') {
      sortByOder = '-createdAt';
    }
  }

  const sortByOrderQuery = sortByQuery.sort(sortByOder);

  let minPrice = 0;

  if (query?.minPrice) {
    minPrice = Number(query?.minPrice);
  }

  const minPriceQuery = sortByOrderQuery.find({
    price: { $gte: minPrice },
  });

  let maxPrice = {};

  if (query?.maxPrice) {
    maxPrice = {
      price: { $lte: maxPrice },
    };
  }

  const maxPriceQuery = minPriceQuery.find(maxPrice);

  let tag = {};

  if (query?.tags) {
    tag = { tags: { $elemMatch: { name: query?.tags as string } } };
  }

  const tagQuery = await maxPriceQuery.find(tag);

  return tagQuery;
};

const getSinglecourseFromDb = async (id: string) => {
  const result = await Course.findById(id);

  return result;
};

const updatecourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const result = await Course.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deletecourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseServices = {
  createcourseIntoDB,
  getAllcoursesFromDb,
  getSinglecourseFromDb,
  updatecourseIntoDB,
  deletecourseIntoDB,
};
