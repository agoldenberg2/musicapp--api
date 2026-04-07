const express = require('express');
const router = express.Router();
const { User } = require('../models/relations');

// CREATE
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// READ ONE
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });

  await user.update(req.body);
  res.json(user);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });

  await user.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;