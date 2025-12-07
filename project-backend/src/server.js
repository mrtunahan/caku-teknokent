const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
require('dotenv').config();

// --- 1. ROTA DOSYALARINI ÇAĞIR ---
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const careerRoutes = require('./routes/careerRoutes');
const newsRoutes = require('./routes/newsRoutes');
const companyRoutes = require('./routes/companyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const pageRoutes = require('./routes/pageRoutes'); 
const boardRoutes = require('./routes/boardRoutes'); 
const stakeholderRoutes = require('./routes/stakeholderRoutes'); 

// --- 2. VERİTABANI VE MODELLER ---
const sequelize = require('./config/database');
require('./models/User');
require('./models/JobApplication');
require('./models/News');
require('./models/Company');
require('./models/Contact');
require('./models/ProjectApplication');
require('./models/PageContent'); 
require('./models/BoardMember'); 
require('./models/Stakeholder'); 

// --- 3. UYGULAMA AYARLARI ---
const app = express();
const PORT = process.env.PORT || 5000;

// Güvenlik (Helmet) 
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } 
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate Limit (Sayıyı artırdık ki admin paneli hata vermesin)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
  message: { success: false, message: "Çok fazla istek gönderdiniz." }
});
app.use('/api', limiter);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- 4. RESİM SERVİSİ ---
const uploadsPath = path.join(__dirname, '../uploads');
const imagesPath = path.join(uploadsPath, 'images');

if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
}

app.use('/uploads', express.static(uploadsPath));

app.get('/uploads/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(imagesPath, filename);

    if (!filePath.startsWith(imagesPath)) {
        return res.status(403).json({ success: false, message: 'Erişim reddedildi.' });
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ success: false, message: 'Resim bulunamadı' });
        }
        res.sendFile(filePath, (err) => {
            if (err && !res.headersSent) res.status(500).end();
        });
    });
});

// --- 5. API ROTALARI ---
app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes); 
app.use('/api/career', careerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/pages', pageRoutes); 
app.use('/api/board-members', boardRoutes);
app.use('/api/stakeholders', stakeholderRoutes);

// Sağlık Kontrolü
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server aktif.' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint bulunamadı.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Sunucu Hatası:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Sunucu tarafında bir hata oluştu.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// --- 6. SUNUCUYU BAŞLAT ---
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Veritabanı bağlantısı başarılı.');
    await sequelize.sync({ alter: true }); // Tabloları güncelle
    
    

    app.listen(PORT, () => {
      console.log(`🚀 Server http://localhost:${PORT} adresinde çalışıyor.`);
    });
  } catch (error) {
    console.error('❌ Sunucu başlatılamadı:', error);
  }
};

startServer();