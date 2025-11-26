import type { CalendarDetails, CalendarType } from "../types/calendar";
import { authService } from "./authService";

export const calendarService = {
  async getCalendars(): Promise<CalendarType[]> {
    const token = await authService.getAccessToken();

    if (!token) throw new Error('No access token found');

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/calendars`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch calendars');

    const data = await response.json();
    return data.calendars || [];
  },

  async getCalendarDetails(calendarId: string): Promise<CalendarDetails> {
    const token = await authService.getAccessToken();

    if (!token) throw new Error('No access token found');

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/calendars/${calendarId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch calendar details')

    const data = await response.json();

    return data;

  },

  async createCalendar(name: string, description?: string): Promise<CalendarType> {
    const token = await authService.getAccessToken();

    if (!token) throw new Error('No access token found');

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/calendars/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, description })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create calendar');
    }

    const data = await response.json();
    return data.calendar;
  },

  async deleteCalendar(id: string): Promise<void> {
    const token = await authService.getAccessToken();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/calendars/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete calendar');
    }

    console.log(`Calendar with id ${id} deleted successfully`);
    return;
  }
}