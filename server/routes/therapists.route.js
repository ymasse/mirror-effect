

const router = require('express').Router();
const therapistsController = require('../controllers/therapists.controller');

router.get('/', therapistsController.list_therapists);
router.get('/:username', therapistsController.get_therapist);
router.post('/', therapistsController.create_a_therapist);
router.delete('/:username', therapistsController.delete_a_therapist);


module.exports = router;