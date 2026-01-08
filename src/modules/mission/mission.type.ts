export interface MissionResponseDto {
  id: number;
  code: string;
  name: string;
  description: string;
  type: string;
  targetCount: number;
  rewardXp: number;
  rewardStars: number;
  currentCount: number;
  isClaimed: boolean;
  isCompleted: boolean;
  resetDate: string;
}

export interface ClaimMissionRequestDto {
  missionId: number;
}

export interface ClaimMissionResponseDto {
  rewardXp: number;
  rewardStars: number;
}

export interface UpsertMissionProgressParams {
  userId: number;
  missionId: number;
  resetDate: Date;
  amount: number;
  isClaimed?: boolean;
}
