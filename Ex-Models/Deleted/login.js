// const { User } = require('../models/user');
// const { Customer } = require('../models/customer');
// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();
// const _ = require('lodash');
// const bcrypt = require('bcrypt');
// const Joi = require('joi');

// router.post('/', async (req, res) => {
//   const { error } = validateReq(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ email: req.body.email });
//   let customer = await User.findOne({ email: req.body.email });

//   // user nathm me msg eka ywnwa //// 404 dnne na
//   if (!user && !customer)
//     return res.status(400).send('Invalid Email or password');

//   // if user return some data or customer returned data
//   const entity = user ? user : customer;
//   const validPassword = await bcrypt.compare(
//     req.body.password,
//     entity.password
//   );
//   if (!validPassword) return res.status(400).send('Invalid email or password');

//   const token = entity.genAuthenticationTkn();
//   res.send({ token: token });
// });

// function validateReq(req) {
//   const schema = Joi.object({
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(8).max(100).required(),
//   });

//   return schema.validate(req);
// }

// module.exports = router;
