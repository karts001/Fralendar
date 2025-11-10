import { FastifyInstance } from "fastify";
import { request } from "http";

export const calendarRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const { name } = request.body as { name: string };
      const userId = request.user.sub;

      const calendar = await fastify.prisma.calendar.create({
        name,
        admin: userId,
        members: {
          create: { userId }
        },
        createdAt: new Date(),
      });

      return calendar;
    }
  )
}