import { EventDTO } from "./eventDTO";
import { UserDTO } from "./userDTO";


export interface EventAttendeeDTO {
  id: string;
  userId: string;
  status: string;
  responsedAt?: Date;
}