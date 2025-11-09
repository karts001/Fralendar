import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  // Make Prisma Client available through Fastify instance
  server.decorate('prisma', prisma);

  // Disconnect Prisma Client when Fastify instance is closed
  server.addHook('onClose', async (server) => {
    await prisma.$disconnect();
  })
})

export default prismaPlugin;