import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
const USER = process.env.USERNAME;
const HOST = process.env.HOST;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT;

const pool = new Pool({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});

const CLOUD_HOST = process.env.CLOUD_HOST;
const CLOUD_USER = process.env.CLOUD_USER;
const CLOUD_PASS = process.env.CLOUD_PASS;
const CLOUD_DB = process.env.CLOUD_DB;

const client = new Pool({
  host: CLOUD_HOST,
  user: CLOUD_USER,
  password: CLOUD_PASS,
  database: CLOUD_DB,
});

export { pool as Database };
