import { PrismaClient } from "@prisma/client";

export class CalendarService {
  constructor(private prisma: PrismaClient) {}

  async getUserCalendars(userId: string) {
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

    // transform the resposne to match the frontend
    return calendars.map(calendar => ({
      id: calendar.id,
      name: calendar.name,
      adminId: calendar.adminId,
      admin: calendar.admin,
      createdAt: calendar.createdAt,
      memberCount: calendar._count.members,
      eventCount: calendar._count.events     
    }));
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