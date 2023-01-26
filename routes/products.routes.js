// post.routes.js

const express = require('express');
const ProductController = require('../controllers/products.controller');
const router = express.Router();


router.get('/products', ProductController.getAll);

router.get('/products/random', ProductController.getRandom);

router.get('/products/:id', ProductController.getById);

router.post('/products', ProductController.post);

router.patch('/products/:id', ProductController.patch);

router.delete('/products/:id', ProductController.delete);

module.exports = router;
