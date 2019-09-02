'use strict';

const { validationResult } = require('express-validator');

const Product = require('./productsModel');

// @route    POST /products
// @desc     Create a product
exports.addProduct = async (req, res) => {
  // Check if added product meets all requirements
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = new Product(req.body);

  try {
    const savedProduct = await product.save();

    res.status(201).json({
      status: 'success',
      product: savedProduct,
    });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
};

// @route    GET /products or /products/?ids='<id>,<id>,<id>'
// @desc     Get all products or products by IDs
exports.getAllProducts = async (req, res) => {
  // if no query return all products
  if (!req.query.ids) {
    try {
      const allProducts = await Product.find().sort({ name: 1 });

      return res.status(200).json({
        status: 'success',
        products: allProducts,
      });
    } catch (err) {
      console.error(err.message);

      return res.status(500).send('Server error');
    }
  }

  // return products by IDs
  const ids = req.query.ids.split(',');
  const productsByIds = [];

  ids.forEach(async id => {
    try {
      const productById = await Product.findById(id);

      productsByIds.push(productById);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server error');
    }
  });

  // Make sure at least one product was found
  if (!productsByIds.length) {
    return res.status(404).json({ status: 'no products', products: [] });
  }

  res.status(200).json({
    status: 'success',
    products: productsByIds,
  });
};

// @route    GET /products/:id
// @desc     Get product by ID
exports.findProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    // Make sure product exists
    if (!product) {
      return res.status(404).json({ status: 'no products', product });
    }

    res.status(200).json({ status: 'success', product });
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'Product not found' });
    }

    res.status(500).send('Server error');
  }
};

// @route    PATCH /products/:id
// @desc     Update product by ID
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedData = { ...req.body };

  try {
    const product = await Product.findById(productId);

    // Make sure product exists
    if (!product) {
      return res.status(404).json({ err: 'Product not found' });
    }

    await product.updateOne({ $set: updatedData });

    // Get already updated product
    const updatedProduct = await Product.findById(productId);

    res.status(200).json({ status: 'success', product: updatedProduct });
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'Product not found' });
    }

    res.status(500).send('Server error');
  }
};

// @route    DELETE /products/:id
// @desc     Delete product by ID
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    // Make sure product exists
    if (!product) {
      return res.status(404).json({ err: 'Product not found' });
    }

    await product.deleteOne();

    res.send(`Product "${product.name}" was deleted`);
  } catch (err) {
    console.error(err.message);

    // check if error was caused by wrong ID
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ err: 'Product not found' });
    }

    res.status(500).send('Server error');
  }
};
