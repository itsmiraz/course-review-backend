import { Schema, model } from 'mongoose';
import { TCourse } from './Course.interface';

const CourseSchema = new Schema<TCourse>(
  {
    // Your Model according to the interface
  },

  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', CourseSchema);
