import { FastifyInstance } from "fastify";

import { CalendarService } from "../services/calendarService";

export const calendarRoutes = async (fastify: FastifyInstance) => {
  const calendarService = new CalendarService(fastify.prisma);

  fastify.get(
    '/',
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const userId = request.user.sub;
      const calendars = await calendarService.getUserCalendars(userId);
      
      return reply.status(200).send({
        message: 'Calendars fetched successfully',
        calendars: calendars
      });
    }
  ),

  fastify.get(
    '/:calendarId',
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const { calendarId } = request.params as { calendarId: string};
      const calendarDetails = await calendarService.getCalendarDetails(calendarId);

      return reply.status(200).send({
        calendarDetails: calendarDetails,
        message: `Retreived calendar details with ID: ${calendarId}`
      })
    }
  )

  fastify.post(
    '/create',
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const { name } = request.body as { name: string };
      const userId = request.user.sub;

      const newCalendar = await calendarService.createCalendar(userId, name);

      return reply.status(200).send({
        calendar: newCalendar,
        message: `Created new calendar with name: ${newCalendar.name}`
      });
    }
  ),
  
  fastify.delete(
    '/:calendarId',
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      try {
        const { calendarId } = request.params as { calendarId: string };
        const userId = request.user.sub;

        await calendarService.deleteCalendar(userId, calendarId);

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
  )
}