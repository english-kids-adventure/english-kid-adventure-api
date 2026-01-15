export const USER_MESSAGE = {
  GET_PROFILE_SUCCESS: 'Get user profile successfully',
  USER_NOT_FOUND: 'User not found',
  GET_WEEKLY_SUCCESS:'Get weekly leaderboard successfully',
};

export const CRON_SCHEDULE = {
  WEEKLY_LEADERBOARD_FINALIZATION: '0 19 * * 0',
  WEEKLY_AUTO_CLAIM_REWARDS: '0 0 * * 1',
};

export const LEADERBOARD_REWARDS = {
  1: 50,
  2: 30,
  3: 20,
} as const;
export const LEADERBOARD_CONFIG = {
  TOP_LIMIT: 10,
};

export const DAYS_IN_WEEK = 7;

export const STREAK_CONFIG = {
  DAYS_IN_WEEK: 7,
  BASE_WEEKLY_BONUS_XP: 100,
  XP_PER_WEEK_INCREMENT: 50,
  DAILY_LOGIN_XP: 10,
};
