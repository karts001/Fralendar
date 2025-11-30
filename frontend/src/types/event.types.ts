import type { User } from "./user.types";

export interface EventType {
  id: string;
  calendarId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string | null;
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
}

export interface CreateEventDTO {
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  calendarId: string;
}