const router = require('express').Router()
const mongoose = require('../config/mongoose')
const Product = require('../models/product')

const productController = require('../controllers/productController')

// Create a new product
router.post('/products/create', productController.create );

// Get a list of all products
router.get('/products', productController.products);

// Delete a product by ID
router.delete('/products/:id',productController.delete);

// Update the quantity of a product (can be incremented or decremented)
router.post('/products/:id/update_quantity',productController.updateQuantity);



module.exports = router;