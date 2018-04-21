/**
 * @file exercise.model.js 
 * Define the schema of a single Exercise object.
 *
 * This file contains the mongoose definition of an Exercise Model object.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enumValues = require('mongoose-enumvalues');

// Defining schema for our Todo API

var ExerciseSchema = Schema({
  description: {
    type: String,
    required: true
  },
  language: {
    type: String,    
    enum: ['fr', 'en'],
    default: 'fr'
  },
  username: {
    type: String,
    required: true
  }
}, 
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// specifics for each method below
const enumOptions = {};

ExerciseSchema.plugin(enumValues, enumOptions);

//Exporting our model
module.exports = mongoose.model('Exercise', ExerciseSchema);