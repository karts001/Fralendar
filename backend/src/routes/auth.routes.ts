import { FastifyInstance } from "fastify";

import { AuthService } from "../services/authService";

export const authRoutes = async (fastify: FastifyInstance) => {
  const authService = new AuthService(fastify.prisma);
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
      const user = await authService.syncUser(userId, email);

      return reply.send({
        message: "User synced",
        user
      });
    }
  )
}