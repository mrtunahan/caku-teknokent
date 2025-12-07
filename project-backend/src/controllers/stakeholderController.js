const Stakeholder = require('../models/Stakeholder');
const fs = require('fs').promises;
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    const items = await Stakeholder.findAll();
    res.json({ success: true, data: items });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const logoPath = req.file ? req.file.filename : null;
    const item = await Stakeholder.create({ ...req.body, logo_url: logoPath });
    res.status(201).json({ success: true, data: item });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const item = await Stakeholder.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Bulunamadı' });

    let logoPath = item.logo_url;
    if (req.file) {
      logoPath = req.file.filename;
      if (item.logo_url) {
        try { await fs.unlink(path.join(__dirname, '../../uploads/images', item.logo_url)); } catch (e) {}
      }
    }
    await item.update({ ...req.body, logo_url: logoPath });
    res.json({ success: true, data: item });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

exports.delete = async (req, res) => {
  try {
    const item = await Stakeholder.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Bulunamadı' });
    if (item.logo_url) {
        try { await fs.unlink(path.join(__dirname, '../../uploads/images', item.logo_url)); } catch (e) {}
    }
    await item.destroy();
    res.json({ success: true, message: 'Silindi' });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};