const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  ad_soyad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  telefon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mesaj: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Contact;