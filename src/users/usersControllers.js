'use strict';

const { validationResult } = require('express-validator');

const User = require('./usersModel');

// @route    POST /users
// @desc     Create a user
exports.addUser = async (req, res) => {
  // Check if added user meets all requirements
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User(req.body);

    const savedUser = await user.save();

    res.status(201).json({
      status: 'success',
      user: savedUser,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
};

// @route    GET /users
// @desc     Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ username: 1 });

    return res.status(200).json({ status: 'success', users });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server error');
  }
};

// @route    GET /users/:id
// @desc     Get user by ID
exports.findUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    // Make sure user exists
    if (!user) {
      return res.status(404).json({ status: 'not found' });
    }

    res.status(200).json({ status: 'success', user });
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'User not found' });
    }

    res.status(500).send('Server error');
  }
};

// @route    PATCH /users/:id
// @desc     Update user by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    // Make sure user exists
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }

    const {
      username,
      telephone,
      password,
      email,
      favoriteProducts,
      viewedProducts,
      orders,
    } = req.body;

    if (favoriteProducts && !user.favoriteProducts.includes(favoriteProducts)) {
      user.favoriteProducts.push(favoriteProducts);
    }

    if (viewedProducts && !user.viewedProducts.includes(viewedProducts)) {
      user.viewedProducts.push(viewedProducts);
    }

    if (orders && !user.orders.includes(orders)) {
      user.orders.push(orders);
    }

    if (username) {
      user.username = username;
    }

    if (telephone) {
      user.telephone = telephone;
    }

    if (password) {
      user.password = password;
    }

    if (email) {
      user.email = email;
    }

    await user.save();

    // Get already updated user
    const updatedUser = await User.findById(userId);

    res.status(200).json({ status: 'success', user: updatedUser });
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'User not found' });
    }

    res.status(500).send('Server error');
  }
};

// @route    DELETE /users/:id
// @desc     Delete user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    // Make sure user exists
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }

    await user.deleteOne();

    res.send(`User "${user.username}" was deleted`);
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'User not found' });
    }

    res.status(500).send('Server error');
  }
};
