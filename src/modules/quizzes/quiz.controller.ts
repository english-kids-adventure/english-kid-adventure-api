import { NextFunction, Request, Response } from 'express';
import { QuizService } from './quiz.service';
import { HTTP_STATUS } from '@constants/global';
import { successResponse } from '@common/utils/response';
import { QUIZ_MESSAGE } from './quiz.constant';

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
};
