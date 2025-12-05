import { EventDTO } from "../dtos/eventDTO"


export interface EventRaw {
  title: string;
  description?: string | null;
  startTime: Date;
  endTime: Date;
  calendarId: string;
  id: string;
  createdById: string;

  createdBy: {
      id: string;
      email: string;
      displayName: string | null;
  };
  attendees: ({
      id: string;
      userId: string;
      eventId: string;
      status: string;
      respondedAt: Date | null;
      user: {
          id: string;
          email: string;
          displayName: string | null;
      };
  })[];
}

export class EventMapper {
  static toDTO(event: EventRaw): EventDTO {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      calendarId: event.calendarId,
      createdBy: event.createdBy,
      attendees: event.attendees,
    }
  }
}