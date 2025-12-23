import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middlewares/validate';
import { RegisterSchema } from './auth.schema';

const authRoutes: Router = Router();

authRoutes.post('/register', validate(RegisterSchema), AuthController.register);
export default authRoutes;
