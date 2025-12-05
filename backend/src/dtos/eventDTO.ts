import { EventAttendeeDTO } from "./eventAttendeeDTO";
import { UserDTO } from "./userDTO";

export interface EventDTO {
    id: string;
    title: string;
    description?: string | null;
    startTime: Date;
    endTime: Date;
    calendarId: string;
    createdBy: UserDTO;
    attendees: EventAttendeeDTO[];
}