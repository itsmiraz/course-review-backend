import { Types } from 'mongoose';

export type TCategories = {
  name: string;
  createdBy: Types.ObjectId;
};
