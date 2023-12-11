import { z } from 'zod';
const createStringSchema = (fieldName: string) =>
  z
    .string({
      invalid_type_error: `${fieldName} must be a string`,
      required_error: `${fieldName} is required`,
    })
    .transform((data) => data.trim());
const createNumberSchema = (fieldName: string) =>
  z.number({
    invalid_type_error: `${fieldName} must be a string`,
    required_error: `${fieldName} is required`,
  });

const tagValidationSchema = z.object({
  name: createStringSchema('Tag Name'),
  isDeleted: z.boolean(),
});
const detailValidationSchema = z.object({
  level: createStringSchema('Level'),
  description: createStringSchema('Description'),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: createStringSchema('Title'),
    instructor: createStringSchema('Instructor'),
    categoryId: createStringSchema('Category Id'),
    price: createNumberSchema('Price'),
    tags: z.array(tagValidationSchema),
    startDate: createStringSchema('Start Date'),
    endDate: createStringSchema('End Date'),
    language: createStringSchema('Language'),
    provider: createStringSchema('Provider'),
    details: detailValidationSchema,
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
};
