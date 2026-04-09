import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is missing in .env");
  process.exit(1);
}

// Connect to the default 'postgres' database to issue CREATE DATABASE command
const defaultUrl = process.env.DATABASE_URL.replace(/\/nwmsu_exams$/, '/postgres');
const { Client } = pg;

async function setup() {
  const client = new Client({ connectionString: defaultUrl });
  try {
    await client.connect();
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname='nwmsu_exams'");
    if (res.rowCount === 0) {
      await client.query('CREATE DATABASE nwmsu_exams');
      console.log('✅ Database "nwmsu_exams" created successfully.');
    } else {
      console.log('✅ Database "nwmsu_exams" already exists.');
    }
  } catch (err) {
    // Check if the user password failed
    console.error("RAW POSTGRES ERROR IS:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}
setup();
