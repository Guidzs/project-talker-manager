const express = require('express');
const bodyParser = require('body-parser');
const { HTTP_OK_STATUS } = require('./utils/status');
const errorHandle = require('./middleware/err');
const talkerRoute = require('./routes/talkerRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.listen(PORT, () => console.log('Online'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.status(HTTP_OK_STATUS).send());

app.use('/login', loginRoute);
app.use('/talker', talkerRoute);
app.use(errorHandle);
