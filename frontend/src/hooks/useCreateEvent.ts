import { useState } from "react";
import { eventService } from "../services/eventService";
import type { CreateEventDTO } from "../types/event.types";

export const useCreateEvents = (onSuccess?: () => void) => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = async(input: CreateEventDTO) => {
    try{
      setIsCreating(true);
      const newEvent = await eventService.createEvent(input);
      onSuccess?.();
      return newEvent;
    } catch (error: any) {
      setError(error.message || 'Failed to create event');
    } finally {
      setIsCreating(false);
    }
  }

  return { createEvent, isCreating, error};
}