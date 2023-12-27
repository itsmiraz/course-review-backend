import { Schema, model } from 'mongoose';
import { CourseModel, TCourse, TDetails, TTag } from './course.interface';
import { Categories } from '../categories/categories.model';
import AppError from '../../errors/AppError';

const tagSchema = new Schema<TTag>(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);
const detailSchema = new Schema<TDetails>(
  {
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse, CourseModel>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [tagSchema],
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
      required: true,
    },
    details: {
      type: detailSchema,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.pre('save', async function (next) {
  const isCatagoryExists = await Categories.findById(this.categoryId);
  if (!isCatagoryExists) {
    throw new AppError(404, 'Catagory Does not exists!');
  }
  next();
});

courseSchema.statics.isCourseExists = async function (id: string) {
  const existingCourse = await Course.findById(id);

  return existingCourse;
};

export const Course = model<TCourse, CourseModel>('course', courseSchema);
