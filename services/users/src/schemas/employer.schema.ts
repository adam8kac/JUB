import z from 'zod';

export const employerRegisterSchema = z
  .object({
    companyRegistrationNumber: z.string(),
    email: z.string().email('Invalid email'),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const empolyerLoginSchema = z
  .object({
    companyRegistrationNumber: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string(),
  })
  .refine((data) => !!data.companyRegistrationNumber || !!data.email, {
    message: 'Provide at least email or company registration number',
    path: ['companyRegistrationNumber', 'email'],
  });
