import { FastifyReply, FastifyRequest } from "fastify";
import { CalendarService } from "../services/calendarService";

export class CalendarController {
  constructor(private calendarService: CalendarService) {}

    async getUserCalendars(request: FastifyRequest, reply: FastifyReply) {
      try {
        const userId = request.user.sub;
        const calendars = await this.calendarService.getUserCalendars(userId);
        
        return reply.status(200).send({
          message: 'Calendars fetched successfully',
          calendars: calendars
        });
      } catch (error) {
        return reply.status(500).send({
          message: 'Failed to fetch calendars',
        });
      }
    };

    async getCalendarEvents(request: FastifyRequest, reply: FastifyReply) {
      try {
        const { calendarId } = request.params as { calendarId: string };
        const userId = request.user.sub;

        const events = await this.calendarService.getCalendarEvents(userId, calendarId);

        return reply.status(200).send({
          events: events,
          eventCount: events.length,
          message: `Retrieved all events for calendar with ID: ${calendarId}`
        });
      } catch(error) {
        console.error('Error retrieving events: ', error);
        return reply.status(500).send({
          message: `Failed to retrieve calendar events`
        });
      }
    };

    async getCalendar(request: FastifyRequest, reply: FastifyReply) {
      const { calendarId } = request.params as { calendarId: string};
      const calendarDetails = await this.calendarService.getCalendarDetails(calendarId);

      return reply.status(200).send({
        calendarDetails: calendarDetails,
        message: `Retreived calendar details with ID: ${calendarId}`
      })
    };

    async createCalendar(request: FastifyRequest, reply: FastifyReply) {
      try {
        const { name } = request.body as { name: string };
        const userId = request.user.sub;

        const newCalendar = await this.calendarService.createCalendar(userId, name);

        return reply.status(201).send({
          calendar: newCalendar,
          message: `Created new calendar with name: ${newCalendar.name}`
        });
      } catch (err0r) {
        return reply.status(500).send({
          message: 'Failed to create calendar'
        });
      }
    };

    async deleteCalendar(request: FastifyRequest, reply: FastifyReply) {
      try {
        const { calendarId } = request.params as { calendarId: string };
        const userId = request.user.sub;

        await this.calendarService.deleteCalendar(userId, calendarId);

        return reply.status(200).send({
          message: `Calendar with ID ${calendarId} deleted successfully`
        });
      } catch (error) {
        console.error('Error deleting calendar:', error);
        return reply.status(500).send({ 
            message: 'Failed to delete calendar',
          }
        );
      }
    }
  }
