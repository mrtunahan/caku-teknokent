const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Yükleme klasörünü ayarla (proje ana dizininde 'uploads/cv' klasörü oluşturur)
const uploadDir = path.join(__dirname, '../../uploads/cv');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Dosya ismini benzersiz yap: zamanDamgasi-orijinalIsim.pdf
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Sadece PDF ve Word dosyalarına izin ver
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/msword' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  } else {
    cb(new Error('Sadece PDF veya Word dosyası yükleyebilirsiniz!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum 5MB
  fileFilter: fileFilter
});

module.exports = upload;