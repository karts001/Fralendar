import type { User } from "./user.types";

export interface EventType {
  id: string;
  calendarId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string | undefined;
  createdById: string;
  createdBy: User
  attendees: EventAttendee[]
}

export interface EventAttendee {
  id: string;
  eventId: string;
  userId: string;
  status?: string;
  respondedAt: Date;
  user: User;
}

export interface CreateEventDTO {
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  calendarId: string;
}

export interface EventFormData {
  title: string;
  description?: string;
  start: string;
  end: string;
}