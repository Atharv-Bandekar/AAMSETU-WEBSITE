const express = require('express');
const router = express.Router();
const productController = require('../controllers/sellerProductController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

router.post(
  '/',
  authenticate,
  authorizeRoles('seller'),
  productController.createProduct
);

router.get(
  '/my-products',
  authenticate,
  authorizeRoles('seller'),
  productController.getMyProducts
);

router.put(
  '/update/:id',
  authenticate,
  authorizeRoles('seller'),
  productController.updateProduct
);

router.delete(
  '/delete/:id',
  authenticate,
  authorizeRoles('seller'),
  productController.deleteProduct
);

module.exports = router;
