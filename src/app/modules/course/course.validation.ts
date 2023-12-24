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
    invalid_type_error: `${fieldName} must be a number`,
    required_error: `${fieldName} is required`,
  });

const createtagValidationSchema = z.object({
  name: createStringSchema('Tag Name'),
  isDeleted: z.boolean(),
});
const createdetailValidationSchema = z.object({
  level: createStringSchema('Level'),
  description: createStringSchema('Description'),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: createStringSchema('Title'),
    instructor: createStringSchema('Instructor'),
    categoryId: createStringSchema('Category Id'),
    price: createNumberSchema('Price'),
    tags: z.array(createtagValidationSchema),
    startDate: createStringSchema('Start Date'),
    endDate: createStringSchema('End Date'),
    language: createStringSchema('Language'),
    provider: createStringSchema('Provider'),
    details: createdetailValidationSchema,
    createdBy: createStringSchema('Created By'),
  }),
});

const updateTagValidationSchema = z.object({
  name: createStringSchema('Tag Name'),
  isDeleted: z.boolean(),
});
const updateDetailValidationSchema = z.object({
  level: createStringSchema('Level').optional(),
  description: createStringSchema('Description').optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: createStringSchema('Title').optional(),
    instructor: createStringSchema('Instructor').optional(),
    categoryId: createStringSchema('Category Id').optional(),
    price: createNumberSchema('Price').optional(),
    tags: z.array(updateTagValidationSchema).optional(),
    startDate: createStringSchema('Start Date').optional(),
    endDate: createStringSchema('End Date').optional(),
    language: createStringSchema('Language').optional(),
    provider: createStringSchema('Provider').optional(),
    details: updateDetailValidationSchema.optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
