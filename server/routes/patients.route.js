

const router = require('express').Router();
const patientsController = require('../controllers/patients.controller');

// router.param('username', function(req, res, next, username){
//   User.findOne({username: username}).then(function(user){
//     if (!user) { return res.sendStatus(404); }

//     req.profile = user;

//     return next();
//   }).catch(next);
// });


router.get('/', patientsController.list_patients);
router.get('/:username', patientsController.get_patient);
router.post('/', patientsController.create_a_patient);
router.delete('/:username', patientsController.delete_a_patient);


// 'use strict';
// module.exports = function(app) {
//   var patientsController = require('../controllers/patients.controller');

//   // todoList Routes
//   app.route('/patients')
//     .get(patientsController.list_patients);

// };

module.exports = router;