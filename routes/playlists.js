const express = require('express');
const router = express.Router();
const { Playlist } = require('../models/relations');

const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// CREATE
router.post('/', requireAuth, async (req, res) => {
try {
    const song = await Playlist.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', requireAuth, async (req, res) => {
  const songs = await Playlist.findAll();
  res.json(songs);
});

// READ ONE
router.get('/:id', requireAuth, async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (!song) return res.status(404).json({ error: "Not found" });
  res.json(song);
});

// UPDATE
router.put('/:id', requireAuth, async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (!song) return res.status(404).json({ error: "Not found" });

  await song.update(req.body);
  res.json(song);
});

// DELETE
router.delete('/:id', requireAuth, async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (!song) return res.status(404).json({ error: "Not found" });

  await song.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;