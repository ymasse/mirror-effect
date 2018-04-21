'use strict';


let mongoose = require('mongoose'),
    Patient = mongoose.model('Patient');

exports.list_patients = function(req, res) {
  Patient.find({}, function(err, patient) {
    if (err)
      res.send(err);
    res.json(patient);
  });
};

exports.get_patient = function(req, res) {
  Patient.find({ username:req.params.username}, function(err, patient) {
    if (err)
      res.send(err);
    res.json(patient);
  });
};


exports.create_a_patient = function(req, res) {
  var new_patient = new Patient(req.body);
  new_patient.save(function(err, patient) {
    if (err)
      res.send(err);
    res.json(patient);
  });
};

exports.delete_a_patient = function(req, res) {
  Patient.findOneAndRemove({ username: req.params.username}, (err, patient) => {  
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    if (err) 
      res.send(err);
    else {
      let response = {
          message: "Todo successfully deleted",
          username: patient.username,
          id: patient._id
      };
      res.status(200).send(response);
    }
  });


};


