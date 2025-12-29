import { NextFunction, Request, Response } from 'express';
import { TopicService } from './topic.service';
import { HTTP_STATUS } from '@constants/global';
import { successResponse } from '@common/utils/response';
import { TOPIC_MESSAGE } from './topic.constant';
import { AuthRequest } from '@common/middlewares/auth.middleware';

export const TopicController = {
  async getAllTopicsById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as number;

      const limit = parseInt(req.query.limit as string) || 10;

      const cursor = req.query.cursor
        ? parseInt(req.query.cursor as string)
        : undefined;

      const topics = await TopicService.getAllTopicsById(userId, limit, cursor);

      return successResponse(
        res,
        topics,
        TOPIC_MESSAGE.GET_TOPICS_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },

  async getVideosByTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topicId = parseInt(req.params.id as string);

      if (isNaN(topicId)) {
        return res.status(400).json({
          success: false,
          error: TOPIC_MESSAGE.INVALID_TOPIC_ID,
        });
      }

      const videos = await TopicService.getVideosByTopicId(topicId);
      return successResponse(
        res,
        videos,
        TOPIC_MESSAGE.GET_VIDEOS_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },
};
