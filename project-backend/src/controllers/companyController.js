const Company = require('../models/Company');
const fs = require('fs').promises; // Asenkron fs
const path = require('path');

// Yeni Firma Ekle
exports.createCompany = async (req, res) => {
  try {
    const logoPath = req.file ? req.file.filename : null;
    
    const newCompany = await Company.create({
      ...req.body,
      logo_url: logoPath
    });

    res.status(201).json({ success: true, data: newCompany });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tüm Firmaları Listele
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({ order: [['name', 'ASC']] });
    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Firma Sil
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ success: false, message: 'Firma bulunamadı' });
    }

    // Logo dosyasını güvenli şekilde sil
    if (company.logo_url) {
      const filePath = path.join(__dirname, '../../uploads/images', company.logo_url);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.warn('Logo dosyası silinemedi:', err.message);
      }
    }

    await company.destroy();
    res.json({ success: true, message: 'Firma silindi' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Firma Güncelle
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ success: false, message: 'Firma bulunamadı' });
    }

    let logoPath = company.logo_url;
    if (req.file) {
      logoPath = req.file.filename;
      
      // Eski logoyu güvenli şekilde sil
      if (company.logo_url) {
        const oldPath = path.join(__dirname, '../../uploads/images', company.logo_url);
        try {
            await fs.unlink(oldPath);
        } catch (err) {
            console.warn('Eski logo silinemedi:', err.message);
        }
      }
    }

    await company.update({
      name: req.body.name || company.name,
      sector: req.body.sector || company.sector,
      logo_url: logoPath
    });

    res.json({ success: true, data: company, message: 'Firma güncellendi' });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};