const express = require('express');
const {
  getTalkers,
  getTalkerId,
} = require('../utils/interactive');
const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
} = require('../utils/status');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerId(id);
  if (!talker) { 
    return res
      .status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

module.exports = router;