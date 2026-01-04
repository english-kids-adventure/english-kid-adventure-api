import { AuthRequest } from '@common/middlewares/auth.middleware';
import { Response, NextFunction } from 'express';
import { VideoService } from './video.service';
import { successResponse } from '@common/utils/response';
import { HTTP_STATUS } from '@common/constants/global';
import { VIDEO_MESSAGE } from './video.constant';

export const VideoController = {
  async completeVideo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId as number;

      const videoId = parseInt(req.params.videoId, 10);

      const result = await VideoService.completeVideoForUser(userId, videoId);

      return successResponse(
        res,
        result,
        VIDEO_MESSAGE.VIDEO_COMPLETED_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },
};
