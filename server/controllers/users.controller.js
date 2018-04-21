'use strict';

let passport = require('passport');
require('../config/passport-config')(passport);
var jwt = require('jsonwebtoken');

let mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.list_users = function(req, res) {
  User.find({}, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};

exports.get_user = function(req, res) {
  User.find({ username:req.params.username}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.create_a_user = function(req, res) {
  // var new_user = new  User(req.body);
  // new_user.save(function(err, user) {
  //   if (err)
  //     res.send(err);

  //   // TODO (we need to add the user in the auth0 website.)
  //   // TODO (we need to check if the user is not already present in both MongoDB and the Auth0 website. 
  //   res.json(user);
  // });

  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please enter username and password.'});
  } else {
    var newUser = new User(req.body);
    // save the user
    newUser.save(function(err) {
      if (err) {
        // TODO When key is duplicate: err.code == 11000 from MongoDB.
        let response = {success: false, msg: 'Username already exists.'};
        // 403 == Forbidden
        res.status(403).send(response);
        //return res.json({success: false, msg: 'Username already exists.'});
      }
      else {
        res.json({success: true, msg: 'Successful created new user.'});

      }
    });
  }
};



exports.delete_a_user = function(req, res) {
  User.findOneAndRemove({ username: req.params.username}, (err, user) => {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    if (err) 
      res.send(err);
    else {
      let response = {
          message: "User successfully deleted",
          username: user.username,
          id: user._id
      };
      res.status(200).send(response);
    }
  });
};

exports.update_a_user = function(req, res) {
  var query = {username:req.params.username};
  //req.body.username = req.user.username;
  User.findOneAndUpdate(query, req.body, {upsert:false}, (err, doc) => {
    if (err) 
      return res.send(500, { error: err });
    
      let response = {
        message: "User successfully saved",
        user : doc
    };
    res.status(200).send(response);
  });
}


