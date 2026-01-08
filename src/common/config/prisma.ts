import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma';

const isDevelopment = process.env.NODE_ENV === 'development';
const caPath = path.resolve(process.cwd(), './src/common/config/ca.pem');

const sslConfig = isDevelopment
  ? false
  : {
    rejectUnauthorized: true,
    ca: fs.readFileSync(caPath).toString(),
  };

const pool = new pg.Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  ssl: sslConfig,
});

pool.on('error', (err) => {
  console.error('POSTGRES POOL ERROR:', err.message);
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };
