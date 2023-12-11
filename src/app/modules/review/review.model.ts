import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';
import { Course } from '../course/course.model';
import AppError from '../../errors/AppError';

const reviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

reviewSchema.pre('save', async function (next) {
  const isCourseExist = await Course.findById(this.courseId);

  if (!isCourseExist) {
    throw new AppError(404, 'Course Does not Exist');
  }
  next();
});

export const Review = model<TReview>('Review', reviewSchema);
