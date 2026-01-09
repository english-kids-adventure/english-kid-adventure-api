import { prisma } from '@config/prisma';
import { JwtPayload } from '@middlewares/auth.middleware';
import { formatDateUTC, getStartOfCurrentWeekUTC, getStartOfTodayUTC } from '@utils/date';
import { MissionRepository } from './mission.repository';
import { MISSION_MESSAGE } from './mission.constant';
import { MissionResponseDto, ClaimMissionResponseDto } from './mission.type';

export const MissionService = {
  async getTodayMissions(user: JwtPayload): Promise<MissionResponseDto[]> {
    const userId = Number(user.userId);
    const today = getStartOfTodayUTC();
    const startOfWeek = getStartOfCurrentWeekUTC();
    const [missions, dailyProgress, weeklyProgress] = await Promise.all([
      MissionRepository.getAllMissions(),
      MissionRepository.getUserProgressByDate(userId, today),
      MissionRepository.getUserProgressByDate(userId, startOfWeek),
    ]);
    const allProgress = [...dailyProgress, ...weeklyProgress];
    const progressMap = new Map(allProgress.map((item) => [item.missionId, item]));
    const rankMap: Record<string, number> = { 'W1': 1, 'W2': 2, 'W3': 3 };

    return missions.flatMap((mission) => {
      const userProgress = progressMap.get(mission.id);
      if (mission.type === 'WEEKLY' && !userProgress) {
        return [];
      }
      const currentCount = userProgress?.currentCount ?? 0;
      const isClaimed = userProgress?.isClaimed ?? false;
      return {
        id: mission.id,
        code: mission.code,
        name: mission.name,
        description: mission.description,
        type: mission.type,
        targetCount: mission.targetCount,
        rewardXp: mission.rewardXp,
        rewardStars: mission.rewardStars,
        currentCount,
        isClaimed,
        isCompleted: currentCount >= mission.targetCount,
        resetDate: formatDateUTC(mission.type === 'DAILY' ? today : startOfWeek),
        rank: rankMap[mission.code],
      };
    });
  },

  async updateMissionProgress(
    userId: number,
    missionCode: string,
    amount: number,
    claimed?: boolean,
  ) {
    const mission = await MissionRepository.getMissionByCode(missionCode);
    if (!mission) {
      throw new Error(MISSION_MESSAGE.MISSION_NOT_FOUND);
    }

    const today = getStartOfTodayUTC();

    return MissionRepository.upsertMissionProgress({
      userId,
      missionId: mission.id,
      resetDate: today,
      amount,
      isClaimed: claimed ?? false,
    });
  },

  async claimMission(user: JwtPayload, missionId: number): Promise<ClaimMissionResponseDto> {
    const userId = Number(user.userId);
    const today = getStartOfTodayUTC();

    const mission = await MissionRepository.getMissionById(missionId);
    if (!mission) {
      throw new Error(MISSION_MESSAGE.MISSION_NOT_FOUND);
    }
    const targetDate = mission.type === 'WEEKLY' ? getStartOfCurrentWeekUTC() : today;

    const progress = await MissionRepository.getUserMissionProgress(
      userId,
      missionId,
      targetDate,
    );

    if (!progress || progress.currentCount < mission.targetCount) {
      throw new Error(MISSION_MESSAGE.MISSION_NOT_COMPLETED);
    }

    if (progress.isClaimed) {
      throw new Error(MISSION_MESSAGE.MISSION_ALREADY_CLAIMED);
    }

    await prisma.$transaction(async (tx) => {
      await tx.userMissionProgress.update({
        where: {
          userId_missionId_resetDate: {
            userId,
            missionId,
            resetDate: targetDate,
          },
        },
        data: { isClaimed: true },
      });

      await tx.user.update({
        where: { id: userId },
        data: {
          totalXp: { increment: mission.rewardXp },
          totalStars: { increment: mission.rewardStars },
        },
      });
    });

    return {
      rewardXp: mission.rewardXp,
      rewardStars: mission.rewardStars,
    };
  },
};
