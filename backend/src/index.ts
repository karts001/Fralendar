import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';

import prismaPlugin from './plugins/prisma';
import authPlugin from './plugins/auth';
import { authRoutes } from './routes/auth.routes';
import { calendarRoutes } from './routes/calendar.routes';

const app: FastifyInstance = Fastify({logger: true});

app.register(cors, { origin: true });
app.register(prismaPlugin);
app.register(authPlugin);

app.register(authRoutes, { prefix: '/auth' });
app.register(calendarRoutes, { prefix: '/calendars' });


app.listen({ port: 4000 }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 server running at ${address}`);
});
