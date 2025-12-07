const BoardMember = require('../models/BoardMember');
const fs = require('fs').promises;
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    // Başkan en üstte görünsün diye sıralama ekledik
    const members = await BoardMember.findAll({ order: [['is_chairman', 'DESC'], ['createdAt', 'ASC']] });
    res.json({ success: true, data: members });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

exports.create = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.filename : null;
    const member = await BoardMember.create({ ...req.body, image_url: imagePath });
    res.status(201).json({ success: true, data: member });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

exports.update = async (req, res) => {
  try {
    const member = await BoardMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: 'Bulunamadı' });

    let imagePath = member.image_url;
    if (req.file) {
      imagePath = req.file.filename;
      if (member.image_url) {
        try { await fs.unlink(path.join(__dirname, '../../uploads/images', member.image_url)); } catch (e) {}
      }
    }
    await member.update({ ...req.body, image_url: imagePath });
    res.json({ success: true, data: member });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};

exports.delete = async (req, res) => {
  try {
    const member = await BoardMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: 'Bulunamadı' });
    if (member.image_url) {
        try { await fs.unlink(path.join(__dirname, '../../uploads/images', member.image_url)); } catch (e) {}
    }
    await member.destroy();
    res.json({ success: true, message: 'Silindi' });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
};