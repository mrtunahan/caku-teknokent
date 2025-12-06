const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
// Eski import şekline dönüş:
const upload = require('../middleware/imageUpload');
const { protect } = require('../middleware/authMiddleware');

// Public
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

// Protected (resizeImage kaldırıldı)
router.post('/', protect, upload.single('image'), newsController.createNews);
router.delete('/:id', protect, newsController.deleteNews);
router.put('/:id', protect, upload.single('image'), newsController.updateNews);

module.exports = router;