import { useState, useEffect } from 'react';

import type { CalendarType } from '../types/calendar';
import { calendarService } from '../services/calendarService';

export function useCalendars() {
  const [calendars, setCalendars] = useState<CalendarType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadCalendars = async () => {
    try {
      setLoading(true);
      const calendars = await calendarService.getCalendars();
      setCalendars(calendars);
    } catch(error: any) {
      setError(error.message || 'Failed to load calendars');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalendars();
  }, []);

  return {
    calendars,
    loading,
    error,
    refetch: loadCalendars
  };
}