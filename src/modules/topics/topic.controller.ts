import { NextFunction, Response } from 'express';
import { TopicService } from './topic.service';
import { HTTP_STATUS } from '@constants/global';
import { successResponse } from '@common/utils/response';
import { TOPIC_MESSAGE } from './topic.constant';
import { AuthRequest } from '@common/middlewares/auth.middleware';
import { getPaginationParameters } from '@common/utils/pagination';

export const TopicController = {
  async getAllTopicsById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { limit, offset, page, perPage } = getPaginationParameters(req);
      const userId = req.user?.userId as number;

      const results = await TopicService.getAllTopicsById(userId, {
        limit,
        offset,
        page,
        perPage,
      });
      return successResponse(
        res,
        results,
        TOPIC_MESSAGE.GET_TOPICS_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },

  async getVideosByTopic(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const topicId = parseInt(req.params.id);
      const userId = parseInt(req.user?.userId as string);
      const videos = await TopicService.getVideosByTopicId(topicId, userId);
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
