import { createHash } from 'crypto';

export function generateSHA256(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}
