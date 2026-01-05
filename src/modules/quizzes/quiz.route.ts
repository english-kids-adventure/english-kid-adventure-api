import { Router } from 'express';
import { QuizController } from './quiz.controller';
import { authenticateJWT } from '@common/middlewares/auth.middleware';

const quizRoutes: Router = Router();

quizRoutes.get(
  '/video/:videoId',
  authenticateJWT,
  QuizController.getQuizByVideoId,
);

quizRoutes.get(
  '/attempts/:videoId',
  authenticateJWT,
  QuizController.getUserQuizAttempts,
);

quizRoutes.post(
  '/video/:videoId/submit',
  authenticateJWT,
  QuizController.submitQuiz,
);

export default quizRoutes;
