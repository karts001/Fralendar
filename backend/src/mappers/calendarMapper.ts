import { CalendarDTO } from "../dtos/calendarDTO";


export class CalendarMapper {
  static toDTO(calendar: any): CalendarDTO {
    return {
      id: calendar.id,
      name: calendar.name,
      adminId: calendar.adminId,
      adminName: calendar.admin.name,
      createdAt: calendar.createdAt,
      memberCount: calendar._count.members,
      eventCount: calendar._count.events,
    }
  }
}

export class CalendarDetailsMapper {
  static toDTO(calendarDetails: any) {
    return {
      id: calendarDetails.id,
      adminId: calendarDetails.adminId,
      name: calendarDetails.name,
      createdAt: calendarDetails.createdAt,
      memberCount: calendarDetails._count.members
    };
  }
}