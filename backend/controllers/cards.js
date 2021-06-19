const mongoose = require('mongoose');

const { InvalidRequestError, NotFoundError, ForbiddenError } = require('../errors');

const Card = require('../models/card');

const getCards = (req, res, next) => Card.find({})
  .then((card) => res.send(card))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  if (!name || !link) throw new InvalidRequestError('Invalid request data');

  Card.create({ name, link, owner: req.user._id })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') next(new InvalidRequestError('Invdalid request data'));
    else next(err);
  });
};

const deleteCard = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) throw new InvalidRequestError('Invalid request _id');

  Card.findById(req.params.cardId)
  .orFail(() => new NotFoundError('Object not found'))
  .then((card) => {
    if (card.owner == req.user._id) return card;
    throw new ForbiddenError('No access');
  })
  .then(() => Card.findByIdAndRemove(req.params.cardId))
  .then((card) => res.send(card))
  .catch(next);
};

const checkLike = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) throw new InvalidRequestError('Invalid request _id');

  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user._id,
    } }, { new: true })
    .orFail(() => new NotFoundError('Object not found'))
    .then((card) => res.send(card))
    .catch(next);
};

const uncheckLike = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) throw new InvalidRequestError('Invalid request _id');

  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user._id,
    } }, { new: true })
    .orFail(() => new NotFoundError('Object not found'))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = { getCards, createCard, deleteCard, checkLike, uncheckLike };
