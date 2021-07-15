// -------------------------------------------------------------------------------------
//    Get all users:          GET:    /users                 body: {}
//    Get user by id:         GET:    /users/:userId         body: {}
//    Create user:            POST:   /users                 body: {name, about, avatar}
//    Update user:            PATCH:  /users/me              body: {name, about}
//    Update user avatar:     PATCH:  /users/me/avatar       body: {avatar}
// -------------------------------------------------------------------------------------

const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const { getUsers, getUser, getMyInfo, updateUser, updateAvatar } = require('../controllers/users');

const { URL_REG_EXP } = require('../constants/regExps');

router.get('/', getUsers);
router.get('/me', getMyInfo);
router.get('/:userId', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(200),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REG_EXP),
  }),
}), updateAvatar);

module.exports = router;
