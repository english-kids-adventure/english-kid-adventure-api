import { Router } from 'express';
import { TopicController } from './topic.controller';
import { authenticateJWT } from '@common/middlewares/auth.middleware';
import { validate } from '@common/middlewares/validate.middleware';
import { IdParamSchema } from '@common/constants/schema';

const topicRoutes: Router = Router();

topicRoutes.get('/', authenticateJWT, TopicController.getAllTopicsById);

topicRoutes.get('/:id/videos', authenticateJWT,validate(IdParamSchema), TopicController.getVideosByTopic);

export default topicRoutes;
