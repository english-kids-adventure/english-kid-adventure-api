import { TopicRepository } from './topic.repository';
import { TOPIC_MESSAGE } from './topic.constant';

export const TopicService = {
  async getAllTopics() {
    return await TopicRepository.findAllTopics();
  },

  async getVideosByTopicId(topicId: number) {
    const topic = await TopicRepository.findTopicById(topicId);
    if (!topic) {
      throw new Error(TOPIC_MESSAGE.TOPIC_NOT_FOUND);
    }
    return await TopicRepository.findVideosByTopicId(topicId);
  },
};
