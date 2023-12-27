import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (createdBy: string, payload: TReview) => {
  const createReview = await Review.create({
    ...payload,
    createdBy: createdBy,
  });
  const result = await Review.findById(createReview._id).populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v', // Exclude createdAt, updatedAt, and __v
  });
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
