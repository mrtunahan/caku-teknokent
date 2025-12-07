const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { protect } = require('../middleware/authMiddleware');

// Public: Herkes okuyabilir (Frontend'de göstermek için)
router.get('/:slug', pageController.getPage); 

// Protected: Sadece Admin güncelleyebilir
router.put('/:slug', protect, pageController.updatePage); 

module.exports = router;