import jwt from 'jsonwebtoken';
import type { Context, Next } from 'hono';
import { env } from '../config/env.js';

export async function requireAuth(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const token = authHeader.slice(7);

  try {
    jwt.verify(token, env.JWT_SECRET);
    await next();
  } catch {
    return c.json({ message: 'Invalid or expired token' }, 401);
  }
}
