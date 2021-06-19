const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { MONGO_URL, MONGO_OPTIONS } = require('./constants/mongoSettings');

const { errorHandler } = require('./middlewares/errorHandler');
const { NotFoundError } = require('./errors');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFoundError('Requested resource not found')));

app.use(errorHandler);

mongoose.connect(MONGO_URL, MONGO_OPTIONS);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
