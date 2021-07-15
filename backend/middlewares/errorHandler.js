/* eslint-disable no-unused-vars */
const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (isCelebrateError(err)) res.status(statusCode).send({ message });
  else res.status(statusCode).send({
    message: statusCode === 500 ? 'Server error' : message,
  });
};

module.exports = { errorHandler };
