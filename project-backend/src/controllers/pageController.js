const PageContent = require('../models/PageContent');

// Sayfa İçeriğini Getir (Yoksa boş oluşturup getir)
exports.getPage = async (req, res) => {
  try {
    const { slug } = req.params;
    let page = await PageContent.findOne({ where: { slug } });
    
    // Eğer veritabanında bu sayfa henüz yoksa varsayılan boş bir kayıt oluştur
    if (!page) {
      page = await PageContent.create({ 
        slug, 
        title: slug.toUpperCase(), 
        content: "<p>İçerik henüz girilmemiş.</p>" 
      });
    }

    res.json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Sayfa İçeriğini Güncelle
exports.updatePage = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content } = req.body;
    
    let page = await PageContent.findOne({ where: { slug } });
    
    if (!page) {
        // Güncellenmek istenen sayfa yoksa oluştur
        page = await PageContent.create({ slug, title, content });
    } else {
        await page.update({ title, content });
    }

    res.json({ success: true, message: "Sayfa başarıyla güncellendi", data: page });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};