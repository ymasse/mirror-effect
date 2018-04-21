/**
 * @file patient.model.js 
 * Define the schema of a Patient object.
 *
 * This file contains the mongoose definition of a Patient Model object.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enumValues = require('mongoose-enumvalues');

// Defining schema for our Todo API

var PatientSchema = Schema({
  username: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  paralyzed_side: {
    type: String,    
    enum: ['left', 'right', 'unknown'],
    default: 'unknown'
  },
  language: {
    type: String,    
    enum: ['fr', 'en'],
    default: 'fr'
  },
  created_by: {
    type: Date,
    default: Date.now
  }
});


// specifics for each method below
const enumOptions = {};

PatientSchema.plugin(enumValues, enumOptions);

//Exporting our model
module.exports = mongoose.model('Patient', PatientSchema);