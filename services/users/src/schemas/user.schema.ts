import z from 'zod';

export const registerSchema = z.object({
  email: z.email('Invalid email'),
  name: z.string().min(2, 'Username must contain at least 2 characters').max(100, 'Username too long'),
  password: z.string().min(2, 'Password must contain at least 2 characters').max(100, 'Password too long'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password cant be empty'),
});
