const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth'); // ✅ import authenticate middleware

router.post('/register', authController.register);
router.post('/login', authController.login);

// ✅ protect this route
router.put('/profile', authenticate, authController.updateProfile);

module.exports = router;
