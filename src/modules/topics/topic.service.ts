import { TopicRepository } from './topic.repository';
import { TOPIC_MESSAGE } from './topic.constant';
import { AuthRepository } from '@modules/auth/auth.repository';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';

export const TopicService = {
  async getAllTopicsById(userId: number, limit: number, cursor?: number) {
    const isUserExists = await AuthRepository.findById(userId);

    if (!isUserExists) {
      throw new Error(AUTH_MESSAGE.USER_NOT_FOUND);
    }

    const results = await TopicRepository.findAllTopicsById(
      userId,
      limit,
      cursor,
    );

    const nextCursor = results.length === limit ? results[results.length - 1].id : null;

    const topics = results.map((topic) => ({
      id: topic.id,
      name: topic.name,
      description: topic.description,
      thumbnailUrl: topic.thumbnailUrl,
      progress: {
        totalVideos: topic._count.videos,
        completedVideos: topic.videos.length,
      },
    }));

    return { topics, nextCursor };
  },

  async getVideosByTopicId(topicId: number) {
    const topic = await TopicRepository.findTopicById(topicId);

    if (!topic) {
      throw new Error(TOPIC_MESSAGE.TOPIC_NOT_FOUND);
    }

    return await TopicRepository.findVideosByTopicId(topicId);
  },
};
