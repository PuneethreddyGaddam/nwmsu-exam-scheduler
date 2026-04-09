import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  const files = ['../spring2026.csv', '../fall2026.csv'];

  try {
    // 1. Create table
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('✅ Table exam_blocks created or reset');

    let inserted = 0;

    // 2. Insert records
    for (const file of files) {
      const csvPath = path.join(__dirname, file);
      if (!fs.existsSync(csvPath)) {
        console.warn(`⚠️ Warning: ${file} not found. Skipping.`);
        continue;
      }

      const data = fs.readFileSync(csvPath, 'utf8');
      const lines = data.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      
      // skip header
      for (let i = 1; i < lines.length; i++) {
        // Our CSVs are very clean and have exactly 5 columns separated by commas
        const [term, meeting_days, meeting_time, exam_date, exam_time] = lines[i].split(',');
        
        await pool.query(
          `INSERT INTO exam_blocks (term, meeting_days, meeting_time, exam_date, exam_time)
           VALUES ($1, $2, $3, $4, $5)`,
          [term, meeting_days, meeting_time, exam_date, exam_time]
        );
        inserted++;
      }
      console.log(`✅ Seeded ${file}`);
    }

    console.log(`🎉 Success! Inserted ${inserted} exam blocks.`);
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    pool.end();
  }
}

seed();
