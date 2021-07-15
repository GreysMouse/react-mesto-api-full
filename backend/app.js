require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { celebrate, Joi, errors } = require('celebrate');

const { MONGO_URL, MONGO_OPTIONS } = require('./constants/mongoSettings');
const { CORS_ALLOWED_URLS, CORS_ALLOWED_METHODS, CORS_ALLOWED_HEADERS } = require('./constants/corsSettings');

const { errorHandler } = require('./middlewares/errorHandler');
const { NotFoundError } = require('./errors');
const { login } = require('./controllers/login');
const { logout } = require('./controllers/logout');
const { createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (CORS_ALLOWED_URLS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', CORS_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', CORS_ALLOWED_HEADERS);
      res.status(204).send();
    } else next();
  } else next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);

app.post('/logout', logout);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFoundError('Requested resource not found')));

app.use(errorLogger);

app.use(errors()); //
app.use(errorHandler);

mongoose.connect(MONGO_URL, MONGO_OPTIONS);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
