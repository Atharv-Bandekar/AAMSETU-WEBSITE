const express = require('express');
const router = express.Router();
const { getBuyerProfile } = require('../controllers/buyerController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const { getBuyerRequests, createRequest } = require('../controllers/buyerRequestController');

// 👇 Only authenticated users with role "buyer" can access this
router.get('/profile', authenticate, authorizeRoles('buyer'), getBuyerProfile);
router.get('/requests', authenticate, authorizeRoles('buyer'), getBuyerRequests);
router.post('/requests', authenticate, authorizeRoles('buyer'), createRequest);

module.exports = router;
