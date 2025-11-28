import { useState } from "react";
import { calendarService } from "../services/calendarService";
import type { CreateCalendarDTO } from "../types/calendar";

export const useCreateCalendar = (onSuccess?: () => void) => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const createCalendar = async(input: CreateCalendarDTO) => {
    try {
      setIsCreating(true);
      const newCalendar = await calendarService.createCalendar(input.name, input.description);
      onSuccess?.();
      return newCalendar;
    } catch (error: any) {
      setError(error.message || 'Failed to create calendar');
    } finally {
      setIsCreating(false);
    }
  };

  return { createCalendar, isCreating, error};
}