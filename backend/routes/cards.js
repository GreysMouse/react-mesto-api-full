// -------------------------------------------------------------------------------------
//    Get all cards:          GET:      /cards                      body: {}
//    Create card:            POST:     /cards                      body: {name, link}
//    Delete card:            DELETE:   /cards/cardId               body: {}
//    Check card like:        PUT:      /cards/:cardId/likes        body: {}
//    Uncheck card like:      DELETE:   /cards/:cardId/likes        body: {}
// -------------------------------------------------------------------------------------

const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { getCards, createCard, deleteCard, checkLike, uncheckLike } = require('../controllers/cards');

const { URL_REG_EXP } = require('../constants/regExps');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REG_EXP),
  }),
}), createCard);

router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', checkLike);
router.delete('/:cardId/likes', uncheckLike);

module.exports = router;
