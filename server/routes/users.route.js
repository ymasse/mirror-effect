var passport = require('passport');
require('../config/passport-config')(passport);

const router = require('express').Router();
const usersController = require('../controllers/users.controller');

router.get('/', passport.authenticate('jwt', { session: false}), usersController.list_users);
router.get('/:username', usersController.get_user);
router.post('/', usersController.create_a_user);
router.put('/:username', usersController.update_a_user);
router.delete('/:username', usersController.delete_a_user);


module.exports = router;