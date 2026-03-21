import { applicationDefault, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/** PEM from .env / Docker often has literal \\n or extra quotes — OpenSSL fails with DECODER routines::unsupported if wrong. */
function normalizePrivateKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, '\n').trim();
}

if (process.env['GOOGLE_APPLICATION_CREDENTIALS']) {
  initializeApp({ credential: applicationDefault() });
} else {
  initializeApp({
    credential: cert({
      projectId: process.env['FIREBASE_PROJECT_ID'],
      clientEmail: process.env['FIREBASE_CLIENT_EMAIL'],
      privateKey: normalizePrivateKey(process.env['FIREBASE_PRIVATE_KEY']),
    }),
  });
}

export const db = getFirestore();