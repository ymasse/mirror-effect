/**
 * @file user.model.js 
 * Define the schema of a User object.
 *
 * This file contains the mongoose definition of a User Model object.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enumValues = require('mongoose-enumvalues');
var bcrypt = require('bcrypt-nodejs');


// Defining schema for our Todo API

var UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
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
  role: {
    type: String,    
    enum: ['therapist', 'patient', 'admin'],
    required:true
  },
  isAdmin: {
    type:Boolean,
    default:false
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

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};



// specifics for each method below
const enumOptions = {};

UserSchema.plugin(enumValues, enumOptions);

//Exporting our model
module.exports = mongoose.model('User', UserSchema);