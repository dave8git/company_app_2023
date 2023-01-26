const express = require('express');
const EmployeeController = require('../controllers/employee.controller');
const router = express.Router();


router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandom);

router.get('/employees/:id', EmployeeController.getById);

router.post('/employees', EmployeeController.post);

router.patch('/employees/:id', EmployeeController.patch);

router.delete('/employees/:id', EmployeeController.delete);

module.exports = router;
