import { getApps, initializeApp, cert } from 'firebase-admin/app';
import env from 'dotenv';
env.config();

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  throw new Error('Missing Firebase environment variables');
}

console.log('PORJECTID: ', projectId);
console.log('EMAIL: ', clientEmail);

export const firebaseApp =
  getApps()[0] ||
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
