const express = require('express');
const { createToken } = require('../utils/interactive');
const { HTTP_OK_STATUS } = require('../utils/status');

const router = express.Router();

router.post('/', async (_req, res) => {
  const token = createToken();

  res.status(HTTP_OK_STATUS).json({ token })
});

module.exports = router;