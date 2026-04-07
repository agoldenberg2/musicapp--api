const express = require('express');
const router = express.Router();
const { Playlist } = require('../models/relations');

// CREATE
router.post('/', async (req, res) => {
  try {
    const song = await Playlist.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const songs = await Playlist.findAll();
  res.json(songs);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (!song) return res.status(404).json({ error: "Not found" });
  res.json(song);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (!song) return res.status(404).json({ error: "Not found" });

  await song.update(req.body);
  res.json(song);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  if (!song) return res.status(404).json({ error: "Not found" });

  await song.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;