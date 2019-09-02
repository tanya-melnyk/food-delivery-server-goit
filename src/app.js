'use strict';

const corsMiddleware = require('cors');
const express = require('express');
const morgan = require('morgan');

const router = require('./router');

const app = express();

// Init Middleware
app.use(corsMiddleware());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

// Log all request in the Apache combined format to STDOUT
app.use(morgan('combined'));

// Use Routes
app.use(router);

// Error Handling
app.use((req, res, next) => {
  res.status(404).json({ err: '404' });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ err: '500' });
});

module.exports = app;
