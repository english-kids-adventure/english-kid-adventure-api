import { prisma } from '@config/prisma';

export const TopicRepository = {
  async findAllTopics() {
    return await prisma.topic.findMany({
      where: { isActive: true },
      orderBy: { id: 'asc' },
    });
  },

  async findVideosByTopicId(topicId: number) {
    return await prisma.video.findMany({
      where: { topicId },
      orderBy: { orderIndex: 'asc' },
    });
  },

  async findTopicById(id: number) {
    return await prisma.topic.findUnique({
      where: { id },
    });
  },
};
