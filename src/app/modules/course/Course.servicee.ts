import { Course } from './course.model';
import { TCourse } from './course.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { Review } from '../review/review.model';
import { getDurationInWeeks } from './course.utils';

const createcourseIntoDB = async (createdBy: string, payload: TCourse) => {
  const result = await Course.create({
    ...payload,
    createdBy: createdBy,
  });

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
    'startDate',
    'endDate',
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
  const paginateQuery = Course.find({})
    .populate({
      path: 'createdBy',
      select: '-createdAt -updatedAt -__v', // Exclude createdAt, updatedAt, and __v
    })
    .skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  const sortByFields = [
    'title',
    'price',
    'startDate',
    'endDate',
    'language',
    'duration',
  ];

  let sortBy = '__v';
  if (query?.sortBy) {
    const sortByFieldExist = sortByFields.find((el) => el === query?.sortBy);
    if (!sortByFieldExist) {
      throw new AppError(400, 'Invalid Sort By Field');
    } else {
      sortBy = query?.sortBy as string;
    }
  }
  // createdAt:-1
  const sortByQuery = limitQuery.sort({ [sortBy]: 1 });

  let sortByOrder = '__v';
  if (query?.sortOrder) {
    if (query?.sortOrder === 'asc') {
      sortByOrder = 'createdAt';
    } else if (query?.sortOrder === 'desc') {
      sortByOrder = '-createdAt';
    }
  }

  const sortByOrderQuery = sortByQuery.sort(sortByOrder);

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
      price: { $lte: Number(query?.maxPrice) },
    };
  }

  const maxPriceQuery = minPriceQuery.find(maxPrice);

  let tag = {};

  if (query?.tags) {
    tag = { tags: { $elemMatch: { name: query?.tags as string } } };
  }

  const tagQuery = maxPriceQuery.find(tag);

  let language = {};
  if (query?.language) {
    language = { language: query?.language };
  }

  const languageQuery = tagQuery.find(language);

  let startDate = {};
  if (query?.startDate) {
    startDate = { startDate: query?.startDate };
  }

  const startDateQuery = languageQuery.find(startDate);

  let endDate = {};
  if (query?.endDate) {
    endDate = { endDate: query?.endDate };
  }

  const endDateQuery = startDateQuery.find(endDate);

  let provider = {};
  if (query?.provider) {
    provider = { provider: query?.provider };
  }
  const providerQuery = endDateQuery.find(provider);

  let durationInWeeks = {};
  if (query?.durationInWeeks) {
    durationInWeeks = { durationInWeeks: query?.durationInWeeks };
  }

  const durationInWeeksQuery = providerQuery.find(durationInWeeks);

  let level = {};
  if (query?.level) {
    level = { 'details.level': query?.level };
  }

  const levelQuery = await durationInWeeksQuery.find(level);
  const metaData = {
    page: page,
    limit: limit,
    total: levelQuery.length,
  };
  return {
    metaData,
    data: { courses: levelQuery },
  };
};

const updatecourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const {
    tags,
    details,
    startDate,
    endDate,
    durationInWeeks,
    ...remainingCourseData
  } = payload;

  const course = await Course.isCourseExists(id);

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course Not Found');
  }

  if (durationInWeeks && durationInWeeks !== course?.durationInWeeks) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Duration in Weeks can not be updated directly',
    );
  }
  let newdurationInWeeks = 0;
  if (startDate || endDate) {
    newdurationInWeeks = getDurationInWeeks(
      (startDate as string) || (course?.startDate as string),
      (endDate as string) || (course?.endDate as string),
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (startDate || endDate) {
      const updateDurationInWeeks = await Course.findByIdAndUpdate(
        id,
        {
          startDate: startDate || course?.startDate,
          endDate: endDate || course?.endDate,

          durationInWeeks: newdurationInWeeks,
        },
        {
          new: true,
          session,
        },
      );
      if (!updateDurationInWeeks) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to Update Duration In Weeks',
        );
      }
    }

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

    const result = await Course.findById(id).populate({
      path: 'createdBy',
      select: '-createdAt -updatedAt -__v', // Exclude createdAt, updatedAt, and __v
    });
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const getReviewsFromDb = async (id: string) => {
  const course = await Course.findById(id).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v', // Exclude createdAt, updatedAt, and __v
  });

  const reviews = await Review.find({ courseId: id }).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v', // Exclude createdAt, updatedAt, and __v
  });

  return {
    course,
    reviews,
  };
};

const getBestCourseFromDb = async () => {
  const reviews = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        count: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
    {
      $project: {
        _id: 1,
        count: 1,
        averageRating: { $round: ['$averageRating', 2] },
      },
    },
  ]);

  const bestCourseReviewData = reviews[0];

  const course = await Course.findById(bestCourseReviewData._id).populate(
    'createdBy',
  );

  const result = {
    course: course,
    averageRating: bestCourseReviewData.averageRating,
    reviewCount: bestCourseReviewData.count,
  };

  return result;
};

export const CourseServices = {
  createcourseIntoDB,
  getAllcoursesFromDb,
  updatecourseIntoDB,
  getReviewsFromDb,
  getBestCourseFromDb,
};
