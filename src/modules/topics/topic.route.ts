import { Router } from 'express';
import { TopicController } from './topic.controller';
import { authenticateJWT } from '@common/middlewares/auth.middleware';

const topicRoutes: Router = Router();

topicRoutes.get('/', authenticateJWT, TopicController.getAllTopicsById);

topicRoutes.get('/:id/videos', authenticateJWT, TopicController.getVideosByTopic);

export default topicRoutes;
