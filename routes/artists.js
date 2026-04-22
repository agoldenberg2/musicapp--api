const express = require('express');
const router = express.Router();
const { Artist } = require('../models/relations');

router.post('/', requireAuth, async (req, res) => {
  try {
    const item = await Artist.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', requireAuth, async (req, res) => {
  const items = await Artist.findAll();
  res.json(items);
});

router.get('/:id', requireAuth, async (req, res) => {
  const item = await Artist.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

router.put('/:id', requireAuth, async (req, res) => {
  const item = await Artist.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  await item.update(req.body);
  res.json(item);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const item = await Artist.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  await item.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;