import { UserDTO } from "./userDTO";

export interface EventDTO {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    calendarId: string;
    createdBy: UserDTO;
    attendees: UserDTO[];
}