import { Course } from './course.model';
import { TCourse } from './course.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Review } from '../review/review.model';

const createcourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

const getAllcoursesFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

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

  const metaData = {
    page: page,
    limit: limit,
    total: tagQuery?.length,
  };
  return {
    metaData,
    data: tagQuery,
  };
};

const updatecourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to Update Basic Details',
      );
    }

    // check if we have to delete any tags or not
    if (tags && tags.length > 0) {
      const willdeletedTags = tags
        .filter((el) => el.name && el.isDeleted)
        .map((el) => el.name);

      const deletedTagsInCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: willdeletedTags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedTagsInCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete tags');
      }
    }

    // check if we have to add any tags or not
    if (tags && tags.length > 0) {
      const willbeAddTags = tags.filter((el) => el.name && !el.isDeleted);

      const deletedTagsInCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            tags: { $each: willbeAddTags },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedTagsInCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Add tags');
      }
    }

    // check if we have to update the details
    if (details) {
      const modifiedData: Record<string, unknown> = {
        ...remainingCourseData,
      };

      if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
          modifiedData[`details.${key}`] = value;
        }
      }
      const updateDetailsData = await Course.findByIdAndUpdate(
        id,
        modifiedData,
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!updateDetailsData) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to Update Details Details',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id);
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const getReviewsFromDb = async (id: string) => {
  const course = await Course.findById(id);

  const reviews = await Review.find({ courseId: id });

  return {
    course,
    reviews,
  };
};

export const CourseServices = {
  createcourseIntoDB,
  getAllcoursesFromDb,
  updatecourseIntoDB,
  getReviewsFromDb,
};
