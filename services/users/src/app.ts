import { OpenAPIHono } from '@hono/zod-openapi';
import './config/firestoreconf.js';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseApp } from './config/firestoreconf.js';
import { userRoutes } from './routes/user.route.js';
import { employerRoutes } from './routes/employer.route.js';

export const app = new OpenAPIHono();

app.get('/health', (c) => {
  return c.json({ status: 'lavfam 100' });
});

app.get('/health/firestore', async (c) => {
  try {
    const db = getFirestore(firebaseApp);
    const collections = await db.listCollections();
    return c.json({
      ok: true,
      message: 'Firestore connected',
      collectionsCount: collections.length,
    });
  } catch (err) {
    console.error('[Firestore]:', err);
    return c.json({ ok: false, message: err instanceof Error ? err.message : 'Firestore error' }, 503);
  }
});

app.route('/auth', userRoutes);
app.route('/employer', employerRoutes);

app.onError((err, c) => {
  console.error('[ERROR]: ', err);
  return c.json(
    {
      success: false,
      message: 'Internal server error',
    },
    500,
  );
});
