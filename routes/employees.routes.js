const express = require('express');
const Employee = require('../models/employee.model');
const router = express.Router();


router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find());
  }
  catch(err) {  
    res.status(500).json({ message: err });
  }
  // req.db.collection('employees').find().toArray((err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json(data);
  // });
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand);
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('employees').aggregate([ { $sample: {size: 1} }]).toArray((err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json(data[0]);
  // });
  // ===
  //res.json(db.employees[Math.floor(Math.random() * db.length)]);
});

router.get('/employees/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('employees').findOne({ _id: ObjectId(req.params.id)}), (err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else if(!data) res.status(404).json({ message: 'Not found'});
  //   else res.json(data);
  // }
  // ===
  //res.json(db.employees.find(item => item.id == req.params.id));
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName } = req.body; 
    const newEmployee = new Employee({ firstName, lastName });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
  // const { firstName, lastName } = req.body;
  // req.db.collection('employees').insertOne({ firstName, lastName }, err => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json({ message: 'OK'});
  // })
  // === 
  // db.employees.push({ id: 3, firstName, lastName })
  // res.json({ message: 'OK' });
});

router.patch('/employees/:id', async (req, res) => { // put zakłada, że dostajemy wszystkie dane, patch - sam sprawdza których brakowało
  const { firstName, lastName } = req.body;
  try {
   await Employee.updateOne({ _id: req.params.id }, { $set: { ...req.body }});
   res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
  
  //const { firstName, lastName } = req.body;
  // req.db.collection('employees').updateOne({ _id: ObjectId(req.params.id)}, { $set: { ...req.body }}, err => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json({ message: 'OK' });
  // })
  // === 
  // db = db.employees.map(item => (item.id == req.params.id) ? { ...item, firstName, lastName } : item );
  // res.json({ message: 'OK' });
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('employees').deleteOne({ _id: ObjectId(req.params.id)}, err => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json({ message: 'OK' });
  // })
  // === 
  // db = db.employees.filter(item => item.id != req.params.id)
  // res.json({ message: 'OK' });
});

module.exports = router;
