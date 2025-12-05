const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo_url: {
    type: DataTypes.STRING,
    allowNull: true // Logo olmayabilir
  },
  website: { // Opsiyonel: Firmanın web sitesi linki
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Company;