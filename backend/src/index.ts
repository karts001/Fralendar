import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import 'dotenv/config';

import prismaPlugin from './plugins/prisma';
import authPlugin from './plugins/auth';
import { authRoutes } from './routes/auth.routes';
import { calendarRoutes } from './routes/calendar.routes';
import { eventRoutes } from './routes/event.routes';

const app: FastifyInstance = Fastify({
  logger: {
    level: 'debug'
  }});

app.register(cors, { 
  origin: true,
  methods: ['GET', 'HEAD', 'POST', 'DELETE', 'UPDATE']
});
app.register(prismaPlugin);
app.register(authPlugin);

app.register(authRoutes, { prefix: '/auth' });
app.register(calendarRoutes, { prefix: '/calendars' });
app.register(eventRoutes, { prefix: '/events' });


app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 server running at ${address}`);
});
