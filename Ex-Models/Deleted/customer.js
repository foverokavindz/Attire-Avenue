const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

// Create Schema
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    //trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    //trim: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    //trim: true,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1000,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    //trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    //trim: true,
    //lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
    //trim: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
});

customerSchema.methods.genAuthenticationTkn = function () {
  // Generate token  jwtSign+payload+Signature
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
};

// Create Customer  Model
const Customer = mongoose.model('Customer', customerSchema);

// Validate and set up schema for user input and rules for validation.
function validateCustomer(customer) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(2).max(20).required(),
    address: Joi.string().min(2).max(50).required(),
    city: Joi.string().min(2).max(1000).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(8).max(100).required(),
  });

  return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
