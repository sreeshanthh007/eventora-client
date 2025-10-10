
export const formatDateForInput = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toISOString().split('T')[0];
};