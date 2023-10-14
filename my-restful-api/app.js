const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const jwt = require('jsonwebtoken');
const logger = require('./logger');


const app = express();
app.use(bodyParser.json());

// Konfigurasi koneksi ke database PostgreSQL
const db = pgp({
  user: 'postgres',
  password: 'Fahrezar77',
  host: 'localhost',
  port: 5432,
  database: 'movies-database',
});

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// ...

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Registration failed
 */

// Middleware untuk otentikasi
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = jwt.verify(token, '12345');
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Endpoint GET Users dengan paginasi
app.get('/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const usersPage = users.slice(startIndex, endIndex);
  res.json(usersPage);
});

// POSTGRES DATABASE QUERIES FOR USER MANAGEMENT

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Insert user data into the database
    const newUser = await db.one(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, password]
    );
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1 AND password = $2', [
      email,
      password,
    ]);
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ email: user.email }, 'your-secret-key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed' });
  }
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
