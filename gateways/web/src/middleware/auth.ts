import jwt from 'jsonwebtoken';
import type { Context, Next } from 'hono';
import { env } from '../config/env.js';

export async function requireAuth(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  const queryToken = c.req.query('token');

  if (!authHeader?.startsWith('Bearer ') && !queryToken) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : queryToken!;

  try {
    jwt.verify(token, env.JWT_SECRET);
    await next();
  } catch {
    return c.json({ message: 'Invalid or expired token' }, 401);
  }
}
