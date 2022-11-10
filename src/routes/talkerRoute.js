const express = require('express');
const {
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate,
  rateValidation,
} = require('../middleware/talkerValidation');
const {
  getTalkers,
  getTalkerId,
  addTalker,
  replaceTalker,
  deleteTalker,
} = require('../utils/interactive');
const {
  HTTP_OK_STATUS,
  HTTP_CREATED_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_NO_CONTENT_STATUS,
} = require('../utils/status');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await getTalkers();
  res.status(HTTP_OK_STATUS).json(talkers);
});

router.get('/search', tokenValidate, async (req, res) => {
  const { q } = req.query;
  const talkers = await getTalkers();
  const filterTalkers = talkers
    .filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));

  res.status(HTTP_OK_STATUS).json(filterTalkers);
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

router.post('/',
tokenValidate,
nameValidate,
ageValidate,
talkValidate,
watchedAtValidate,
rateValidation,
async (req, res) => {
  const talkerObjct = req.body;
  const newTalker = await addTalker(talkerObjct);
  return res.status(HTTP_CREATED_STATUS).json(newTalker);
});

router.put('/:id',
tokenValidate,
nameValidate,
ageValidate,
talkValidate,
watchedAtValidate,
rateValidation,
async (req, res) => {
  const { id } = req.params;
  const talkerObjct = req.body;

  const newTalker = await replaceTalker(Number(id), talkerObjct);

  res.status(HTTP_OK_STATUS).json(newTalker);
});

router.delete('/:id', tokenValidate, async (req, res) => {
  const { id } = req.params;
  deleteTalker(Number(id));

  res.status(HTTP_NO_CONTENT_STATUS).send();
});

module.exports = router;