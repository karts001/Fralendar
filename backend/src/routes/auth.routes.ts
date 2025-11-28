import { FastifyInstance } from "fastify";

import { AuthService } from "../services/authService";
import { AuthController } from "../controllers/authController";

export const authRoutes = async (fastify: FastifyInstance) => {
  const authService = new AuthService(fastify.prisma);
  const authController = new AuthController(authService);

  fastify.get(
    "/test-protected", 
    { onRequest: [fastify.authenticate] },
    async (request, reply) => authController.testProtected(request, reply)
  );

  // Route which checks if user exists in DB, creates if not
  fastify.get(
    "/sync",
    { onRequest: [fastify.authenticate] },
    (request, reply) => authController.syncUser(request, reply)
  );
}