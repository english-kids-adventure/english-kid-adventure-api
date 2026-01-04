import { QuizRepository } from './quiz.repository';
import { QUIZ_MESSAGE } from './quiz.constant';

export const QuizService = {
  async getQuizByVideoId(videoId: number) {
    const video = await QuizRepository.findVideoById(videoId);
    if (!video) throw new Error(QUIZ_MESSAGE.VIDEO_NOT_FOUND);
    const questions = await QuizRepository.findQuizByVideoId(videoId);
    if (questions.length === 0) throw new Error(QUIZ_MESSAGE.QUIZ_NOT_FOUND);
    const shuffledQuiz = questions
      .map((question) => {
        return {
          id: question.id,
          content: question.content,
          mediaUrl: question.mediaUrl,
          answers: question.answers
            .map((a) => ({
              id: a.id,
              content: a.content,
              mediaUrl: a.mediaUrl,
              isCorrect: a.isCorrect,
            }))
            .sort(() => Math.random() - 0.5),
        };
      })
      .sort(() => Math.random() - 0.5);

    return shuffledQuiz;
  },
};
