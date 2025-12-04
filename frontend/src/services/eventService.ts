import type { CreateEventDTO, EventType } from "../types/event.types"
import { authService } from "./authService"

export const eventService = {
  
  async getEvents(calendarId: string): Promise<EventType[]> {
    const response = await authService.authenticatedFetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/calendars/${calendarId}/events`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch events');
    } 

    const data = await response.json();
    console.log('events: ', data);
    return data.events || [];
  },

  async createEvent(input: CreateEventDTO): Promise<EventType> {
    const response = await authService.authenticatedFetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/events/create`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create event');
    } 

    const data = await response.json();
    return data.event;
  },

  async deleteEvent(eventId: string): Promise<void> {
    const response = await authService.authenticatedFetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/events/${eventId}`, 
      { method: 'DELETE' }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete event');
    }

    await response.json();
  }
}