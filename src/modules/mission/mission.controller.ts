import { NextFunction, Response } from 'express';
import { AuthRequest } from '@middlewares/auth.middleware';
import { successResponse } from '@utils/response';
import { HTTP_STATUS } from '@constants/global';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';
import { MissionService } from './mission.service';
import { MISSION_MESSAGE } from './mission.constant';
import { ClaimMissionRequestDto } from './mission.type';

export const MissionController = {
  async getTodayMissions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error(AUTH_MESSAGE.UNAUTHORIZED);
      }
      const missions = await MissionService.getTodayMissions(req.user);
      return successResponse(
        res,
        missions,
        MISSION_MESSAGE.GET_MISSIONS_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },

  async claimMission(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new Error(AUTH_MESSAGE.UNAUTHORIZED);
      }

      const { missionId } = req.body as ClaimMissionRequestDto;

      const parsedMissionId = Number(missionId);
      if (!parsedMissionId) {
        throw new Error(MISSION_MESSAGE.MISSION_NOT_FOUND);
      }

      const rewards = await MissionService.claimMission(
        req.user,
        parsedMissionId,
      );

      return successResponse(
        res,
        rewards,
        MISSION_MESSAGE.CLAIM_SUCCESS,
        HTTP_STATUS.OK,
      );
    } catch (error) {
      next(error);
    }
  },
};
