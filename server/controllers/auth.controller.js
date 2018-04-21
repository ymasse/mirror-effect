'use strict';

let passport = require('passport');
require('../config/passport-config')(passport);
var jwt = require('jsonwebtoken');
let config = require('config');


let mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.signin = function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token

          var currentUser = {
            username: user.username,
            role: user.role,
            isAdmin: user.isAdmin,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            language: user.language
          };
          var token = jwt.sign(currentUser, config.secret);


          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token, user: currentUser});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
};

// TODO this should be used only to create the first admin user.  We should remove it after deployment.
exports.signup = function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please enter username and password.'});
  } else {
    var newUser = new User(req.body);
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }

};
