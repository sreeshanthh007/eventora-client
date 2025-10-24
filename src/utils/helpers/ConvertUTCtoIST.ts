export const convertUTCToIST = (utcDateString: string): string => {
  if (!utcDateString) return "";
  
  const date = new Date(utcDateString);
  // Add 5 hours 30 minutes (IST offset)
  const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
  
  // Format for datetime-local input (YYYY-MM-DDTHH:mm)
  const year = istDate.getUTCFullYear();
  const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(istDate.getUTCDate()).padStart(2, '0');
  const hours = String(istDate.getUTCHours()).padStart(2, '0');
  const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};