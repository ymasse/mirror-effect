var passport = require('passport');
var jwt = require('jsonwebtoken');
require('../config/passport-config')(passport);

const router = require('express').Router();
const therapyController = require('../controllers/therapy.controller');

router.get('/', passport.authenticate('jwt', { session: false}), therapyController.list_therapies);
router.get('/:id', passport.authenticate('jwt', { session: false}), therapyController.get_therapy);
router.put('/:id', passport.authenticate('jwt', { session: false}), therapyController.update_therapy);
router.post('/', passport.authenticate('jwt', { session: false}), therapyController.create_a_therapy);
router.delete('/:id', passport.authenticate('jwt', { session: false}), therapyController.delete_a_therapy);

module.exports = router;