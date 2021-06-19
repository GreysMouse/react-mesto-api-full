// -------------------------------------------------------------------------------------
//    Get all users:          GET:    /users                 body: {}
//    Get user by id:         GET:    /users/:userId         body: {}
//    Create user:            POST:   /users                 body: {name, about, avatar}
//    Update user:            PATCH:  /users/me              body: {name, about}
//    Update user avatar:     PATCH:  /users/me/avatar       body: {avatar}
// -------------------------------------------------------------------------------------

const router = require('express').Router();

const { getUsers, getUser, getMyInfo, updateUser, updateAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyInfo);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
