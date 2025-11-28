import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { EventService } from '../services/eventService';
import { EventController } from '../controllers/eventController';

export const eventRoutes = async(fastify: FastifyInstance) => {
  const eventService = new EventService(fastify.prisma);
  const eventController = new EventController(eventService);
  
  /**
   * Get a specific event by its id
   */
  fastify.get(
    '/:id',
    { onRequest: [fastify.authenticate] },
    (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) =>
      eventController.getEventById(request, reply)
  )

  /**
   * Create an event
   */

  fastify.post(
    '/create',
    { onRequest: [fastify.authenticate ] },
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
}