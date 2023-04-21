const { Product, validate } = require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// display all products
router.get('/', async (req, res) => {
  const products = await Product.find().sort('name');
  res.send(products);
});

// get product by id
router.get('/get/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// delete product
router.delete('/delete/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// create product
router.post('/addnew', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, description, price, category } = req.body;

  const stock = Number(req.body.stock);

  const product = await new Product({
    name: name,
    description: description,
    price: price,
    stock: stock,
  });

  // Add categories to the product object
  product.category.push(...category);

  // Save the product to the database
  await product.save();

  // Update categories that the product belongs to
  for (const categoryId of category) {
    const cat = await Category.findById(categoryId);
    cat.product.push(product._id);
    await cat.save();
  }

  // Return the product as response
  res.send(product);
});

// add review
router.post('/addreview/:id', async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  console.log(product);

  if (product) {
    const alreadyReviewed = product.review.find(
      (r) => r.user.toString() === req.body._id.toString()
    );

    if (alreadyReviewed)
      return res.status(400).send('Product already reviewed');

    const review = {
      name: req.body.name,
      rating: Number(rating),
      comment,
      user: req.body._id,
    };

    product.review.push(review);

    product.numReviews = product.review.length;

    await product.save();

    res.send(review);
  } else {
    res.send('Product not found');
  }
});

// update product
router.post('/update/:id', async (req, res) => {
  const { name, price, description, stock, category } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    //product.image = image;
    product.stock = stock;

    product.category.push(...category);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Update Category // TODO

// get product by name // TODO

// get all products by category name //TODO
module.exports = router;
