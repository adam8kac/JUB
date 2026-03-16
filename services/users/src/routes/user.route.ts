import { OpenAPIHono } from '@hono/zod-openapi';
import { UserService } from '../services/user.service.js';
import { registerSchema, loginSchema } from '../schemas/user.schema.js';

const userService = new UserService();

export const userRoutes = new OpenAPIHono();

userRoutes.post('/register', async (c) => {
  const body = await c.req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        message: 'Validation error',
        errors: parsed.error.flatten(),
      },
      400,
    );
  }

  try {
    const user = await userService.register(parsed.data);
    return c.json(user, 201);
  } catch (err) {
    if (err instanceof Error && err.message.includes('already exists')) {
      return c.json({ message: err.message }, 409);
    }

    console.error(err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

userRoutes.post('/login', async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        message: 'Validation error',
        errors: parsed.error.flatten(),
      },
      400,
    );
  }

  try {
    const user = await userService.login(parsed.data);
    return c.json(user, 200);
  } catch (err) {
    if (err instanceof Error && err.message === 'Incorrect password or username') {
      return c.json({ message: err.message }, 401);
    }

    console.error(err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

userRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');

  if (!id) {
    return c.json({ message: 'User id is required' }, 400);
  }

  try {
    await userService.deleteById(id);
    return c.json({ message: 'User deleted successfully' }, 200);
  } catch (err) {
    if (err instanceof Error && err.message === 'USER_NOT_FOUND') {
      return c.json({ message: 'User not found' }, 404);
    }

    console.error('[DELETE USER ERROR]', err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

userRoutes.get('/', async (c) => {
  const users = await userService.getAll();
  return c.json(users, 200);
});

userRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');

  if (!id) {
    return c.json({ message: 'User id is required' }, 400);
  }

  const user = await userService.getById(id);
  if (!user) {
    return c.json({ message: 'User not found' }, 404);
  }

  return c.json(user, 200);
});
