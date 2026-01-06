type UserUpdateData = {
  totalXp?: { increment: number };
  currentStreak?: number;
  longestStreak?: number;
  lastLoginAt?: Date;
  streakUpdatedAt?: Date;
};
