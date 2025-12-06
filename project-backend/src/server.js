const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet'); // <--- 1. YENİ: Buraya ekleyin
require('dotenv').config();

// Rota ve Model Importları (Aynı kalsın)
const authRoutes = require('./routes/authRoutes');
const careerRoutes = require('./routes/careerRoutes');
const newsRoutes = require('./routes/newsRoutes');
const companyRoutes = require('./routes/companyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');

// Veritabanı (Aynı kalsın)
const sequelize = require('./config/database');
require('./models/User');
require('./models/JobApplication');
require('./models/News');
require('./models/Company');
require('./models/Contact');
require('./models/ProjectApplication');

// --- 1. APP BAŞLATMA ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 2. GÜVENLİK VE MIDDLEWARE ---

// A. Helmet (Güvenlik Başlıkları) - <--- 2. YENİ: BURAYA EKLEYİN
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } 
}));
// NOT: "cross-origin" ayarı, Frontend'in (port 5173) Backend'den (port 5000) 
// resim yükleyebilmesi için gereklidir. Yoksa resimler kırık görünür.

// B. Loglama
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// C. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200,
  message: { success: false, message: "Çok fazla istek gönderdiniz." }
});
app.use('/api', limiter);

// D. Standartlar
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- 3. RESİM SERVİSİ ---
// (Burası ve altındaki kodlar aynen kalacak, değiştirmeyin)
const uploadsPath = path.join(__dirname, '../uploads');
const imagesPath = path.join(uploadsPath, 'images');

app.use('/uploads', express.static(uploadsPath));

app.get('/uploads/images/:filename', (req, res) => {
    // ... (Mevcut kodunuz aynen kalsın) ...
    const filename = req.params.filename;
    const filePath = path.join(imagesPath, filename);

    if (!filePath.startsWith(imagesPath)) {
        return res.status(403).json({ success: false, message: 'Erişim reddedildi.' });
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`❌ Resim Bulunamadı: ${filename}`);
            return res.status(404).json({ success: false, message: 'Resim bulunamadı' });
        }
        res.sendFile(filePath, (err) => {
            if (err && !res.headersSent) res.status(500).end();
        });
    });
});

// ... (Diğer rotalar ve sunucu başlatma kodları aynen kalsın) ...
// --- 4. API ROTALARI ---
app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contact', contactRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server çalışıyor!' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint bulunamadı' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Sunucu hatası',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Veritabanı bağlantısı başarılı');
    await sequelize.sync({ alter: true });
    
    app.listen(PORT, () => {
      console.log(`🚀 Server ${PORT} portunda çalışıyor`);
      console.log(`📂 Resim yolu aktif: ${imagesPath}`);
    });
  } catch (error) {
    console.error('❌ Sunucu hatası:', error);
  }
};

startServer();