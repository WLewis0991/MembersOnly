import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT 1')
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err: Error) => console.error('❌ DB connection error:', err.message));

export default pool;