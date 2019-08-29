'use strict';

const express = require('express');

const productsRouter = require('./products/productsRoutes');
const ordersRouter = require('./orders/ordersRoutes');
const usersRouter = require('./users/usersRoutes');

const app = express();

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);

module.exports = app;
