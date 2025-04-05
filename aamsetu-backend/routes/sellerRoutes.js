const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth');

// Seller Profile
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Seller profile loaded', user: req.user });
});

// Request Details
router.get('/requests', authenticate, (req, res) => {
  res.json({ message: 'Seller request details' });
});

// Post Product
router.post('/product', authenticate, (req, res) => {
  res.json({ message: 'Product posted successfully' });
});

// Edit Product
router.put('/product/:id/edit', authenticate, (req, res) => {
  res.json({ message: `Product ${req.params.id} updated successfully` });
});

module.exports = router;