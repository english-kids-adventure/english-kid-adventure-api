import { Router } from 'express';
import { UserController } from './user.controller';
import { authenticateJWT } from '@middlewares/auth.middleware';

const userRoutes = Router();

userRoutes.get('/profile', authenticateJWT, UserController.getProfile);
userRoutes.get('/leaderboard', authenticateJWT, UserController.getLeaderboard);
export default userRoutes;
