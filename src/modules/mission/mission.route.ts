import { Router } from 'express';
import { MissionController } from './mission.controller';
import { authenticateJWT } from '@middlewares/auth.middleware';

const missionRoutes = Router();

missionRoutes.get('/', authenticateJWT, MissionController.getTodayMissions);
missionRoutes.get('/today', authenticateJWT, MissionController.getTodayMissions);
missionRoutes.post('/claim', authenticateJWT, MissionController.claimMission);

export default missionRoutes;
