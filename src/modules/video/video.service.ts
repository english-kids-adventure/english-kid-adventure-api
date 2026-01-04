import { VideoRepository } from './video.repository';

export const VideoService = {
  async completeVideoForUser(userId: number, videoId: number) {
    const video = await VideoRepository.getVideoById(videoId);
    if (!video) {
      throw new Error('Video not found');
    }

    const progress = await VideoRepository.getUserVideoProgress(
      userId,
      videoId,
    );
    if (!progress?.isCompleted) {
      await VideoRepository.updateVideoProgress(userId, videoId);
    }
    const xpReward = await VideoRepository.awardUserXp(userId, video.xpReward);
    return xpReward;
  },
};
