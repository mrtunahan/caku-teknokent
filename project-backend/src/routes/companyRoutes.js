const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const upload = require('../middleware/imageUpload'); // Resim yükleme aracını tekrar kullanıyoruz
const { protect } = require('../middleware/authMiddleware');

// Public (Herkes görebilir)
router.get('/', companyController.getAllCompanies);

// Protected (Sadece Admin)
router.post('/', protect, upload.single('logo'), companyController.createCompany);
router.delete('/:id', protect, companyController.deleteCompany);
router.put('/:id', protect, upload.single('logo'), companyController.updateCompany); // YENİ
router.delete('/:id', protect, companyController.deleteCompany);



module.exports = router;