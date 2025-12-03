import { PrismaClient } from "@prisma/client/extension";
import { EventMapper } from "../mappers/eventMapper";

export class EventService {
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

  async verifyAccessByEventId(userId: string, eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { calendar: true }
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const hasAccess = event.calendar.adminId === userId ||
      await this.prisma.calendarMember.findFirst({
        where: {
          calendarId: event.calendarId,
          userId
        }
      });

    if (!hasAccess) {
      throw new Error('Access denied');
    }

    return event;
  }  

  async getEventById(userId: string, eventId: string) {
      const event = await this.verifyAccessByEventId(userId, eventId);
      if (!event) {
        throw new Error(`Event with ID: ${eventId} not found`);
      }
      return event;
  }
  
  async createEvent(
    userId: string,
    calendarId: string, 
    title: string,
    startTime: Date,
    endTime: Date,
    description?: string,

  ) {
    console.log('Event title is: ', title);

    await this.verifyAccessByCalendarId(userId, calendarId);

    // Validate input paramters
    if (startTime >= endTime) {
      throw new Error('End time must be after start time');
    }

    if (!title || title.trim().length === 0) {
      throw new Error('Must provide a value for the title field');
    }

    // Create the event
    const event = await this.prisma.event.create({
      data: {
        title,
        description,
        calendarId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        createdById: userId,
        // Automatically add creator as attendee
        attendees: {
          create: [
            {
              userId: userId,
            }
          ]
        }
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            displayName: true,
          }
        },
        attendees: {
          include: {
            user: {
              select : {
                id: true,
                email: true,
                displayName: true
              }
            }
          }
        }
      }
    });

    return EventMapper.toDTO(event);
  }

  async deleteEvent(userId: string, eventId: string) {
    const event = this.prisma.event.findUnique({
      where: { id: eventId },
      include: { calendar: true}
    });

    // Check permissions
    const canDelete = event.calendar.adminId === userId || event.createdById === userId;

    if (!canDelete) {
      throw new Error('Only the event creator or calendar admin can delete an event');
    }

    await this.prisma.event.delete({
      where: { id: eventId }
    });

    return {
      success: true,
      message: 'Event deleted successfully'
    };
  }
}