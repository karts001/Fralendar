import { useEffect, useState } from "react";
import { calendarService } from "../services/calendarService"
import type { CalendarDetails } from "../types/calendar";

export const useCalendarDetails = (calendarId: string) => {
  const [calendar, setCalendar] = useState<CalendarDetails>()
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCalendar = async () => {
    try {
      setLoading(true);
      const data = await calendarService.getCalendarDetails(calendarId);
      setCalendar(data);
      setError(null);
    } catch (error) {
      setError('Failed to load calendar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (calendarId) {
      fetchCalendar();
      console.log(calendar);
    }
  }, [calendarId]);

  return {calendar, loading, error, refetch: fetchCalendar};
}