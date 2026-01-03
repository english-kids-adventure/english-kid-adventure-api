import { TopicRepository } from './topic.repository';
import { TOPIC_MESSAGE } from './topic.constant';
import { PaginationParams } from '@common/utils/pagination';

export const TopicService = {
  async getAllTopicsById(userId: number, pagination: PaginationParams) {
    const { limit, offset, page, perPage } = pagination;

    const { topics, total } = await TopicRepository.findAllTopicsById(
      userId,
      limit,
      offset,
    );

    const topicList = topics.map((topic) => {
      const totalMinutes = topic.videos.reduce(
        (sum, vid) => sum + (vid.duration || 0),
        0,
      );

      const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
      const totalVideos = topic._count.videos;
      const completedVideos = topic.videos.length;

      return {
        id: topic.id,
        name: topic.name,
        description: topic.description,
        thumbnailUrl: topic.thumbnailUrl,
        totalHours,
        progress: {
          totalVideos,
          completedVideos,
        },
      };
    });

    return {
      topics: topicList,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  },

  async getVideosByTopicId(topicId: number) {
    const topic = await TopicRepository.findTopicById(topicId);

    if (!topic) {
      throw new Error(TOPIC_MESSAGE.TOPIC_NOT_FOUND);
    }

    return await TopicRepository.findVideosByTopicId(topicId);
  },
};
