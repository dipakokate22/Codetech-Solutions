const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dynamic_web_app',
  password: 'password', // Replace with your database password
  port: 5432,
});

// API Endpoints
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
