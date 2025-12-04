import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { EventService } from '../services/eventService';
import { EventController } from '../controllers/eventController';

export const eventRoutes = async(fastify: FastifyInstance) => {
  const eventService = new EventService(fastify.prisma);
  const eventController = new EventController(eventService);

  /**
   * Create an event
   */

  fastify.post(
    '/create',
    { onRequest: [fastify.authenticate] },
    (request: FastifyRequest<{
      Body: {
        calendarId: string;
        title: string;
        startTime: Date;
        endTime: Date;
        description?: string;
      };
    }>, reply: FastifyReply) => eventController.createEvent(request, reply)
  )

  /**
   * Delete an event by ID
   */

  fastify.delete(
    '/:eventId',
    { onRequest: [fastify.authenticate] },
    (request: FastifyRequest<{ Params: { eventId: string } }>, reply: FastifyReply) => {
      eventController.deleteEvent(request, reply);
    }
  )
}