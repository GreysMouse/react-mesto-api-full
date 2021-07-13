// -------------------------------------------------------------------------------------
//    Get all cards:          GET:      /cards                      body: {}
//    Create card:            POST:     /cards                      body: {name, link}
//    Delete card:            DELETE:   /cards/cardId               body: {}
//    Check card like:        PUT:      /cards/:cardId/likes        body: {}
//    Uncheck card like:      DELETE:   /cards/:cardId/likes        body: {}
// -------------------------------------------------------------------------------------

const router = require('express').Router();

const { getCards, createCard, deleteCard, checkLike, uncheckLike } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', checkLike);
router.delete('/:cardId/likes', uncheckLike);

module.exports = router;
