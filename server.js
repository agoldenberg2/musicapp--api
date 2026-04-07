const sequelize = require('./models');
const express = require('express');
const app = express();

app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.json({ message: "MusicApp API running 🎵" });
});
sequelize.sync().then(() => {
  console.log("Database synced");
});

const songRoutes = require('./routes/songs');
app.use('/songs', songRoutes);

app.get('/test', (req, res) => {
  res.send("Test works");
});

const userRoutes = require('./routes/users');
const artistRoutes = require('./routes/artists');
const albumRoutes = require('./routes/albums');
const playlistRoutes = require('./routes/playlists');

app.use('/users', userRoutes);
app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/playlists', playlistRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;