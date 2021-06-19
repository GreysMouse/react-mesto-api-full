const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { InvalidRequestError, NotFoundError, ConflictError } = require('../errors');

const User = require('../models/user');

const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  if (!email || !password) throw new InvalidRequestError('Invalid request data');

  User.findOne({ email })
  .then((user) => {
    if (user) throw new ConflictError('Unique key error');
    return bcrypt.hash(password, SALT_ROUNDS);
  })
  .then((hash) => User.create({ name, about, avatar, email, password: hash }))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') next(new InvalidRequestError('Invdalid request data'));
    else next(err);
  });
};

const getUser = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new InvalidRequestError('Invalid request _id');

  User.findById(req.params.userId)
  .orFail(() => new NotFoundError('Object not found'))
  .then((user) => res.send(user))
  .catch(next);
};

const getMyInfo = (req, res, next) => User.findById(req.user._id)
  .orFail(() => new NotFoundError('Object not found'))
  .then((user) => res.send(user))
  .catch(next);

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  if (!name || !about) throw new InvalidRequestError('Invalid request data');

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
  .orFail(() => new NotFoundError('Object not found'))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') next(new InvalidRequestError('Invalid request data'));
    else next(err);
  });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (!avatar) throw new InvalidRequestError('Invalid request data');

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
  .orFail(() => new NotFoundError('Object not found'))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') next(new InvalidRequestError('Invalid request data'));
    else next(err);
  });
};

module.exports = { getUsers, getUser, getMyInfo, createUser, updateUser, updateAvatar };
