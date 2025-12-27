import { NextFunction, Request, Response } from 'express';
import { TopicService } from './topic.service';
import { HTTP_STATUS } from '@constants/global';
import { successResponse } from '@common/utils/response';
import { TOPIC_MESSAGE } from './topic.constant';

export const TopicController = {
  async getAllTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await TopicService.getAllTopics();
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
