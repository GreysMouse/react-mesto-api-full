const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return next(new UnauthorizedError('Error: authorization required'));

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'kied34CNe3Jd208Jk');
  } catch (err) {
    return next(new UnauthorizedError('Error: authorization required'));
  }

  req.user = payload;
  return next();
};

module.exports = { auth };
