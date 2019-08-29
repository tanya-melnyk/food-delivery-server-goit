'use strict';

const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const ordersCtrls = require('./ordersControllers');

// @route /orders

// POST request for creating Order
router.post(
  '/',
  [
    check('deliveryAdress', 'Delivery Adress is required')
      .not()
      .isEmpty(),
  ],
  ordersCtrls.addOrder,
);

// GET request for all Orders
router.get('/', ordersCtrls.getAllOrders);

// GET request for Order by ID.
router.get('/:id', ordersCtrls.findOrderById);

// PATCH request for updating Order
router.patch('/:id', ordersCtrls.updateOrder);

// DELETE request for deleting Order
router.delete('/:id', ordersCtrls.deleteOrder);

module.exports = router;
