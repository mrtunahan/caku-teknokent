const JobApplication = require('../models/JobApplication');

exports.createApplication = async (req, res) => {
  try {
    // Dosya yüklendi mi kontrol et
    const cvPath = req.file ? req.file.filename : null;

    const application = await JobApplication.create({
      ...req.body, // Formdan gelen metin verileri
      cv_dosya_yolu: cvPath
    });

    res.status(201).json({
      success: true,
      message: 'Başvurunuz başarıyla alındı.',
      data: application
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    const apps = await JobApplication.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await JobApplication.findByPk(id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Başvuru bulunamadı' });
    }

    await application.destroy();
    res.json({ success: true, message: 'Başvuru başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};