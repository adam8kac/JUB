import { Hono } from 'hono';
import { proxy } from '../utils/proxy.js';
import { env } from '../config/env.js';
import { requireAuth } from '../middleware/auth.js';

export const usersRoutes = new Hono();

usersRoutes.post('/auth/register', (c) => proxy(`${env.USERS_SERVICE_URL}/auth/register`, c));
usersRoutes.post('/auth/login', (c) => proxy(`${env.USERS_SERVICE_URL}/auth/login`, c));

usersRoutes.post('/employer/register', (c) => proxy(`${env.USERS_SERVICE_URL}/employer/register`, c));
usersRoutes.post('/employer/login', (c) => proxy(`${env.USERS_SERVICE_URL}/employer/login`, c));

usersRoutes.get('/auth', requireAuth, (c) => proxy(`${env.USERS_SERVICE_URL}/auth/`, c));
usersRoutes.get('/auth/:id', requireAuth, (c) => proxy(`${env.USERS_SERVICE_URL}/auth/${c.req.param('id')}`, c));
usersRoutes.delete('/auth/:id', requireAuth, (c) => proxy(`${env.USERS_SERVICE_URL}/auth/${c.req.param('id')}`, c));

usersRoutes.get('/employer', requireAuth, (c) => proxy(`${env.USERS_SERVICE_URL}/employer/`, c));
usersRoutes.get('/employer/:id', requireAuth, (c) => proxy(`${env.USERS_SERVICE_URL}/employer/${c.req.param('id')}`, c));
usersRoutes.delete('/employer/:id', requireAuth, (c) => proxy(`${env.USERS_SERVICE_URL}/employer/${c.req.param('id')}`, c));
