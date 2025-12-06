const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
// Eski import şekline dönüş:
const upload = require('../middleware/imageUpload');
const { protect } = require('../middleware/authMiddleware');

// Public
router.get('/', companyController.getAllCompanies);

// Protected (resizeImage kaldırıldı)
router.post('/', protect, upload.single('logo'), companyController.createCompany);
router.delete('/:id', protect, companyController.deleteCompany);
router.put('/:id', protect, upload.single('logo'), companyController.updateCompany);

module.exports = router;