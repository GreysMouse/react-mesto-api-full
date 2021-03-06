const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { InvalidRequestError, UnauthorizedError } = require('../errors');

const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) throw new InvalidRequestError('Invalid request data');

  return User.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) throw new UnauthorizedError('Invalid email or password');

    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) throw new UnauthorizedError('Invalid email or password');

      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'kied34CNe3Jd208Jk', { expiresIn: '7d' });

      return res.cookie('jwt', token, { httpOnly: true, sameSite: 'lax' }).send({ email });
    });
  })
  .catch(next);
};

module.exports = { login };
