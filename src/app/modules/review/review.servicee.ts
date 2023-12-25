import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (createdBy: string, payload: TReview) => {
  const createReview = await Review.create({
    ...payload,
    createdBy: createdBy,
  });
  const result = await Review.findById(createReview._id).populate('createdBy');
  return result;
};

const getAllReviewsFromDb = async () => {
  const result = await Review.find({}); // Your Business Logic
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDb,
};
