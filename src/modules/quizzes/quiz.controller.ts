import { NextFunction, Request, Response } from 'express';
import { QuizService } from './quiz.service';
import { HTTP_STATUS } from '@constants/global';
import { successResponse } from '@common/utils/response';
import { QUIZ_MESSAGE } from './quiz.constant';
import { AuthRequest } from '@common/middlewares/auth.middleware';

export const QuizController = {
  async getQuizByVideoId(req: Request, res: Response, next: NextFunction) {
    try {
      const videoId = parseInt(req.params.videoId);
      const quiz = await QuizService.getQuizByVideoId(videoId);
      return successResponse(
        res,
        quiz,
        QUIZ_MESSAGE.GET_QUIZ_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },

  async submitQuiz(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as number;
      const videoId = parseInt(req.params.videoId, 10);
      const { correctAnswers, totalQuestions } = req.body;

      const result = await QuizService.submitQuizForUser(
        userId,
        videoId,
        correctAnswers,
        totalQuestions,
      );

      return successResponse(
        res,
        result,
        QUIZ_MESSAGE.QUIZ_SUBMITTED_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },

  async getUserQuizAttempts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as number;
      const attempts = await QuizService.getUserQuizAttempts(userId);
      return successResponse(
        res,
        attempts,
        QUIZ_MESSAGE.GET_QUIZ_ATTEMPTS_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },
};
