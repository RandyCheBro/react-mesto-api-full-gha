const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // eslint-disable-next-line no-undef
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
