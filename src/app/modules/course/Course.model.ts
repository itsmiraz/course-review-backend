import { Schema, model } from 'mongoose';
import { Tcourse } from './course.interface';

const courseSchema = new Schema<Tcourse>(
  {
    // Your Model according to the interface
  },

  {
    timestamps: true,
  },
);

export const course = model<Tcourse>('course', courseSchema);
