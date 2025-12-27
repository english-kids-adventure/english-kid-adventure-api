import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '@middlewares/validate.middleware';
import { RegisterSchema, LoginSchema } from './auth.schema';
import { rateLimiter } from '@middlewares/rateLimiter.middleware';

const authRoutes: Router = Router();

authRoutes.post(
  '/register',
  rateLimiter({ limit: 5, windowTime: 60 }),
  validate(RegisterSchema),
  AuthController.register,
);
authRoutes.post(
  '/login',
  rateLimiter({ limit: 10, windowTime: 60 }),
  validate(LoginSchema),
  AuthController.login,
);
authRoutes.post('/refresh-token', AuthController.refreshToken);
authRoutes.post('/logout', AuthController.logout);

export default authRoutes;
