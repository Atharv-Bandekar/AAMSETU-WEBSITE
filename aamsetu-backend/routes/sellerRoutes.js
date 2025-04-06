const express = require('express');
const router = express.Router();
const sellerProductController = require('../controllers/sellerProductController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

// Create product
router.post('/product', authenticate, authorizeRoles('seller'), sellerProductController.createProduct);

// Get all products for the seller
router.get('/products', authenticate, authorizeRoles('seller'), sellerProductController.getMyProducts);

// Update product
router.put('/product/:id', authenticate, authorizeRoles('seller'), sellerProductController.updateProduct);

// Delete product
router.delete('/product/:id', authenticate, authorizeRoles('seller'), sellerProductController.deleteProduct);

module.exports = router;
