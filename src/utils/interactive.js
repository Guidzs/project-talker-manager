const { readFile } = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const getTalkers = async () => {
  const data = await readFile(talkerPath, 'utf8');
  const talkers = JSON.parse(data);
  return talkers;
};

const getTalkerId = async (id) => {
  const talkers = await getTalkers();
  const talker = talkers.find((t) => Number(id) === t.id);
  return talker;
};

module.exports = {
  getTalkers,
  getTalkerId,
};
