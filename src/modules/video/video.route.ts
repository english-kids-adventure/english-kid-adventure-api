import { Router } from 'express';
import { authenticateJWT } from '@middlewares/auth.middleware';
import { VideoController } from './video.controller';

const videoRoutes = Router();

videoRoutes.post(
  '/complete/:videoId',
  authenticateJWT,
  VideoController.completeVideo,
);
videoRoutes.post('/:videoId/unlock', authenticateJWT, VideoController.unlockVideo);
export default videoRoutes;
