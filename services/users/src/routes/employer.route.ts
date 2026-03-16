import { OpenAPIHono } from '@hono/zod-openapi';
import { EmployerService } from '../services/employer.service.js';
import { employerRegisterSchema, empolyerLoginSchema } from '../schemas/employer.schema.js';

const employerService = new EmployerService();

export const employerRoutes = new OpenAPIHono();

employerRoutes.post('/register', async (c) => {
  const body = await c.req.json();
  const parsed = employerRegisterSchema.safeParse(body);

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
    const user = await employerService.register(parsed.data);
    return c.json(user, 201);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('not found in registry')) {
        console.warn('[EMPLOYER][REGISTER] Not in registry:', err.message);
        return c.json({ message: err.message }, 404);
      }

      if (err.message.includes('already registered')) {
        console.warn('[EMPLOYER][REGISTER] Already registered:', err.message);
        return c.json({ message: err.message }, 409);
      }

      if (err.message.includes('Could not register an employer')) {
        console.error('[EMPLOYER][REGISTER] Create failed:', err.message);
        return c.json({ message: err.message }, 500);
      }

      console.error('[EMPLOYER][REGISTER] Unexpected error:', err);
    } else {
      console.error('[EMPLOYER][REGISTER] Non-error thrown:', err);
    }
    return c.json({ message: 'Internal server error' }, 500);
  }
});

employerRoutes.post('/login', async (c) => {
  const body = await c.req.json();
  const parsed = empolyerLoginSchema.safeParse(body);

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
    const user = await employerService.login(parsed.data);
    return c.json(user, 200);
  } catch (err) {
    if (err instanceof Error) {
      switch (err.message) {
        case 'EMPLOYER_NOT_FOUND':
          console.warn('[EMPLOYER][LOGIN] 404 not found error', err);
          return c.json({ message: 'Employer not found' }, 404);

        case 'EMPLOYER_INVALID_CREDENTIALS':
          console.warn('[EMPLOYER][LOGIN] 401 invalid credentials', err);
          return c.json({ message: 'Incorrect registration number/email or password' }, 401);

        default:
          console.error('[EMPLOYER][LOGIN] Unexpected error', err);
          return c.json({ message: 'Internal server error' }, 500);
      }
    }

    console.error('[EMPLOYER][LOGIN] Non-error thrown', err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

employerRoutes.delete('/:companyRegistrationNumber', async (c) => {
  const companyRegistrationNumber = c.req.param('companyRegistrationNumber');

  if (!companyRegistrationNumber) {
    return c.json({ message: 'Company registration number is required' }, 400);
  }

  try {
    await employerService.deleteByCompanyRegistrationNumber(companyRegistrationNumber);
    return c.json({ message: 'Employer deleted successfully' }, 200);
  } catch (err) {
    if (err instanceof Error && err.message === 'EMPLOYER_NOT_FOUND') {
      console.warn('[EMPLOYER][DELETE] Employer not found', { companyRegistrationNumber });
      return c.json({ message: 'Employer not found' }, 404);
    }

    console.error('[EMPLOYER][DELETE] Unexpected error', err);
    return c.json({ message: 'Internal server error' }, 500);
  }
});

employerRoutes.get('/', async (c) => {
  const employers = await employerService.getAll();
  return c.json(employers, 200);
});

employerRoutes.get('/:companyRegistrationNumber', async (c) => {
  const companyRegistrationNumber = c.req.param('companyRegistrationNumber');

  if (!companyRegistrationNumber) {
    return c.json({ message: 'Company registration number is required' }, 400);
  }

  const employer = await employerService.getByCompanyRegistrationNumber(companyRegistrationNumber);
  if (!employer) {
    return c.json({ message: 'Employer not found' }, 404);
  }

  return c.json(employer, 200);
});
