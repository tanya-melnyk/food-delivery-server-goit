'use strict';

const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const productsCtrls = require('./productsControllers');

// @route /products

// POST request for creating Product
router.post(
  '/',
  [
    check('name', 'Product name is required')
      .not()
      .isEmpty(),
    check('price', 'Please include a price')
      .not()
      .isEmpty(),
  ],
  productsCtrls.addProduct,
);

// GET request for all Products
router.get('/', productsCtrls.getAllProducts);

// GET request for Product by ID.
router.get('/:id', productsCtrls.findProductById);

// PATCH request for updating Product
router.patch('/:id', productsCtrls.updateProduct);

// DELETE request for deleting Product
router.delete('/:id', productsCtrls.deleteProduct);

module.exports = router;
