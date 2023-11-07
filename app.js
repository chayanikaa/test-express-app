const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;
app.use(express.json());


const { username, password } = JSON.parse(process.env.DB_USERNAME_PASSWORD);

// Connect to PostgreSQL
const pool = new Pool({
  host: process.env.DB_ENDPOINT,
  port: process.env.DB_PORT,
  user: username,
  password,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS simple_entries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Table is successfully created');
});

app.get('/', (req, res) => {
  res.send('Hello Express World!');
});

// Add an entry
app.post('/add', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Name is required");
  }

  const result = await pool.query('INSERT INTO simple_entries (name) VALUES ($1) RETURNING *', [name]);
  res.json(result.rows[0]);
});

// Get all entries
app.get('/entries', async (req, res) => {
  const result = await pool.query('SELECT * FROM simple_entries');
  res.json(result.rows);
});


app.listen(port, () => {
  console.log(`Example app deployed through ECS test1`);
  console.log('DB Name', process.env.DB_NAME);
  console.log('DB Endpoint', process.env.DB_ENDPOINT);
  console.log('DB Port', process.env.DB_PORT);

});
