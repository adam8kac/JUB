import { Hono } from 'hono';
import { proxy } from '../utils/proxy.js';
import { env } from '../config/env.js';
import { requireAuth } from '../middleware/auth.js';

export const cvRoutes = new Hono();

cvRoutes.post('/cv/save/:uid', requireAuth, (c) =>
  proxy(`${env.PDF_GENERATOR_URL}/api/save/${c.req.param('uid')}`, c)
);

cvRoutes.get('/cv/:uid/pdf', requireAuth, (c) =>
  proxy(`${env.PDF_GENERATOR_URL}/api/cv/${c.req.param('uid')}/pdf`, c)
);

cvRoutes.get('/cv/:uid', requireAuth, (c) =>
  proxy(`${env.PDF_GENERATOR_URL}/api/cv/${c.req.param('uid')}`, c)
);

cvRoutes.patch('/cv/:uid', requireAuth, (c) =>
  proxy(`${env.PDF_GENERATOR_URL}/api/cv/${c.req.param('uid')}`, c)
);

cvRoutes.delete('/cv/:uid', requireAuth, (c) =>
  proxy(`${env.PDF_GENERATOR_URL}/api/cv/${c.req.param('uid')}`, c)
);
