const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const upload = require('../middleware/imageUpload');
const { protect } = require('../middleware/authMiddleware');

// Public (Herkes görebilir - Frontend için)
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

// Protected (Sadece Admin ekler/siler)
router.post('/', protect, upload.single('image'), newsController.createNews);
router.delete('/:id', protect, newsController.deleteNews);
router.put('/:id', protect, upload.single('image'), newsController.updateNews); // YENİ
router.get('/:id', newsController.getNewsById); 
router.delete('/:id', protect, newsController.deleteNews);

module.exports = router;