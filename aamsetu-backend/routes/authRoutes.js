const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // ⬅️ import the whole module

console.log('🔍 register:', authController.register); // just to check

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
