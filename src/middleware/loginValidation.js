const { HTTP_INVALIDATE_STATUS } = require('../utils/status');

const emailValidate = (req, _res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  let err = { status: HTTP_INVALIDATE_STATUS };

  if (email === undefined) {
    err = { ...err, message: 'O campo "email" é obrigatório'};
    next(err);
  }
  if (!emailRegex.test(email)) {
    err = { ...err, message: 'O "email" deve ter o formato "email@email.com"'};
    next(err);
  }
  next()
};

const passwordValidate = (req, _res, next) => {
  const { password } = req.body;
  const passwordLenght = 6;
  let err = { status: HTTP_INVALIDATE_STATUS };


  if (password === undefined) {
    err = { ...err, message: 'O campo "password" é obrigatório'};
    next(err);
  }
  if (password.length < passwordLenght) {
    err = { ...err, message: 'O "password" deve ter pelo menos 6 caracteres'};
    next(err);
  }
  next();
}

module.exports = {
  emailValidate,
  passwordValidate,
};
