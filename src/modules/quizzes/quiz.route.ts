import { Router } from 'express';
import { QuizController } from './quiz.controller';
import { authenticateJWT } from '@common/middlewares/auth.middleware';

const quizRoutes: Router = Router();

quizRoutes.get(
  '/video/:videoId',
  authenticateJWT,
  QuizController.getQuizByVideoId,
);

export default quizRoutes;
