const {
  HTTP_INVALIDATE_STATUS,
  HTTP_UNAUTHENTICATED_STATUS,
} = require('../utils/status');

const dateFormat = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

const tokenValidate = (req, _res, next) => {
  const { authorization } = req.headers;
  const tokenLength = 16;
  if (authorization === undefined) {
    next({
      status: HTTP_UNAUTHENTICATED_STATUS,
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== tokenLength) {
    next({
      status: HTTP_UNAUTHENTICATED_STATUS,
      message: 'Token inválido',
    });
  }
  next();
};

const nameValidate = (req, _res, next) => {
  const { name } = req.body;
  const MIN_NAME_LENGTH = 3;

  if (name === undefined) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < MIN_NAME_LENGTH) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const ageValidate = (req, _res, next) => {
  const { age } = req.body;
  const MIN_AGE = 18;

  if (age === undefined) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < MIN_AGE) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const talkValidate = (req, _res, next) => {
  const { talk } = req.body;

  if (talk === undefined) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'O campo "talk" é obrigatório',
    });
  }
  next();
};

const watchedAtValidate = (req, _res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (watchedAt === undefined) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'O campo "watchedAt" é obrigatório',
    });
  }  
  if (!dateFormat.test(watchedAt)) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }  
  next();
};

const rateValidation = (req, _res, next) => {
  const { talk: { rate } } = req.body;

  if (rate === undefined) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (!([rate >= 1 && rate <= 5, Number.isInteger(rate)].every((i) => i === true))) {
    next({
      status: HTTP_INVALIDATE_STATUS,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

module.exports = {
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate,
  rateValidation,
};
