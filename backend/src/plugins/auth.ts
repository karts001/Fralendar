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
      try {
        const { header, payload } = token as {
          header: { kid?: string; alg?: string};
          payload: { iss?: string }
        };
        const { kid, alg} = header;
        const { iss } = payload;

        if (!kid) throw new Error('Missing kid in token header');

        if (!alg) throw new Error('Missing alg from token header');

        if (!iss) throw new Error('Missing iss in token payload');

        // Get public key from JWKS endpoint
        const publicKey = await getJwks.getPublicKey({
          kid,
          domain: iss,
          alg: alg || 'ES256'
        });
        return publicKey;
      } catch(error) {
        fastify.log.error({ error }, 'Failed to resolve JWT secret');
        throw error;
      }
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