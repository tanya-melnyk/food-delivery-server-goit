'use strict';

const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  productsList: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      size: String,
      itemsCount: Number,
    },
  ],
  deliveryType: String,
  deliveryAdress: String,
  sumToPay: Number,
  status: String,
});

module.exports = model('Order', orderSchema);
