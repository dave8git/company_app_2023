const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/employees', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees').aggregate([ { $sample: {size: 1} }]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
  //res.json(db.employees[Math.floor(Math.random() * db.length)]);
});

router.get('/employees/:id', (req, res) => {
  req.db.collection('employees').findOne({ _id: ObjectId(req.params.id)}), (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not found'});
    else res.json(data);
  }
  //res.json(db.employees.find(item => item.id == req.params.id));
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees').insertOne({ firstName, lastName }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK'});
  })
  // db.employees.push({ id: 3, firstName, lastName })
  // res.json({ message: 'OK' });
});

router.patch('/employees/:id', (req, res) => { // put zakłada, że dostajemy wszystkie dane, patch - sam sprawdza których brakowało
  //const { firstName, lastName } = req.body;
  req.db.collection('employees').updateOne({ _id: ObjectId(req.params.id)}, { $set: { ...req.body }}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
  
  // db = db.employees.map(item => (item.id == req.params.id) ? { ...item, firstName, lastName } : item );
  // res.json({ message: 'OK' });
});

router.delete('/employees/:id', (req, res) => {
  req.db.collection('employees').deleteOne({ _id: ObjectId(req.params.id)}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
  // db = db.employees.filter(item => item.id != req.params.id)
  // res.json({ message: 'OK' });
});

module.exports = router;