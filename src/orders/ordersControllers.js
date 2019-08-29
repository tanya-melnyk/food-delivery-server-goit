'use strict';

const { validationResult } = require('express-validator');

const Order = require('./ordersModel');
const Product = require('../products/productsModel');

// @route    POST /orders
// @desc     Create a order
exports.addOrder = async (req, res) => {
  // Check if added order meets all requirements
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const order = new Order(req.body);

  const orderedProductsExist = order.productsList.every(item =>
    Product.exists({ _id: item.product }),
  );

  if (!orderedProductsExist) {
    return res.status(400).json({ status: 'failed', order: null });
  }

  try {
    const savedOrder = await order.save();

    res.status(201).json({
      status: 'success',
      order: savedOrder,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
};

// @route    GET /orders
// @desc     Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ name: 1 });

    return res.status(200).json({
      status: 'success',
      orders: allOrders,
    });
  } catch (err) {
    console.error(err.message);

    return res.status(500).send('Server error');
  }
};

// @route    GET /orders/:id
// @desc     Get order by ID
exports.findOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    // Make sure order exists
    if (!order) {
      return res.status(404).json({ status: 'no orders', order });
    }

    res.status(200).json({ status: 'success', order });
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'Order not found' });
    }

    res.status(500).send('Server error');
  }
};

// @route    PATCH /orders/:id
// @desc     Update order by ID
exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const updatedData = { ...req.body };

  try {
    const order = await Order.findById(orderId);

    // Make sure order exists
    if (!order) {
      return res.status(404).json({ err: 'Order not found' });
    }

    await order.updateOne({ $set: updatedData });

    // Get already updated order
    const updatedOrder = await Order.findById(orderId);

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'Order not found' });
    }

    res.status(500).send('Server error');
  }
};

// @route    DELETE /orders/:id
// @desc     Delete order by ID
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(OrderId);

    // Make sure Order exists
    if (!Order) {
      return res.status(404).json({ err: 'Order not found' });
    }

    await order.deleteOne();

    res.send(`Order "${orderId}" was deleted`);
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'Order not found' });
    }

    res.status(500).send('Server error');
  }
};
