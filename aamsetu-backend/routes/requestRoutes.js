// routes/requestRoutes.js

const express = require('express');
const router = express.Router();
const buyerRequestController = require('../controllers/buyerRequestController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');
// Create a new request
router.post('/', authenticate, authorizeRoles('buyer'),buyerRequestController.createRequest);

// You can add more routes like GET, PUT, DELETE if needed later
// Get all requests for the logged-in buyer
//router.get('/', buyerRequestController.getBuyerRequests);

module.exports = router;
