import { useState, useEffect } from 'react';

import type { CalendarType } from '../types/calendar';
import { calendarService } from '../services/calendarService';
import { useNavigate } from 'react-router-dom';
import { AuthError } from '../types/errors';

export function useCalendars() {
  const [calendars, setCalendars] = useState<CalendarType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadCalendars = async () => {
    try {
      setLoading(true);
      const calendars = await calendarService.getCalendars();
      setCalendars(calendars);
    } catch(error: any) {
      if (error instanceof AuthError) {
        navigate('/login');
        return;
      }
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