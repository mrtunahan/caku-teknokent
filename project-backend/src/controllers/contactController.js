const Contact = require('../models/Contact');

// Mesaj Gönder (Public)
exports.sendMessage = async (req, res) => {
  try {
    const newMessage = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Mesajınız iletildi.', data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mesajları Listele (Admin)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mesaj Sil (Admin)
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.destroy({ where: { id } });
    res.json({ success: true, message: 'Mesaj silindi' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};