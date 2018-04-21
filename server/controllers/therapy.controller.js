'use strict';

const mongoose = require('mongoose');
const Therapy = mongoose.model('Therapy');

exports.list_therapies = function(req, res) {
  Therapy.find({}).populate('therapist')
  .populate('patient')
  .populate('exercises')
  .exec(function(err, therapies) {
    if (err)
      res.send(err);
    res.json(therapies);
  });
};

exports.get_therapy = function(req, res) {
  Therapy.findById({ _id:req.params.id})
    .populate('therapist')
    .populate('patient')
    .populate('exercises')
    .exec( function(err, therapy) {
        if (err)
          res.send(err);
        res.json(therapy);
  });

};

// TODO (yanmas1): Validation: Therapist is a therapist, Patient is a patient.  Date alignment.
exports.create_a_therapy = function(req, res) {
  var therapy = new Therapy(req.body);
  therapy.save(function(err, therapy) {
    if (err) {
      res.send(err);
      res.status(200).send(err);
    } else {
      let response = therapy;
      res.status(200).send(therapy);
    }
  });
};

exports.delete_a_therapy = function(req, res) {
  Therapy.findByIdAndRemove({ _id: req.params.id}, (err, therapy) => {  
    if (err) {
      res.status(403).send(err);
    }
    else {
      let response = {
          message: "Therapy successfully deleted",
          _id: therapy._id
      };
      res.status(200).send(response);
    }
  });
};

exports.update_therapy = function(req, res) {
  var query = {_id:req.params.id};
  //req.body.username = req.user.username;
  Therapy.findOneAndUpdate(query, req.body, {upsert:false}, (err, doc) => {
    if (err) 
      return res.send(500, { error: err });
    
      let response = {
        message: "Therapy successfully saved",
        therapy : doc._doc
    };
    res.status(200).send(response);
  });
}



