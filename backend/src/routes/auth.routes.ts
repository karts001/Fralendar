import { FastifyInstance } from "fastify";
import { JwtPayload } from "../types/jwtPayload.js";

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
}
