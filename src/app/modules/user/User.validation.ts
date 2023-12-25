import { z } from 'zod';
const createStringSchema = (fieldName: string) =>
  z.string({
    invalid_type_error: `${fieldName} must be a string`,
    required_error: `${fieldName} is required`,
  });
const createUserValidationSchema = z.object({
  body: z.object({
    username: createStringSchema('User Name'),
    email: createStringSchema('Email'),
    password: createStringSchema('Password').min(
      6,
      'Password Must be minimum 6 characters',
    ),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
