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
    password: createStringSchema('Password')
      .min(6, 'Password Must be minimum 6 characters')
      .refine(
        (data) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(
            data,
          ),
        {
          message:
            'Password must be at least 6 characters long with at least one letter, one digit, and one special character (e.g., 1234A@)',
        },
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
    currentPassword: createStringSchema('New Password'),
    newPassword: createStringSchema('Old Password')
      .min(6, 'New Password Must be minimum 6 characters')
      .refine(
        (data) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(
            data,
          ),
        {
          message:
            'New Password must be at least 6 characters long with at least one letter, one digit, and one special character (e.g., 1234A@)',
        },
      ),
  }),
});

export const UserValidations = {
  registerUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
};
