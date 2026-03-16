import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth.config.js';

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId: userId }, authConfig.secret, {
    expiresIn: authConfig.secret_expires_in as any,
  });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId: userId }, authConfig.refresh_secret, {
    expiresIn: authConfig.refresh_secret_expires_in as any,
  });
}
