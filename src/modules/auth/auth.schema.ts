import z from 'zod';

export const RegisterSchema = z.object({
  name: z.string('Name is required!').min(2),
  email: z.string('Email is required!'),
  password: z.string('Password is required!').min(6),
});
