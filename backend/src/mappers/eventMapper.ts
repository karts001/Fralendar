import { EventDTO } from "../dtos/eventDTO"

export class EventMapper {
  static toDTO(event: any): EventDTO {
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