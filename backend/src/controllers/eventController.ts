import { FastifyReply, FastifyRequest } from "fastify";
import { EventService } from "../services/eventService";

export class EventController {
  constructor(private eventService: EventService) {}

  async getEventById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { eventId } = request.params as { eventId: string };
      const userId = request.user.sub;

      const events = await this.eventService.getEventById(userId, eventId);

      if (events.length > 0) {
        return reply.status(200).send({
          success: true,
          message: `Retrieved event with event ID: ${eventId}`
        });
      } else {
        return reply.status(200).send({
          success: false,
          message: 'No events were found'
        });
      }
    } catch(error) {
      console.error('Error retrieving events: ', error);
      return reply.status(500).send({
        message: `Failed to retrieve calendar events`
      });
    }
  }

  async createEvent(
    request: FastifyRequest<{
      Body: {
        calendarId: string;
        title: string;
        startTime: Date;
        endTime: Date;
        description?: string;
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      const userId = request.user?.sub;
      const { calendarId, title, startTime, endTime, description } = request.body;

      if (!calendarId || !title || !startTime || !endTime) {
        return reply.status(400).send({
          message: 'Required fields: calendarId, title, startTime, endTime'
        });
      }

      const event = await this.eventService.createEvent(
        userId,
        calendarId,
        title,
        startTime,
        endTime,
        description
      );

      return reply.status(201).send({
        event,
        message: `Event with ID: ${event.id} was successfully created`
      });
    } catch (error) {
      console.error('Error creating event: ', error);
      return reply.status(500).send({
        message: 'Failed to create event'
      });
    }
  }
}