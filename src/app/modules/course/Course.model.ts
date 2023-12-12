import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTag } from './course.interface';

const tagSchema = new Schema<TTag>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const detailSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const courseSchema = new Schema<TCourse>(
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
  },

  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('course', courseSchema);
