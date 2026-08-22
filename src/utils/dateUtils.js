import { addDays } from 'date-fns';

export const getReturnDate = (departureDate, durationString) => {
  if (!departureDate || !durationString) return null;
  const daysMatch = durationString.match(/(\d+)\s*Days/i);
  if (daysMatch && daysMatch[1]) {
    const days = parseInt(daysMatch[1], 10);
    return addDays(new Date(departureDate), days - 1);
  }
  return null;
};
