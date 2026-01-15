import { AuthRepository } from '@modules/auth/auth.repository';
import { VIDEO_MESSAGE } from './video.constant';
import { VideoRepository } from './video.repository';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';
import { MissionService } from '@modules/mission/mission.service';
import { MISSION_CODE } from '@modules/mission/mission.constant';

export const VideoService = {
  async completeVideoForUser(userId: number, videoId: number) {
    const video = await VideoRepository.getVideoById(videoId);
    if (!video) {
      throw new Error(VIDEO_MESSAGE.VIDEO_NOT_FOUND);
    }

    const progress = await VideoRepository.getUserVideoProgress(
      userId,
      videoId,
    );
    if (!progress?.isCompleted) {
      await VideoRepository.updateVideoProgress(userId, videoId);
    }
    await MissionService.updateMissionProgress(
      userId,
      MISSION_CODE.WATCH_VIDEO,
      1,
    );
    const xpReward = await VideoRepository.awardUserXp(userId, video.xpReward);
    return xpReward;
  },
  async unlockVideo(userId: number, videoId: number) {
    const user = await AuthRepository.findById(userId);
    if (!user) throw new Error(AUTH_MESSAGE.USER_NOT_FOUND);
    const video = await VideoRepository.getVideoById(videoId);
    if (!video) throw new Error(VIDEO_MESSAGE.VIDEO_NOT_FOUND);
    const progress = await VideoRepository.getUserVideoProgress(
      userId,
      videoId,
    );
    if (progress?.isUnlocked) {
      throw new Error(VIDEO_MESSAGE.ALREADY_UNLOCKED);
    }
    if (user.totalStars < video.unlockCost) {
      throw new Error(VIDEO_MESSAGE.INSUFFICIENT_STARS);
    }
    const newTotalStars = user.totalStars - video.unlockCost;
    const [updatedUser, newProgress] =
      await VideoRepository.unlockVideoTransaction(
        userId,
        videoId,
        newTotalStars,
      );

    await MissionService.updateMissionProgress(
      userId,
      MISSION_CODE.UNLOCK_VIDEO,
      1,
    );

    return {
      remainingStars: updatedUser.totalStars,
      isUnlocked: newProgress.isUnlocked,
    };
  },
};
