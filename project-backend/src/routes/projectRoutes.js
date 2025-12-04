const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Yeni başvuru oluştur
router.post('/applications', projectController.createApplication);

// Tüm başvuruları listele (filtreleme ve arama ile)
router.get('/applications', projectController.getAllApplications);

// Tekil başvuru getir
router.get('/applications/:id', projectController.getApplicationById);

// E-posta ile başvuru ara
router.get('/applications/search/email', projectController.searchByEmail);

// TC Kimlik No ile başvuru ara
router.get('/applications/search/tc', projectController.searchByTC);

// Başvuruyu güncelle (tüm alanlar)
router.put('/applications/:id', projectController.updateApplication);

// Başvuru durumunu güncelle
router.patch('/applications/:id/status', projectController.updateApplicationStatus);

// Başvuruyu sil
router.delete('/applications/:id', projectController.deleteApplication);

// İstatistikler
router.get('/statistics/summary', projectController.getStatistics);

// Proje alanlarına göre grupla
router.get('/statistics/by-field', projectController.getApplicationsByField);

module.exports = router;