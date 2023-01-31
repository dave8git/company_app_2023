const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    before(async () => {
      try {
        await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
      } catch (err) {
        console.error(err);
      }
    });
  
    describe('Reading data', () => {
      before(async () => {
        const testEmpOne = new Employee({ firstName: 'Dave', lastName: 'Pol', department: 'Development' });
        await testEmpOne.save();
  
        const testEmpTwo = new Employee({ firstName: 'Gabe', lastName: 'Neuwen', department: 'Development' });
        await testEmpTwo.save();
      });
  
      after(async () => {
        await Employee.deleteMany();
      });
  
      it('should return all the data with "find" method', async () => {
          const employees = await Employee.find();
          const expectedLength = 2;
          expect(employees.length).to.be.equal(expectedLength);
      });
  
      it('should return a proper document by "name" with "findOne" method', async () => {
          const employee = await Employee.findOne({ firstName: 'Gabe', lastName: 'Neuwen', department: 'Development' });
          const expectedName = 'Gabe';
          expect(employee.firstName).to.be.equal(expectedName);
      });
    });
    describe('Creating data', () => {
      it('should insert new document with "insertOne" method', async () => {
          const employee = new Employee({ firstName: 'Gabe', lastName: 'Neuwen', department: 'Development' });
          await employee.save();
          const savedEmployee = await Employee.findOne({ firstName: 'Gabe', lastName: 'Neuwen', department: 'Development' });
          expect(savedEmployee).to.not.be.null;
      });
      after(async () => {
          await Employee.deleteMany();
      });
    
    });
    describe('Updating data', () => {
      
      beforeEach(async () => {
          const testEmpOne = new Employee({ firstName: 'Dave', lastName: 'Pol', department: 'Development' });
          await testEmpOne.save();
    
          const testEmpTwo = new Employee({ firstName: 'Gabe', lastName: 'Neuwen', department: 'Development' });
          await testEmpTwo.save();
        });
  
        
      afterEach(async () => {
        await Employee.deleteMany();
      });
  
      it('should properly update one document with "updateOne" method', async () => {
          await Employee.updateOne({ firstName: 'Dave' }, { $set: { firstName: 'Marcin' }});
          const updatedEmployee = await Employee.findOne({ firstName: 'Marcin' });
          expect(updatedEmployee).to.not.be.null;
      });
    
      it('should properly update one document with "save" method', async () => {
          const employee = await Employee.findOne({ firstName: 'Dave', lastName: 'Pol', department: 'Development' });
          employee.firstName = '..Dave';
          employee.lastName = '..Pol';
          employee.department = '..Development';
          await employee.save();
        
          const updatedEmployee = await Employee.findOne({ firstName: '..Dave', lastName: '..Pol', department: '..Development' });
          expect(updatedEmployee).to.not.be.null;
      });
    
      it('should properly update multiple documents with "updateMany" method', async () => {
              await Employee.updateMany({}, { 
                $set: {
                  firstName: 'update firstName',
                  lastName: 'update lastName',
                  department: 'update department',
                },
              });
              const employees = await Employee.find();
              expect(employees[0].firstName).to.be.equal('update firstName');
              expect(employees[1].firstName).to.be.equal('update firstName');
            
      });
    });


    describe('Removing data', () => {
      beforeEach(async () => {
          const testEmpOne = new Employee({ firstName: 'Dave', lastName: 'Pol', department: 'Development' });
          await testEmpOne.save();
        
          const testEmpTwo = new Employee({ firstName: 'Gabe', lastName: 'Neuwen', department: 'Development' });
          await testEmpTwo.save();
        });
  
      it('should properly remove one document with "deleteOne" method', async () => {
          await Employee.deleteOne({ firstName: 'Dave' });
          const removeEmployee = await Employee.findOne({ name: 'Dave' });
          expect(removeEmployee).to.be.null;
      });
    
      it('should properly remove one document with "remove" method', async () => {
          const employee = await Employee.findOne({ firstName: 'Dave' });
          await employee.remove();
          const removedEmployee = await Employee.findOne({ firstName: 'Dave' });
          expect(removedEmployee).to.be.null;
      });
    
      it('should properly remove multiple documents with "deleteMany" method', async () => {
          await Employee.deleteMany();
          const employees = await Employee.find();
          expect(employees.length).to.be.equal(0);
      });
  
      afterEach(async () => {
          await Employee.deleteMany();
        });
    
    });
  });