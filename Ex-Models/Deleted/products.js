const { Product, validate } = require('../models/product');
const { Category } = require('../models/category');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// root route eken okkoma display krnwa
router.get('/', async (req, res) => {
  const categories = await Category.find().sort('name');
  res.send(categories);
});

// add new product
router.post('/', async (req, res) => {
  // validate the data from front end and throw an error if invalid data is provided or data is missing.
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   methana product id wlt loop ekak dnna one ?
  //   validate product id
  //   const products = await Product.findById(req.body.productId);
  //   if (!products) return res.status(400).send('products not found');

  let product = new Product({
    name: req.body.name,
    description: req.body.description, // name of the category to be added.
    price: req.body.price,
    category: req.body.category, // name of the category to be added.
    stock: req.body.stok,

    // add product ekt review dnne na
    // review : req.body.
  });

  product = await category.save();

  res.send(product);
});

// show by category -- handle by categories.js

//  search product - name
router.get('/search/:productName', async (req, res) => {
  const name = req.params.productName;
  const regex = new RegExp(name, 'i'); // 'i' for case-insensitive search

  try {
    const products = await Product.find({ name: regex });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// see reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'reviews.customer'
    );
    if (!product) return res.status(404).send('Product not found');

    const reviews = product.reviews;
    res.send(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// select a item by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
