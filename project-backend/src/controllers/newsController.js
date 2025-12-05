const News = require('../models/News');
const fs = require('fs');
const path = require('path');

// Yeni Haber Ekle
exports.createNews = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.filename : null;
    
    const newItem = await News.create({
      ...req.body,
      image_url: imagePath
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Tümünü Listele
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Sil
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await News.findByPk(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Kayıt bulunamadı' });
    }

    // Varsa resim dosyasını da klasörden sil
    if (item.image_url) {
      const filePath = path.join(__dirname, '../../uploads/images', item.image_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await item.destroy();
    res.json({ success: true, message: 'Silindi' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await News.findByPk(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Haber bulunamadı' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'Haber bulunamadı' });
    }

    // Eğer yeni bir resim yüklendiyse
    let imagePath = news.image_url; // Eski resmi koru
    if (req.file) {
      imagePath = req.file.filename; // Yeni resmi al
      
      // İsterseniz eski resmi klasörden silebilirsiniz (Opsiyonel):
      if (news.image_url) {
        const fs = require('fs');
        const path = require('path');
        const oldPath = path.join(__dirname, '../../uploads/images', news.image_url);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    // Veritabanını güncelle
    await news.update({
      title: req.body.title || news.title,
      category: req.body.category || news.category,
      date: req.body.date || news.date,
      content: req.body.content || news.content,
      image_url: imagePath
    });

    res.json({ success: true, data: news, message: 'Haber güncellendi' });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};