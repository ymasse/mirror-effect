var passport = require('passport');
var jwt = require('jsonwebtoken');
require('../config/passport-config')(passport);

const router = require('express').Router();
const exerciseController = require('../controllers/exercise.controller');

router.get('/', passport.authenticate('jwt', { session: false}), exerciseController.list_exercises);
router.get('/:id', passport.authenticate('jwt', { session: false}), exerciseController.get_exercise);
router.put('/:id', passport.authenticate('jwt', { session: false}), exerciseController.update_exercise);
router.post('/', passport.authenticate('jwt', { session: false}), exerciseController.create_an_exercise);
router.delete('/:id', passport.authenticate('jwt', { session: false}), exerciseController.delete_an_exercise);

module.exports = router;