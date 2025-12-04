import { FastifyReply, FastifyRequest } from "fastify";
import { EventService } from "../services/eventService";

export class EventController {
  constructor(private eventService: EventService) {}

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

      console.log('calendarId: ', calendarId);
      console.log('title: ', title);
      console.log('startTime: ', startTime);
      console.log('End time: ', endTime);
      console.log('start time type: ', typeof(startTime));

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

  async deleteEvent(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.sub;
      const { eventId } = request.params as { eventId: string};

      const result = await this.eventService.deleteEvent(userId, eventId);

      return reply.status(200).send({result});
    } catch(error) {
      console.error('Error deleting event: ', error);
      return reply.status(500).send({
        message: error instanceof Error ? error.message : 'Failed to delete event'
      });
    }
  }
}
