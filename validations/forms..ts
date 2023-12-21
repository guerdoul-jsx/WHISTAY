import * as z from 'zod';

export const fullNameSchema = z
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
  .min(5, {
    message: 'Name must be made of at least 5 characters',
  })
  .max(64, {
    message: 'Name must be made of at most 64 characters',
  });

export const emailSchema = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  })
  .min(5, {
    message: 'Email must be made of at least 5 characters',
  })
  .max(64, {
    message: 'Email must be made of at most 64 characters',
  })
  .email({
    message: 'Please enter a valid email address',
  });

export const passwordSchema = z
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(8, {
    message: 'Password must be at least 8 characters',
  })
  .max(256, {
    message: 'Password must be at most 256 characters',
  });

export const passwordUpdateSchema = z
  .object({
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          'Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character',
      }
    ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const boolean = z.boolean({
  required_error: 'You must agree our terms & privacy policy',
  invalid_type_error: 'Field must be a boolean',
});

export const emailVerificationSchema = z.object({
  email: emailSchema,
});

export const newsletterSignUpSchema = z.object({
  email: emailSchema,
});

export const contactFormSchema = z.object({
  email: emailSchema,
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .max(128, {
      message: 'Name must be made of at most 128 characters',
    }),
  message: z
    .string({
      required_error: 'Message is required',
      invalid_type_error: 'Message must be a string',
    })
    .max(10240, {
      message: 'Message must be made of at most 10240 characters',
    }),
});

// FORMS
export const signUpSchema = z
  .object({
    name: fullNameSchema,
    email: emailSchema,
    password: passwordSchema.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      {
        message:
          'Password must contain at least 8 characters, including one uppercase, one lowercase, one number and one special character',
      }
    ),
    confirmPassword: z.string(),
    isAgreed: boolean,
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  remember: boolean,
});
