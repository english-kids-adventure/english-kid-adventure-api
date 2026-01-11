export const USER_MESSAGE = {
  GET_PROFILE_SUCCESS: 'Get user profile successfully',
  USER_NOT_FOUND: 'User not found',
  GET_WEEKLY_SUCCESS:'Get weekly leaderboard successfully',
};

export const CRON_SCHEDULE = {
  WEEKLY_REWARD_CLAIM: '55 23 * * 0',
  WEEKLY_LEADERBOARD_FINALIZATION: '59 23 * * 0',
};

export const LEADERBOARD_REWARDS = {
  1: 50,
  2: 30,
  3: 20,
} as const;
export const LEADERBOARD_CONFIG = {
  TOP_LIMIT: 10,
};
