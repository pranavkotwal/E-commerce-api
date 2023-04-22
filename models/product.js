const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    default: 1
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  }
});

const Product = mongoose.model('Product', productSchema);

async function getNextId() {
  const lastProduct = await Product.findOne().sort({ id: -1 });
  return lastProduct ? lastProduct.id + 1 : 1;
}

async function createProduct(name, quantity) {
  const id = await getNextId();
  const product = new Product({ id, name, quantity });
  await product.save();
  return product;
}

module.exports = {
  Product,
  createProduct,
};
