'use strict';


const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');

exports.list_exercises = function(req, res) {
  Exercise.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.get_exercise = function(req, res) {
  Exercise.findById({ _id:req.params.id}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_an_exercise = function(req, res) {
  var new_exercise = new Exercise(req.body);
  new_exercise.save(function(err, exercise) {
    if (err) {
      res.send(err);
      res.status(200).send(err);
    } else {
      let response = exercise;
      res.status(200).send(exercise);
    }
  });
};

exports.delete_an_exercise = function(req, res) {
  Exercise.findByIdAndRemove({ _id: req.params.id}, (err, exercise) => {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    if (err) {
      res.status(403).send(err);
    }
    else {
      let response = {
          message: "Exercise successfully deleted",
          _id: exercise._id
      };
      res.status(200).send(response);
    }
  });
};

exports.update_exercise = function(req, res) {
  var query = {_id:req.params.id};
  //req.body.username = req.user.username;
  Exercise.findOneAndUpdate(query, req.body, {upsert:false}, (err, doc) => {
    if (err) 
      return res.send(500, { error: err });
    
      let response = {
        message: "User successfully saved",
        exercise : doc._doc
    };
    res.status(200).send(response);
  });
}



