import 'dotenv/config';

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET as string,
  USERS_SERVICE_URL: process.env.USERS_SERVICE_URL || 'http://localhost:3001',
  HUB_SERVICE_URL: process.env.HUB_SERVICE_URL || 'http://localhost:8080',
  PDF_GENERATOR_URL: process.env.PDF_GENERATOR_URL || 'http://localhost:3002',
};
