const router = require('express').Router();
const express = require('express');
const mongoose = require('mongoose');
let config = require('config'); //we load the db location from the JSON files

const Patient = require('../models/patient.model.js');
const Exercise = require('../models/exercise.model.js');
const Therapist = require('../models/therapist.model.js');
const User = require('../models/user.model.js');
const Therapy = require('../models/therapy.model.js');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

mongoose.connect(config.DBHost, {
  useMongoClient: true,
  /* other options */
}); 

// api/patients
router.use('/patients', require('./patients.route')); 

// api/therapists
router.use('/therapists', require('./therapists.route')); 

// api/exercises
router.use('/exercises', require('./exercise.route')); 

// api/users
router.use('/users', require('./users.route')); 

// api/auth
router.use('/auth', require('./auth.route')); 

// api/therapy
router.use('/therapy', require('./therapy.route'));

module.exports = router;