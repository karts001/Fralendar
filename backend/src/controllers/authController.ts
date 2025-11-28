import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async testProtected(request: FastifyRequest, reply: FastifyReply) {
    return {
      message: "Token verified!",
      userId: request.user.sub,
      email: request.user.email,
      role: request.user.role
    };
  };

  async syncUser(request: FastifyRequest, reply: FastifyReply) {
    const { sub: userId, email } = request.user;
    const user = await this.authService.syncUser(userId, email);

    return reply.status(200).send({
      message: "User synced",
      user
    });
    }
  }
