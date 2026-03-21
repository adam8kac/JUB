import { Hono } from 'hono';
import { swaggerUI } from '@hono/swagger-ui';
import { usersRoutes } from './routes/users.route.js';
import { cvRoutes } from './routes/cv.route.js';
import { hubRoutes } from './routes/hub.route.js';
import { openApiSpec } from './swagger.js';

export const app = new Hono();

app.get('/health', (c) => c.json({ status: 'ok', gateway: 'web' }));

app.get('/api-docs', swaggerUI({ url: '/api-docs/json' }));
app.get('/api-docs/json', (c) => c.json(openApiSpec));

app.route('/', usersRoutes);
app.route('/', cvRoutes);
app.route('/', hubRoutes);

app.onError((err, c) => {
  console.error('[WEB-GATEWAY ERROR]:', err);
  return c.json({ message: 'Gateway error' }, 502);
});
