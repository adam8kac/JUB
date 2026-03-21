import { Hono } from 'hono';
import { proxy } from '../utils/proxy.js';
import { env } from '../config/env.js';
import { requireAuth } from '../middleware/auth.js';

export const hubRoutes = new Hono();

hubRoutes.get('/cvs', (c) => proxy(`${env.HUB_SERVICE_URL}/cvs`, c));
hubRoutes.get('/cvs/:uid', (c) => proxy(`${env.HUB_SERVICE_URL}/cvs/${c.req.param('uid')}`, c));

hubRoutes.get('/jobs', (c) => proxy(`${env.HUB_SERVICE_URL}/jobs`, c));
hubRoutes.get('/jobs/:id', (c) => proxy(`${env.HUB_SERVICE_URL}/jobs/${c.req.param('id')}`, c));

hubRoutes.post('/jobs', requireAuth, (c) => proxy(`${env.HUB_SERVICE_URL}/jobs`, c));
hubRoutes.put('/jobs/:id', requireAuth, (c) => proxy(`${env.HUB_SERVICE_URL}/jobs/${c.req.param('id')}`, c));
hubRoutes.delete('/jobs/:id', requireAuth, (c) => proxy(`${env.HUB_SERVICE_URL}/jobs/${c.req.param('id')}`, c));

hubRoutes.post('/requests', requireAuth, (c) => proxy(`${env.HUB_SERVICE_URL}/requests`, c));
hubRoutes.patch('/requests/:id', requireAuth, (c) => proxy(`${env.HUB_SERVICE_URL}/requests/${c.req.param('id')}`, c));
hubRoutes.get('/inbox/:userId', requireAuth, (c) => proxy(`${env.HUB_SERVICE_URL}/inbox/${c.req.param('userId')}`, c));

hubRoutes.get('/notifications/stream/:userId', requireAuth, (c) =>
  proxy(`${env.HUB_SERVICE_URL}/notifications/stream/${c.req.param('userId')}`, c),
);
