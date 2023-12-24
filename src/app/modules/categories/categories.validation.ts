import { z } from 'zod';

const categoriesValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    createdBy: z.string(),
  }),
});
export const CatagoryValidation = {
  categoriesValidationSchema,
};
