const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const MongoConnection = require('../../database/mongoclient').connection;

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


// Get Patients
router.get('/', (req, res) => {
    MongoConnection((db) => {   
        console.log("Get therapists");
        db.db('mirror-effect').collection('therapists')
            .find()
            .toArray()
            .then((therapists) => {
                response.data = therapists;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;