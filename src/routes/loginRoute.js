const express = require('express');
const { createToken } = require('../utils/interactive');
const { emailValidate, passwordValidate } = require('../middleware/loginValidation');
const { HTTP_OK_STATUS } = require('../utils/status');

const router = express.Router();

router.post('/', emailValidate, passwordValidate, async (_req, res) => {
  const token = createToken();

  res.status(HTTP_OK_STATUS).json({ token })
});

module.exports = router;