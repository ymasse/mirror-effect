// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Exercise = require('../server/models/exercise.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
// For testing purpose only.
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6RkZRVVUzTkVFNFJVVXdNRVkwUWtVME4wSXhPREV5TlRGQlEwVXhSRVUwTUVORk56ZENOZyJ9.eyJpc3MiOiJodHRwczovL21pcnJvci1lZmZlY3QuYXV0aDAuY29tLyIsInN1YiI6Ijg0WjRMcTVsRE1qTDZwRFFWVnhPVHJJU0VwMmtOQzU5QGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbWlycm9yLWVmZmVjdC5jb20iLCJpYXQiOjE1MTM5MTE1NjgsImV4cCI6MTUxMzk5Nzk2OCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.J7JrEcMCI5Z-EQjq4pKDVEL-U-krzMVgVuZbn09eDbbhvqPbo0vEUd9tOUQBHcLlxXqJTWkk2aToEltROrA20rDvUrt1hpFHPNA1tVMjQnxv6qv8D_VGquLYn1fLKsQhRAz1dP5gM9ICKNZlRYMVppsS_PmErpiPZMBtHy5d93FjhJN6E69hJDwoqCbabRTGyEuvDrn1aSu4szijL8RrvoMaXkmTDpgcjjMogrdqH5vax-D1uwjBWY4N01BlK4RZ1S94H6qZbasopZINzbd5r1ZU3_BUEVsI_KP54fqtvEQjFelA2q720RFwWCyZTinKJ2627oI8DsHl-7n8gpRb8A";

chai.use(chaiHttp);
//Our parent block
describe('Exercise', () => {
    beforeEach((done) => { //Before each test we empty the database
      Exercise.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET exercise', () => {
      it('it should GET all the exercises', (done) => {
          
        chai.request(server)
            .get('/api/exercises')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  
  /*
  * Test the /POST route
  */
  describe('/POST exercises', () => {
      it('it should not POST an exercises without the description', (done) => {
         let exercise = {
            short_name: "test1",
            language: "en",
        }
        chai.request(server)
            .post('/api/exercises')
            .set('Authorization', 'Bearer ' + token)
            .send(exercise)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('description');
                res.body.errors.description.should.have.property('kind').eql('required');
                done(); 
            });
      });

      it('it should POST an exercises ', (done) => {
        let exercise = {
            short_name: "test1",
            description: "This is a test exercise",
            language: "en",
        }
        chai.request(server)
            .post('/api/exercises')
            .set('Authorization', 'Bearer ' + token)
            .send(exercise)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Exercise successfully added!');
                res.body.should.have.property('exercise');
                res.body.exercise.should.have.property('created_by');
                res.body.exercise.should.have.property('short_name');
                res.body.exercise.should.have.property('short_name').eql("test1");
                res.body.exercise.should.have.property('description');
                res.body.exercise.should.have.property('description').eql("This is a test exercise");
                res.body.exercise.should.have.property('language');
                res.body.exercise.should.have.property('language').eql("en");
              done();
            });
      });
  });

   /*
  * Test the /GET/:id route
  */
  describe('/GET/:id exercises', () => {
    it('it should GET an exercise by the given id', (done) => {
      let exercise = new Exercise({
        short_name: "test1",
        description: "This is a test exercise",
        language: "en",
      });
      exercise.save((err, exercise) => {
          chai.request(server)
          .get('/api/exercises/' + exercise.id)
          .set('Authorization', 'Bearer ' + token)
          .send(exercise)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('created_by');
              res.body.should.have.property('short_name');
              res.body.should.have.property('short_name').eql("test1");
              res.body.should.have.property('description');
              res.body.should.have.property('description').eql("This is a test exercise");
              res.body.should.have.property('language');
              res.body.should.have.property('language').eql("en");
              res.body.should.have.property('_id').eql(exercise.id);
            done();
          });
      });

    });
});
});