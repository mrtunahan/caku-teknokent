const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/change-password', protect, authController.changePassword);

// YENİ ROTALAR
router.post('/forgot-password', authController.forgotPassword); // Şifremi unuttum isteği
router.put('/reset-password/:resetToken', authController.resetPassword); // Yeni şifre belirleme

module.exports = router;