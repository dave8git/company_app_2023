// post.routes.js

const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();


router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }

  // req.db.collection('products').find().toArray((err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json(data);
  // });
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Product.findOne().skip(rand);
    if (!pro) res.status(404).json({ message: 'Not found'});
    else res.json(pro);
  } catch (err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('products').aggregate([ { $sample: {size: 1 }}]).toArray((err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json(data[0]);
  // });
  // ===
  //res.json(db.products[Math.floor(Math.random() * db.length)]);
});

router.get('/products/:id', async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
    if(!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
  // ===
  // req.db.collection('products').findOne({ _id: ObjectId(req.params.id)}), (err, data) => {
  //   if(err) res.status(500).json({ message: err });
  //   else if(!data) res.status(404).json({ message: 'Not found'});
  //   else res.json(data);
  // }
  //res.json(db.products.find(item => item.id == req.params.id));
});

router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name, client });
    await newProduct.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err })
  }
  // req.db.collection('products').insertOne({ name, client }, err => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json({ message: 'OK'});
  // })
  // ===
  // db.products.push({ id: 3, name, client })
  // res.json({ message: 'OK' });
});

router.patch('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  try { 
    await Product.updateOne({ _id: req.params.id }, { $set: { ...req.body }});
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('products').updateOne( { _id: ObjectId(req.params.id)}, { $set: {...req.body }}, err => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json({ message: 'OK' });
  // })
  // ===
  // db = db.products.map(item => (item.id == req.params.id) ? { ...item, name, client } : item );
  // res.json({ message: 'OK' });
});

router.delete('/products/:id', async (req, res) => {
  try {
    const pro = await Product.findById(req.params.id);
    if(pro) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...'})
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
  // req.db.collection('products').deleteOne({ _id: ObjectId(req.params.id)}, err => {
  //   if(err) res.status(500).json({ message: err });
  //   else res.json({ message: 'OK' });
  // })

  // === 
  // db = db.products.filter(item => item.id != req.params.id)
  // res.json({ message: 'OK' });
});

module.exports = router;
