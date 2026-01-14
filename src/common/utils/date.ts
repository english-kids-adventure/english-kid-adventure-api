const VN_OFFSET = 7 * 60 * 60 * 1000;
export const getStartOfTodayVN = (now: Date = new Date()): Date => {
  const vnTime = new Date(now.getTime() + VN_OFFSET);
  return new Date(Date.UTC(vnTime.getUTCFullYear(), vnTime.getUTCMonth(), vnTime.getUTCDate()));
};

export const getStartOfCurrentWeekVN = (now: Date = new Date()): Date => {
  const vnTime = new Date(now.getTime() + VN_OFFSET);
  const day = vnTime.getUTCDay();
  const diff = vnTime.getUTCDate() - day + (day === 0 ? -6 : 1);
  return new Date(Date.UTC(vnTime.getUTCFullYear(), vnTime.getUTCMonth(), diff));
};

export const formatDateUTC = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getDaysDifference = (date1: Date, date2: Date): number => {
  const d1 = Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate());
  const d2 = Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
  return Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
};
