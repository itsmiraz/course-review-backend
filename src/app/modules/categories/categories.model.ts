import { Schema, model } from 'mongoose';
import { TCategories } from './categories.interface';

const categoriesSchema = new Schema<TCategories>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

export const Categories = model<TCategories>('categories', categoriesSchema);
