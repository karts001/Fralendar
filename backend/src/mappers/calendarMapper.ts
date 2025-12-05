import { CalendarDetailsDTO, CalendarDTO } from "../dtos/calendarDTO";
import { EventDTO } from "../dtos/eventDTO";
import { EventMapper } from "./eventMapper";

export type CalendarRaw = {
  id: string;
  name: string;
  adminId: string;
  createdAt: Date;
  events?: EventDTO[];
  admin: {
    id: string;
    email: string;
    displayName: string | null;
  }
  _count: {
    members: number;
    events: number;
  }
}

export class CalendarMapper {
  static toDTO(raw: CalendarRaw): CalendarDTO {
    return {
      id: raw.id,
      name: raw.name,
      adminId: raw.adminId,
      adminName: raw.admin?.displayName ?? undefined,
      createdAt: raw.createdAt,
      events: raw.events,
      memberCount: raw._count.members,
      eventCount: raw._count.events,
    }
  }
}

export class CalendarDetailsMapper {
  static toDTO(calendarDetails: any): CalendarDetailsDTO {
    return {
      id: calendarDetails.id,
      adminId: calendarDetails.adminId,
      name: calendarDetails.name,
      createdAt: calendarDetails.createdAt,
      memberCount: calendarDetails._count.members
    };
  }
}