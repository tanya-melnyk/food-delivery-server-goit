'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    telephone: Number,
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    favoriteProducts: Array,
    viewedProducts: Array,
    orders: Array,
  },
  // {
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   created: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   modified: {
  //     type: Date,
  //     default: Date.now,
  //   },
  // },
  // { collection: 'users' },
);

module.exports = mongoose.model('User', userSchema);

// you can put collection name under the scheme
// or as the third arg in model declaration
