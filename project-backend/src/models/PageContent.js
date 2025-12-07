const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PageContent = sequelize.define('PageContent', {
  slug: {
    type: DataTypes.STRING, // Örn: 'hakkimizda', 'kvkk', 'misyon'
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT, // Uzun yazı içeriği (HTML formatında)
    allowNull: true
  }
});

module.exports = PageContent;