const mongoose = require('../config/mongoose')
const {Product,createProduct} = require('../models/product')


// Define a route to create a new product
module.exports.create = async (req, res) => {
  const { name, quantity } = req.body;

 
  

  try {
    // Save the product to the database
     const product = await createProduct(name, quantity);


    res.json({ data: { product } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save product to database' });
  }
}


// Get a list of all products
module.exports.products = async (req, res) => {
  try {
    const products = await Product.find({});
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      _id: product._id,

    }));
    res.json({ data: { products: formattedProducts } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve products from database' });
  }
}

// Delete product by id
module.exports.delete =  async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ data: { message: 'Product deleted' } });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product from database' });
  }
}


// Update the quantity of a product (can be incremented or decremented)
module.exports.updateQuantity =  async (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.query.number);

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let updatedQuantity = product.quantity + quantity;
    if (updatedQuantity < 0) {
      updatedQuantity = 0;
    }

    const updatedProduct = await Product.updateOne(
      { _id: productId },
      { quantity: updatedQuantity }
    );

    res.json({
      data: {
        product: {
          id: product._id,
          name: product.name,
          quantity: updatedQuantity,
        },
        message: 'Quantity updated successfully',
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product quantity in database' });
  }
}
