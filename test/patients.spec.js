var expect = require('chai').expect;
 
const Patient = require('../server/models/patient.model');
 
describe('patient', function() {
    it('should be invalid if username is empty', function(done) {
        var m = new Patient();
 
        m.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });
});