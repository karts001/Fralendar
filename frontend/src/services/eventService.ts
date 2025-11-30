import type { CreateEventDTO, EventType } from "../types/event.types"
import { authService } from "./authService"

export const eventService = {
  
  async getEvents(calendarId: string): Promise<EventType[]> {
    const token = await authService.getAccessToken();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/calendars/${calendarId}/events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch events');
    } 

    const data = await response.json();
    console.log('events: ', data);
    return data.events || [];
  },

  async createEvent(input: CreateEventDTO): Promise<EventType> {
    const token = await authService.getAccessToken();
    console.log('input: ', input);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/event/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create event');
    } 

    const data = await response.json();
    return data.event;
  }
}