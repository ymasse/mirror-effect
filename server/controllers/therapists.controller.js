'use strict';


let mongoose = require('mongoose'),
    Therapist = mongoose.model('Therapist');

exports.list_therapists = function(req, res) {
  Therapist.find({}, function(err, therapists) {
    if (err)
      res.send(err);
    res.json(therapists);
  });
};

exports.get_therapist = function(req, res) {
  Therapist.find({ username:req.params.username}, function(err, therapist) {
    if (err)
      res.send(err);
    res.json(therapist);
  });
};


exports.create_a_therapist = function(req, res) {
  var new_therapist = new Therapist(req.body);
  new_therapist.save(function(err, therapist) {
    if (err)
      res.send(err);
    res.json(therapist);
  });
};

exports.delete_a_therapist = function(req, res) {
  Therapist.findOneAndRemove({ username: req.params.username}, (err, therapist) => {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    if (err) 
      res.send(err);
    else {
      let response = {
          message: "Therapist successfully deleted",
          username: therapist.username,
          id: therapist._id
      };
      res.status(200).send(response);
    }
  });


};


