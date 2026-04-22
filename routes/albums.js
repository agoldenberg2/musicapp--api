const express = require('express');
const router = express.Router();
const { Album } = require('../models/relations');

router.post('/', requireAuth, async (req, res) => {
  try {
    const item = await Album.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', requireAuth, async (req, res) => {
  const items = await Album.findAll();
  res.json(items);
});

router.get('/:id', requireAuth, async (req, res) => {
  const item = await Album.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.put('/:id', requireAuth, async (req, res) => {
  const item = await Album.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  await item.update(req.body);
  res.json(item);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const item = await Album.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  await item.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;