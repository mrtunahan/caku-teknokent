const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Auth rotalarını ekleyin
const User = require('./models/User'); // User modeli veritabanı senkronizasyonu için
const careerRoutes = require('./routes/careerRoutes');
const JobApplication = require('./models/JobApplication'); // Tablo oluşumu için
const newsRoutes = require('./routes/newsRoutes');
const News = require('./models/News'); // Tabloyu oluşturması için
const companyRoutes = require('./routes/companyRoutes');
const Company = require('./models/Company');
const contactRoutes = require('./routes/contactRoutes');
const Contact = require('./models/Contact');


require('dotenv').config();

const sequelize = require('./config/database');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Routes
app.use('/api/auth', authRoutes); // Auth için base url: /api/auth
app.use('/api', projectRoutes);
app.use('/api/career', careerRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/news', newsRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server çalışıyor!' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint bulunamadı' 
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
// Sunucuyu başlat ve DB'yi senkronize et
app.listen(PORT, async () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  
  try {
    await sequelize.authenticate();
    console.log('✅ Veritabanı bağlantısı aktif');
    
    // force: false -> Tabloları silme, yoksa oluştur. 
    // alter: true -> Değişiklik varsa güncelle.
    await sequelize.sync({ alter: true }); 
    console.log('✅ Tablolar senkronize edildi (Users tablosu eklendi)');
    
  } catch (error) {
    console.error('❌ Veritabanı bağlantı hatası:', error);
  }
});