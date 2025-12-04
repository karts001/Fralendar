/**
 * Event helper which Get defulat event times either by the selected date and selected date + 1 hour
 * Or the current date and time +1 hour
 * @param selectedDate 
 * @returns: Object containing the start and end date time as a string
 */
export const getDefaultEventTimes = (selectedDate?: Date): {
  start: string,
  end: string,
} => {
  const start = selectedDate || new Date();
  
  // Round to next hour
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);

  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  return {
    start: start.toISOString().slice(0,16),
    end: end.toISOString().slice(0,16)
  };
};

export const formatEventDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatEventTime = (date: string): string => {
  return new Date(date).toLocaleDateString('en-AU', {
    hour: 'numeric',
    minute: '2-digit'
  });
};

export const getEventDuration = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff % (1000 * 60 * 60) / 1000 * 60);

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
}

export const validateEventTimes = (startTime: string, endTime: string): string | null => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    return 'Start time must be before end time';
  }

  return null;
}