const express = require('express');
const router = express.Router();
const controller = require('../controllers/boardController');
const upload = require('../middleware/imageUpload');
const { protect } = require('../middleware/authMiddleware');

router.get('/', controller.getAll);
router.post('/', protect, upload.single('image'), controller.create);
router.put('/:id', protect, upload.single('image'), controller.update);
router.delete('/:id', protect, controller.delete);

module.exports = router;