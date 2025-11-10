import { FastifyInstance } from "fastify";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    "/test-protected", 
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      return {
        message: "Token verified!",
        userId: request.user.sub,
        email: request.user.email,
        role: request.user.role
      }
    }
  )

  // Route which checks if user exists in DB, creates if not
  fastify.get(
    "/sync",
    { onRequest: [fastify.authenticate] },
    async (request, reply) => {
      const { sub: userId, email } = request.user;

      let user = await fastify.prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        user = await fastify.prisma.user.create({
          data: {
            id: userId,
            email: email,
          }
        });
      }

      return reply.send({
        message: "User synced",
        user
      });
    }
  )
}