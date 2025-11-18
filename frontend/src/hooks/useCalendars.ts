import { useState, useEffect } from 'react';

import type { CalendarType, CreateCalendarInput } from '../types/calendar';
import { calendarService } from '../services/calendarService';

export function useCalendars() {
  const [calendars, setCalendars] = useState<CalendarType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCalendars();
  }, []);

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

  const createCalendar = async(input: CreateCalendarInput) => {
    try {
      const newCalendar = await calendarService.createCalendar(input.name, input.description);
      setCalendars([...calendars, newCalendar]);
      return newCalendar;
    } catch (error: any) {
      setError(error.message || 'Failed to create calendar');
      throw error;
    }
  };

  return {
    calendars,
    loading,
    error,
    loadCalendars,
    createCalendar,
  }
}