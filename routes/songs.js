const express = require('express');
const router = express.Router();
const { Song } = require('../models/relations');

// CREATE
router.post('/', requireAuth, async (req, res) => {
  try {
    const item = await Song.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', requireAuth, async (req, res) => {
  const items = await Song.findAll();
  res.json(items);
});

// READ ONE
router.get('/:id', requireAuth, async (req, res) => {
  const item = await Song.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

// UPDATE
router.put('/:id', requireAuth,  async (req, res) => {
  const item = await Song.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  await item.update(req.body);
  res.json(item);
});

// DELETE
router.delete('/:id', requireAuth, async (req, res) => {
  const item = await Song.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  await item.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;