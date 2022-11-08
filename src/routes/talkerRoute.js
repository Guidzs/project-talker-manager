const express = require('express');
const { getTalkers } = require('../utils/interactive')
const { HTTP_OK_STATUS } = require('../utils/status');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers)
});

module.exports = router;