const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const News = sequelize.define('News', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: { // 'haberler', 'duyurular', 'etkinlikler', 'firmalar'
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING, // "03.12.2025" formatında string tutabiliriz veya DATE kullanabiliriz. String şimdilik daha kolay.
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: { // Detay metni (Opsiyonel)
    type: DataTypes.TEXT,
    allowNull: true
  },
  link: { // Harici link varsa
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = News;