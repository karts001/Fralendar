import { PrismaClient } from "@prisma/client";
import { CalendarDetailsDTO, CalendarDTO } from "../dtos/calendarDTO";
import { CalendarDetailsMapper, CalendarMapper, CalendarRaw } from "../mappers/calendarMapper";
import { EventDTO } from "../dtos/eventDTO";
import { EventMapper, EventRaw } from "../mappers/eventMapper";

export class CalendarService {
  constructor(private prisma: PrismaClient) {}

  async verifyAccessByCalendarId(userId: string, calendarId: string) {
    const calendar = await this.prisma.calendar.findFirst({
      where: {
        id: calendarId,
        OR: [
          { adminId: userId },
          { members: { some: { userId } } }
        ]
      }
    });

    if (!calendar) {
      throw new Error('User is not a member of this calendar');
    }

    return calendar;
  }

  async getUserCalendars(userId: string): Promise<CalendarDTO[]> {
    const calendars = await this.prisma.calendar.findMany({
      where: {
        OR: [
          { adminId: userId }, // where user is admin
          { members: { some: { userId } } } // where user is member of calendar
        ]
      },
      include: {
        _count: {
          select: {
            members: true,
            events: true
          }
        },
        admin: {
          select: {
            id: true,
            email: true,
            displayName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Transform the response to DTO
    return calendars.map((c: CalendarRaw) => CalendarMapper.toDTO(c));
  }

  async getCalendarEvents(userId: string, calendarId: string): Promise<EventDTO[]> {
    // First verify member has access to this calendar
    await this.verifyAccessByCalendarId(userId, calendarId);

    const events = await this.prisma.event.findMany({
      where: { calendarId },
      include: {
        createdBy: {
          select: { id: true, email: true, displayName: true }
        },
        attendees: {
          include: {
            user: {
              select: { id: true, email: true, displayName: true}
            }
          }
        }
      },

      orderBy: { startTime: 'asc' }
    });

    return events.map((c: EventRaw) => EventMapper.toDTO(c));
  }

  async getCalendarDetails(calendarId: string): Promise<CalendarDetailsDTO> {
    const calendar = await this.prisma.calendar.findFirst({
      where: { id: calendarId },
      include: {
        _count: {
          select: { members: true}
        }
      }
    });

    return CalendarDetailsMapper.toDTO(calendar);
  }

  async createCalendar(userId: string, name: string, description?: string) {
    console.log('Calendar name: ', name);
    if (!name || name.trim().length === 0) {
      throw new Error('Calendar name is required');
    }

    const calendar = await this.prisma.calendar.create({
      data: {
        name,
        adminId: userId,
        members: {
          create: { userId }
        },
        createdAt: new Date()
      },
      include: {
        _count: {
          select: { members: true },
        }
      }
    });

    return {
      ...calendar,
      memberCount: calendar._count.members
    };
  }

  async deleteCalendar(calendarId: string, userId: string) {
    const calendar = await this.prisma.calendar.findUnique({
      where: { id: calendarId }
    });

    if (!calendar) {
      throw new Error('Calendar not found');
    }

    if (calendar.adminId !== userId) {
      throw new Error('Only the admin can delete the calendar');
    }

    return await this.prisma.calendar.delete({
      where : {id: calendarId}
    });
  }
}