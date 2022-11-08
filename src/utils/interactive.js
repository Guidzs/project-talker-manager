const { readFile, writeFile } = require('fs').promises;
const { json } = require('body-parser');
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const getTalkers = async () => {
  const data = await readFile(talkerPath, 'utf8');
  const talkers = JSON.parse(data);
  return talkers;
};

module.exports = {
  getTalkers,
};
