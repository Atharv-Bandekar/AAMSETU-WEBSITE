// routes/requestRoutes.js

const express = require('express');
const router = express.Router();

// Controller functions
const buyerRequestController = require('../controllers/buyerRequestController');


// Middleware
const { authenticate, authorizeRoles } = require('../middlewares/auth');

// Create a new request (only for buyers)
router.post('/', authenticate, authorizeRoles('buyer'), buyerRequestController.createRequest);

// Get all requests of the logged-in buyer
router.get('/my', authenticate, authorizeRoles('buyer'), buyerRequestController.getMyRequests);

//update request
router.put('/:id', authenticate, authorizeRoles('buyer'), buyerRequestController.updateRequest);

//delete request
router.delete('/:id', authenticate, authorizeRoles('buyer'), buyerRequestController.deleteRequest);


module.exports = router;
