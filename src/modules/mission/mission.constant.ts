export const MISSION_MESSAGE = {
  GET_MISSIONS_SUCCESS: 'Get missions successfully',
  MISSION_NOT_FOUND: 'Mission not found',
  MISSION_NOT_COMPLETED: 'Mission has not been completed yet',
  MISSION_ALREADY_CLAIMED: 'Mission reward already claimed',
  CLAIM_SUCCESS: 'Claim mission reward successfully',
};

export const MISSION_CODE = {
  WATCH_VIDEO: 'D2',
  EARN_STARS: 'D4',
  UNLOCK_VIDEO: 'D8',
  LOG_IN: 'D1',
  WEEKLY_TOP_1: 'W1',
  WEEKLY_TOP_2: 'W2',
  WEEKLY_TOP_3: 'W3',
};

export const WEEKLY_MISSION_RANKS: Record<string, number> = {
  [MISSION_CODE.WEEKLY_TOP_1]: 1,
  [MISSION_CODE.WEEKLY_TOP_2]: 2,
  [MISSION_CODE.WEEKLY_TOP_3]: 3,
};
