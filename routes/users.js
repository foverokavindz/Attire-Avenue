const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
//const auth = require('../middleware/auth');

// show users
router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

// show users by id // Show User profile
router.get('/me', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

// Register a User
router.post('/register', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email already exists');

  const { firstName, lastName, phone, address, city, email, role } = req.body;

  let { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await User.create({
    firstName,
    lastName,
    phone,
    address,
    city,
    email,
    password,
    role,
  });

  //   _.pick(req.body, [
  //     'firstName',
  //     'lastName',
  //     'phone',
  //     'address',
  //     'city',
  //     'email',
  //     'password',
  //   ])
  // );

  // user.password = await bcrypt.hash(user.password, salt);
  // await user.save();

  const token = user.genAuthenticationTkn();

  res
    .header('x-auth-token', token)
    .send(
      _.pick(user, [
        'firstName',
        'lastName',
        'phone',
        'address',
        'city',
        'email',
        'role',
      ])
    );
});

// Logging a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).send('Please Enter Email And Password');

  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).send('Invalid Email or Password');

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return res.status(400).send('Invalid Email or Password');

  const token = user.genAuthenticationTkn();

  // BUG NOTE  - Log weddi okkoma details send wenawa
  res.header('x-auth-token', token).send(user);
});

// Logout User // NOTE
router.get('/logout', (req, res) => {
  // res.cookie('token', null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  // });

  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});

// update User - By user acc
router.post('/update/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  const { firstName, lastName, email, phone, address } = req.body;

  if (user) {
    user.firstName = firstName || user.firstName.trim();
    user.lastName = lastName || user.lastName.trim();
    user.email = email || user.email.trim();
    user.phone = phone || user.phone.trim();
    user.address = address || user.address.trim();
    // user.role = role; - not allowed to change roll. Admin only

    const updatedUser = await user.save();

    res.send(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// delete user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
