import { prisma } from '@config/prisma';
import { Mission, UserMissionProgress } from '../../../generated/prisma';
import { UpsertMissionProgressParams } from './mission.type';

export const MissionRepository = {
  async getAllMissions(): Promise<Mission[]> {
    return prisma.mission.findMany();
  },

  async getMissionByCode(code: string): Promise<Mission | null> {
    return prisma.mission.findUnique({ where: { code } });
  },

  async getMissionById(id: number): Promise<Mission | null> {
    return prisma.mission.findUnique({ where: { id } });
  },

  async getUserProgressByDate(
    userId: number,
    resetDate: Date,
  ): Promise<UserMissionProgress[]> {
    return prisma.userMissionProgress.findMany({
      where: { userId, resetDate },
    });
  },

  async getUserMissionProgress(
    userId: number,
    missionId: number,
    resetDate: Date,
  ): Promise<UserMissionProgress | null> {
    return prisma.userMissionProgress.findUnique({
      where: { userId_missionId_resetDate: { userId, missionId, resetDate } },
    });
  },

  async upsertMissionProgress(
    params: UpsertMissionProgressParams,
  ): Promise<UserMissionProgress> {
    const { userId, missionId, resetDate, isClaimed, amount } = params;
    return prisma.userMissionProgress.upsert({
      where: { userId_missionId_resetDate: { userId, missionId, resetDate } },
      update: { currentCount: { increment: amount }, isClaimed },
      create: {
        userId,
        missionId,
        currentCount: amount,
        isClaimed: isClaimed ?? false,
        resetDate,
      },
    });
  },
};
