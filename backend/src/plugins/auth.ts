import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import buildGetJwks from 'get-jwks';
import { FastifyPluginAsync } from 'fastify';
import { httpErrors } from '@fastify/sensible';;

// Use TypeScript module augmentation to declare the type of server.authenticate}
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}

const authPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const getJwks = buildGetJwks()

  // Register JWT plugin in "verify-only" mode with dynamic secret
  fastify.register(jwt, {
    decode: { complete: true },
    secret: async (request, token) => {
      const { header: { kid, alg }, payload: { iss } } = token;
      return getJwks.getPublicKey({ kid, domain: iss, alg: 'ES256' });
    },
  });
  fastify.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw httpErrors.unauthorized("Invalid or missing token");
    }
  })
  })

export default authPlugin;