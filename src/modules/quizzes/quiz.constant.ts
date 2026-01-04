export const QUIZ_MESSAGE = {
  GET_QUIZ_SUCCESS: 'Get quiz successfully',
  VIDEO_NOT_FOUND: 'Video not found',
  QUIZ_NOT_FOUND: 'No questions found for this video',
  INVALID_VIDEO_ID: 'Invalid videoId',
  QUIZ_SUBMITTED_SUCCESS: 'Quiz submitted successfully',
  INVALID_SUBMIT_DATA: 'correctAnswers and totalQuestions are required',
  OVER_LIMIT_TODAY: 'Over limit for today',
};

export const getTodayTime = () => {
  const date = new Date();
  return new Date(date.setHours(0, 0, 0, 0));
};
