'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  // sku: Number,
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    get: n => Math.round(n),
    set: n => Math.round(n),
    required: true,
  },
  currency: String,
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    lowercase: true,
  },
  likes: Number,
});

module.exports = mongoose.model('Product', productSchema);
