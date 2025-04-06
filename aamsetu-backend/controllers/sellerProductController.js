const {Product} = require('../models');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, availability } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      availability,
      sellerId: req.user.id,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("Create Product Error:", err);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};

// Get all products of the seller
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { sellerId: req.user.id } });
    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch Seller Products Error:", err);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.sellerId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await product.update(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.sellerId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};

// 👇 Export them together
module.exports = {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct
};
