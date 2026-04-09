import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// 1. GET /api/lookup - The exact logic we discussed
app.get('/api/lookup', async (req, res) => {
  try {
    const { semester, day, time } = req.query;

    if (!semester || !day || !time) {
      return res.status(400).json({ error: 'Missing required query parameters' });
    }

    // This query finds the closest class_time using EPOCH diff. Great for catching "9:35 AM" -> "9:30 AM" matches
    const query = `
      SELECT * FROM exam_blocks
      WHERE term = $1 AND meeting_days = $2
      ORDER BY ABS(EXTRACT(EPOCH FROM (meeting_time::time - $3::time)))
      LIMIT 1
    `;

    const { rows } = await pool.query(query, [semester, day, time]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No matching exam block found.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Lookup Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
