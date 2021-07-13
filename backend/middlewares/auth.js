const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors');

const { JWT_SECRET_KEY } = require('../constants/jwtSecret');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return next(new UnauthorizedError('Error: authorization required'));

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Error: authorization required'));
  }

  req.user = payload;
  return next();
};

module.exports = { auth };
