import { QuizRepository } from './quiz.repository';
import { QUIZ_MESSAGE } from './quiz.constant';
import { AUTH_MESSAGE } from '@modules/auth/auth.constant';
import { MissionService } from '@modules/mission/mission.service';
import { MISSION_CODE } from '@modules/mission/mission.constant';

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

  async submitQuizForUser(
    userId: number,
    videoId: number,
    correctAnswers: number,
    totalQuestions: number,
  ) {
    if (
      correctAnswers < 0 ||
      totalQuestions <= 0 ||
      correctAnswers > totalQuestions
    ) {
      throw new Error(QUIZ_MESSAGE.INVALID_SUBMIT_DATA);
    }

    const todayAttempt = await QuizRepository.getToDayAttempt(userId, videoId);
    if (todayAttempt && todayAttempt.timesPlayed >= 3) {
      await QuizRepository.incrementAttemptOnly(userId, videoId);
      await QuizRepository.getToDayAttempt(userId, videoId);

      throw new Error(QUIZ_MESSAGE.OVER_LIMIT_TODAY);
    }

    const percentage = correctAnswers / totalQuestions;
    const starsEarned = Math.round(percentage * 5);

    await QuizRepository.incrementUserTotalStars(userId, starsEarned);
    await MissionService.updateMissionProgress(
      userId,
      MISSION_CODE.EARN_STARS,
      starsEarned,
    );

    const updatedAttempt = await QuizRepository.upsertQuizAttempt(
      userId,
      videoId,
      starsEarned,
    );

    const user = await QuizRepository.getUserTotalStars(userId);
    if (!user) {
      throw new Error(AUTH_MESSAGE.USER_NOT_FOUND);
    }

    return {
      correctAnswers,
      totalQuestions,
      starsEarned,
      totalStars: user.totalStars,
      timesPlayed: updatedAttempt.timesPlayed,
    };
  },

  async getUserQuizAttempts(userId: number, videoId: number) {
    const attempts = await QuizRepository.findQuizAtemptByVideoId(
      userId,
      videoId,
    );
    return attempts;
  },
};

