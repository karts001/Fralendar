import "@fastify/jwt";
import { JwtPayload } from "../types/jwtPayload.js";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}