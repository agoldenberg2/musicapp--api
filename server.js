// server.js
const sequelize = require('./models');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = 'mykey'; 

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: "MusicApp API running 🎵" });
});

// Sync database
sequelize.sync().then(() => {
  console.log("Database synced");
});

// Routes
const songRoutes = require('./routes/songs');
const userRoutes = require('./routes/users');
const artistRoutes = require('./routes/artists');
const albumRoutes = require('./routes/albums');
const playlistRoutes = require('./routes/playlists');

app.use('/songs', songRoutes);
app.use('/users', userRoutes);
app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/playlists', playlistRoutes);

//  test route to verify server is working without authentication
app.get('/test', (req, res) => {
  res.send("Test works");
});


// Login route
app.post('/login', (req, res) => {
  const { username } = req.body;

  const user = { username };

  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware to protect routes
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Protected route example
app.get('/test-auth', requireAuth, (req, res) => {
  res.json({ message: "you are authenticated", user: req.user });
});

app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: "you have access to this protected route", user: req.user });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;