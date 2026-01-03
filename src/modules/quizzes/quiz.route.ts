import { Router } from 'express';
import { QuizController } from './quiz.controller';
import { authenticateJWT } from '@common/middlewares/auth.middleware';
import { validate } from '@common/middlewares/validate.middleware';
import { VideoIdParamSchema } from '@common/constants/schema';

const quizRoutes: Router = Router();

quizRoutes.get(
  '/video/:videoId',
  authenticateJWT,
  validate(VideoIdParamSchema),
  QuizController.getQuizByVideoId,
);

export default quizRoutes;
