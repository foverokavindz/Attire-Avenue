const { Category, validate } = require('../models/category');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// root route eken okkoma display krnwa
router.get('/', async (req, res) => {
  const categories = await Category.find().sort('name');
  res.send(categories);
});

// add new category
router.post('/addnew', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = await new Category({
    name: req.body.name,
    description: req.body.description,
    //product: req.body.products,
  });

  category = await category.save();

  res.send(category);
});

// filter by category
router.get('/:categoryName', async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryName,
    }).populate('category');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
