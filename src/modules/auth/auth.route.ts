import { Router } from 'express';
import { AuthController } from './auth.controller';

const authRoutes: Router = Router();

authRoutes.post('/register', AuthController.register);
export default authRoutes;
