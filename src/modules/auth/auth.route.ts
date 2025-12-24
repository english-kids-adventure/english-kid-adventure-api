import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '@middlewares/validate.middleware';
import { RegisterSchema } from './auth.schema';
import { rateLimiter } from '@middlewares/rateLimiter.middleware';

const authRoutes: Router = Router();

authRoutes.post(
  '/register',
  rateLimiter({ limit: 5, windowTime: 60 }),
  validate(RegisterSchema),
  AuthController.register,
);
export default authRoutes;
