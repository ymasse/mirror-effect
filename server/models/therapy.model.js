/**
 * @file therapy.model.js 
 * Define the schema of a single Exercise object.
 *
 * This file contains the mongoose definition of a Therapy Model object.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enumValues = require('mongoose-enumvalues');

// Defining schema for our Todo API

var TherapySchema = Schema({
  therapist :  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  language: { 
    type: String,    
    enum: ['fr', 'en'],
    default: 'fr'
  },
  paralyzedSide: { type: String, required: false },
  dailyFrequency: { type: Number, required: false, default: 2},
  singleExerciseDuration: { type: Number, required: false, default: 3},
  delayBetweenExercise: { type: Number, required: false, default: 5},
  numberOfRepetition: { type: Number, required: false, default: 5},
  startDate: {  type: Date, default: Date.now },
  endDate: { type: Date },
  exercises: [ { type: Schema.Types.ObjectId, ref: 'Exercise', required: true }],
  notes: { type:String, required: false},
  completed: { type: Boolean, default: false },
  published: { type: Boolean, default: false }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });

// specifics for each method below
const enumOptions = {};

TherapySchema.plugin(enumValues, enumOptions);

//Exporting our model
module.exports = mongoose.model('Therapy', TherapySchema);