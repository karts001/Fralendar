import { useEffect, useState } from "react";
import type { EventType } from "../types/event.types";
import { eventService } from "../services/eventService";

export function useCalendarEvents(calendarId: string) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async() => {
    try {
      setLoading(true);
      const events = await eventService.getEvents(calendarId);
      setEvents(events);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (calendarId) {
      fetchEvents();
    }
  }, [calendarId]);

  return { events, loading, error , refetch: fetchEvents};
}
