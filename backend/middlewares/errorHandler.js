/* eslint-disable no-unused-vars */
const { isCelebrateError } = require('celebrate');

const celebrateErrorHandler = (err, req, res, next) => {
  if (!isCelebrateError(err)) next(err);
  else res.status(400).send({
    message: 'Invalid request data',
  });
};

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Server error' : message,
  });
};

module.exports = { errorHandler, celebrateErrorHandler };
