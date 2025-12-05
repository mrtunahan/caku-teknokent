// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register); // İlk kullanıcıyı oluşturduktan sonra bu satırı silebilirsiniz.
router.post('/change-password', protect, authController.changePassword);
module.exports = router;