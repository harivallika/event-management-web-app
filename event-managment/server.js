import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mysql',
  database: process.env.DB_NAME || 'event_management'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Get all events
app.get('/api/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching events' });
    } else {
      res.json(results);
    }
  });
});

// Register for an event
app.post('/api/register', (req, res) => {
  const { event_id, name, email } = req.body;

  if (!event_id || !name || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query(
    'INSERT INTO registrations (event_id, name, email) VALUES (?, ?, ?)',
    [event_id, name, email],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Error registering for event' });
      } else {
        res.status(201).json({ message: 'Registration successful' });
      }
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
