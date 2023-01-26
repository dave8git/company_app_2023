const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('departments').find().toArray((err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json(data);
  // });
});

router.get('/departments/random', async (req, res) => {
  try {
    const count = await Department.countDocuments(); 
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('departments').aggregate([ { $sample: { size: 1 } } ]).toArray((err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json(data[0]);
  // });
});

router.get('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id); 
    if(!dep) res.status(404).json({ message: 'Not found'});
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('departments').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else if(!data) res.status(404).json({ message: 'Not found' });
  //   else res.json(data);
  // });
});

router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body; // wyciąga parametr 'name' z 'req.body' i przypisze go do stałej,
    const newDepartment = new Department({ name: name }); // utworzy nowy dokument na bazie modelu 'Department', 
    await newDepartment.save(); // a gdzie metoda inserOne()???  //save = zapisz dokument do kolekcji
    res.json({ message: 'OK' }); // oczekuje na wykonanie metody 'await' i jeśli wszystko jest ok to zwraca komunikat ok
  } catch(err) {
    res.status(500).json({ message: err});
  }
});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const dep = await Department.findById(req.params.id);
    if (dep) {
      await Department.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
      res.json({
        message: 'OK',
        modifiedDepartment: await Department.findById(req.params.id),
      });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/departments/:id', async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK', deleted: dep});
    }
    else res.status(404).json({ message: 'Not found...'});
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('departments').deleteOne({ _id: ObjectId(req.params.id) }, err => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json({ message: 'OK' });
  // });
});

module.exports = router;
