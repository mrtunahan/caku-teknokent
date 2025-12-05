// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Token oluşturma fonksiyonu
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d' // Token 1 gün geçerli olsun
  });
};

class AuthController {
  
  // Yönetici Girişi
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
      }

      const isValid = await user.validPassword(password);

      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Hatalı şifre' });
      }

      const token = createToken(user.id);

      res.json({
        success: true,
        message: 'Giriş başarılı',
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // İlk Yöneticiyi Oluşturmak İçin
  async register(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.create({ username, password });
      const token = createToken(user.id);
      res.status(201).json({ success: true, token, user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  // Şifre Değiştirme (Class içine metot olarak eklendi)
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id; // Middleware'den gelen ID

      const user = await User.findByPk(userId);
      
      // Eski şifre kontrolü
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Eski şifre hatalı!" });
      }

      // Yeni şifreyi hashle ve kaydet
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.json({ success: true, message: "Şifreniz başarıyla güncellendi." });

    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new AuthController();