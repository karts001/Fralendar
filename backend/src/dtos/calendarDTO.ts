import { EventDTO } from "./eventDTO";

export interface CalendarDTO {
  id: string;
  name: string;
  adminId: string;
  adminName: string | undefined;
  createdAt: Date;
  events: EventDTO[] | undefined
  memberCount: number;
  eventCount: number;
}

export interface CalendarDetailsDTO {
  id: string;
  adminId: string;
  name: string;
  createdAt: Date;
  memberCount: number;
}
