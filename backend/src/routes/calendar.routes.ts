import { FastifyInstance } from "fastify";

import { CalendarService } from "../services/calendarService";
import { CalendarController } from "../controllers/calendarController";

export const calendarRoutes = async (fastify: FastifyInstance) => {
  const calendarService = new CalendarService(fastify.prisma);
  const calendarController = new CalendarController(calendarService);

  /**
   * Get all calendars a user is an admin or member of
   */
  fastify.get(
    '/',
    { onRequest: [fastify.authenticate] },
    (request, reply) => calendarController.getUserCalendars(request, reply)
  )

  /**
   * Get a calendar by its ID
   */
  fastify.get(
    '/:calendarId',
    { onRequest: [fastify.authenticate] },
    (request, reply) => calendarController.getCalendar(request, reply)
  )

  /**
   * Get all events in a calendar
   */
  fastify.get(
    '/:calendarId/events',
    { onRequest: [fastify.authenticate ] },
    (request, reply) => calendarController.getCalendarEvents(request, reply)
  );

  /**
   * Create a calendar
   */
  fastify.post(
    '/create',
    { onRequest: [fastify.authenticate] },
    async (request, reply) => calendarController.createCalendar(request, reply)
  ),

  /**
   * Delete a calendar
   */
  fastify.delete(
    '/:calendarId',
    { onRequest: [fastify.authenticate] },
    (request, reply) => calendarController.deleteCalendar(request, reply)
  )
}