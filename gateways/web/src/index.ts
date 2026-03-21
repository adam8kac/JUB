import { serve } from '@hono/node-server';
import { app } from './app.js';
import { env } from './config/env.js';

console.log(`Web gateway running on http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
