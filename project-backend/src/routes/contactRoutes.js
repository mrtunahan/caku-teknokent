const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Public: Herkes mesaj atabilir
router.post('/', contactController.sendMessage);

// Protected: Sadece admin okuyabilir ve silebilir
router.get('/', protect, contactController.getAllMessages);
router.delete('/:id', protect, contactController.deleteMessage);

module.exports = router;