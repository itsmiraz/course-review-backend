import { z } from 'zod';
const createStringSchema = (fieldName: string) =>
  z.string({
    invalid_type_error: `${fieldName} must be a string`,
    required_error: `${fieldName} is required`,
  });
const registerUserValidationSchema = z.object({
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
const loginUserValidationSchema = z.object({
  body: z.object({
    username: createStringSchema('User Name'),
    password: createStringSchema('Password'),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    newPassword: createStringSchema('New Password'),
    oldPassword: createStringSchema('Old Password'),
  }),
});

export const UserValidations = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
};
