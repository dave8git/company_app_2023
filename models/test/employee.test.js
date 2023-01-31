const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    after(() => {
        mongoose.models = {};
    });
    it('should throw error if there is no arg', () => {
        const employee = new Employee({});
        employee.validate(err => {
            expect(err.errors).to.exist;
        });
    });
    it('should throw an error if "firstName" is not a string', () => {
        const cases = [{}, []];
        for (let firstName of cases) {
            const employee = new Employee({
                firstName,
                lastName: 'Joe', 
                department: 'IT',
            });
            employee.validate((err) => {
                expect(err.errors).to.exist;
            });
        }
    });
    it('should not throw error if the arguments args are correct', () => {
        const employee = new Employee({ firstName: 'Dave', lastName: 'Pol', department: 'Marketing'});
        employee.validate(err => {
            expect(err).to.not.exist;
        });
    });

});