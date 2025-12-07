const express = require('express');
const router = express.Router();
const controller = require('../controllers/stakeholderController');
const upload = require('../middleware/imageUpload');
const { protect } = require('../middleware/authMiddleware');

router.get('/', controller.getAll);
router.post('/', protect, upload.single('logo'), controller.create);
router.put('/:id', protect, upload.single('logo'), controller.update);
router.delete('/:id', protect, controller.delete);

module.exports = router;