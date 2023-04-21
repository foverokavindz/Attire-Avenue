// const { Customer, validate } = require('../models/customer');
// const _ = require('lodash');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const config = require('config');
// const express = require('express');
// const router = express.Router();

// // root route eken okkoma display krnwa
// router.get('/', async (req, res) => {
//   const customers = await Customer.find().select('-password').sort('name');
//   res.send(customers);
// });

// // add new customer
// router.post('/', async (req, res) => {
//   // validate the data from front end and throw an error if invalid data is provided or data is missing.
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let customer = await Customer.findOne({ email: req.body.email });
//   if (customer) return res.status(400).send('Email already exists');

//   customer = new Customer(
//     _.pick(req.body, [
//       'firstName',
//       'lastName',
//       'phone',
//       'address',
//       'city',
//       'email',
//       'password',
//     ])
//   );
//   const salt = await bcrypt.genSalt(10);
//   customer.password = await bcrypt.hash(customer.password, salt);
//   await customer.save();

//   const token = customer.genAuthenticationTkn();

//   res
//     .header('x-auth-token', token)
//     .send(
//       _.pick(customer, [
//         '_id',
//         'firstName',
//         'lastName',
//         'phone',
//         'address',
//         'city',
//         'email',
//       ])
//     );
// });

// module.exports = router;
