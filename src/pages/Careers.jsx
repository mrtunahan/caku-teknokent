import { useState } from 'react';
import axios from 'axios'; // Axios'u import ettik
import "./Career.css"; 

const Careers = () => {
  // Görünüm State'i: 'selection' (kartlar) veya 'form' (başvuru formu)
  const [view, setView] = useState('selection'); 
  // Hangi tür başvuru? 'staj' veya 'is'
  const [formType, setFormType] = useState(null);
  
  // Yükleme durumu (Loading)
  const [loading, setLoading] = useState(false);

  // Form Verileri State'i
  const [formData, setFormData] = useState({
    firma_adi: '',
    ad_soyad: '',
    email: '', // Backend için zorunlu alan
    yetkinlikler: '',
    github_link: '',
    motivasyon_mektubu: ''
  });
  
  // Dosya State'i
  const [cvFile, setCvFile] = useState(null);

  // Örnek Firma Listesi
  const companies = [
    { id: 1, name: "ÇAKÜ Teknokent Yönetim A.Ş." },
    { id: 2, name: "Korkmaz Yazılım & Bilişim" },
    { id: 3, name: "Alfa Ar-Ge Mühendislik" },
    { id: 4, name: "TechSoft Çözümleri" },
    { id: 5, name: "Veri Analiz Sistemleri" }
  ];

  // Örnek Açık İlanlar
  const jobPostings = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Korkmaz Yazılım & Bilişim",
      type: "Tam Zamanlı",
      category: "is",
      date: "04.12.2025"
    },
    {
      id: 2,
      title: "Yaz Dönemi Stajyeri",
      company: "Alfa Ar-Ge Mühendislik",
      type: "Staj (Zorunlu)",
      category: "staj",
      date: "01.12.2025"
    },
    {
      id: 3,
      title: "Siber Güvenlik Uzman Yardımcısı",
      company: "ÇAKÜ Teknokent Yönetim A.Ş.",
      type: "Yarı Zamanlı / Tam Zamanlı",
      category: "is",
      date: "28.11.2025"
    },
    {
      id: 4,
      title: "Mobil Uygulama Geliştirici (Flutter)",
      company: "TechSoft Çözümleri",
      type: "Uzaktan / Hibrit",
      category: "is",
      date: "25.11.2025"
    }
  ];

  // Kart tıklama fonksiyonu
  const handleCardClick = (type) => {
    setFormType(type);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Geri dön fonksiyonu
  const handleBack = () => {
    setView('selection');
    setFormType(null);
    setFormData({ firma_adi: '', ad_soyad: '', email: '', yetkinlikler: '', github_link: '', motivasyon_mektubu: '' });
    setCvFile(null);
  };

  // Input Değişikliklerini Yönet
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Dosya Seçimini Yönet
  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  // FORM GÖNDERME (BACKEND BAĞLANTISI)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. FormData Nesnesi Oluştur (Dosya gönderimi için zorunludur)
    const data = new FormData();
    data.append('basvuru_tipi', formType); // 'is' veya 'staj'
    data.append('firma_adi', formData.firma_adi);
    data.append('ad_soyad', formData.ad_soyad);
    data.append('email', formData.email);
    data.append('yetkinlikler', formData.yetkinlikler);
    data.append('github_link', formData.github_link);
    data.append('motivasyon_mektubu', formData.motivasyon_mektubu);
    
    // Dosya varsa ekle (Backend'de 'cv' ismiyle karşılanıyor)
    if (cvFile) {
      data.append('cv', cvFile);
    }

    try {
      // 2. Backend'e POST İsteği At
      const response = await axios.post('http://localhost:5000/api/career/apply', data, {
        headers: {
          'Content-Type': 'multipart/form-data' // Önemli!
        }
      });

      if (response.data.success) {
        alert("Başvurunuz ve CV'niz başarıyla gönderildi!");
        handleBack(); // Ana ekrana dön
      }

    } catch (error) {
      console.error("Başvuru hatası:", error);
      alert("Başvuru sırasında bir hata oluştu: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-container">
      
      {/* 1. BÖLÜM: SEÇİM KARTLARI */}
      {view === 'selection' && (
        <div className="selection-container">
          {/* Staj Kartı */}
          <div className="selection-card" onClick={() => handleCardClick('staj')}>
            <span className="card-icon">🎓</span>
            <h3>Staj Başvurusu</h3>
            <p>
              Üniversite eğitimini sürdürürken gerçek projelerde deneyim kazanmak isteyen öğrenciler için.
            </p>
          </div>

          {/* İş Kartı */}
          <div className="selection-card" onClick={() => handleCardClick('is')}>
            <span className="card-icon">💼</span>
            <h3>İş Başvurusu</h3>
            <p>
              Kariyerine Teknokent bünyesindeki yenilikçi firmalarda devam etmek isteyen profesyoneller için.
            </p>
          </div>
        </div>
      )}

      {/* 2. BÖLÜM: DİNAMİK FORM ALANI */}
      {view === 'form' && (
        <div className="form-wrapper">
          <button className="back-btn" onClick={handleBack} type="button">
            ← Geri Dön
          </button>

          <h2 style={{marginTop:0, color:'#007bff'}}>
            {formType === 'staj' ? 'Staj Başvuru Formu' : 'İş Başvuru Formu'}
          </h2>
          <p style={{marginBottom:'20px', color:'#666'}}>
            {formType === 'staj' 
              ? 'Lütfen başvurmak istediğiniz firmayı seçerek bilgilerinizi giriniz.' 
              : 'Yeteneklerinize uygun firmayı seçerek kariyer yolculuğuna başlayın.'}
          </p>

          <form onSubmit={handleSubmit}>
            
            {/* 1. Başvuru Yapılacak Firma */}
            <div className="form-group">
              <label>Başvuru Yapılacak Firma *</label>
              <select 
                name="firma_adi" 
                value={formData.firma_adi} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Seçiniz...</option>
                {companies.map(company => (
                  <option key={company.id} value={company.name}>{company.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Ad Soyad */}
            <div className="form-group">
              <label>Ad Soyad *</label>
              <input 
                type="text" 
                name="ad_soyad"
                value={formData.ad_soyad}
                onChange={handleInputChange}
                placeholder="Adınız Soyadınız" 
                required 
              />
            </div>

            {/* 3. E-Posta (YENİ EKLENDİ) */}
            <div className="form-group">
              <label>E-Posta Adresi *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ornek@email.com" 
                required 
              />
            </div>

            {/* 4. Yetkinlikler */}
            <div className="form-group">
              <label>Yetkinlikler</label>
              <input 
                type="text" 
                name="yetkinlikler"
                value={formData.yetkinlikler}
                onChange={handleInputChange}
                placeholder="Örn: React, Python, Adobe XD, Takım Çalışması..." 
              />
            </div>

            {/* 5. GitHub Adresi */}
            <div className="form-group">
              <label>GitHub Adresi</label>
              <input 
                type="url" 
                name="github_link"
                value={formData.github_link}
                onChange={handleInputChange}
                placeholder="https://github.com/kullaniciadi" 
              />
            </div>

            {/* 6. CV Yükleme */}
            <div className="form-group">
              <label>CV Yükle (PDF veya Word) *</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange}
                style={{padding: '10px'}} 
                required // Dosya zorunlu olsun
              />
            </div>

            {/* 7. Motivasyon Açıklaması */}
            <div className="form-group">
              <label>Motivasyon Açıklaması</label>
              <textarea 
                rows="5" 
                name="motivasyon_mektubu"
                value={formData.motivasyon_mektubu}
                onChange={handleInputChange}
                placeholder="Neden bu pozisyona başvuruyorsunuz? Kendinizden kısaca bahsedin..."
              ></textarea>
            </div>

            <button className="submit-btn" disabled={loading}>
              {loading ? 'Gönderiliyor...' : (formType === 'staj' ? 'Staj Başvurusunu Gönder' : 'İş Başvurusunu Gönder')}
            </button>
          </form>
        </div>
      )}

      {/* 3. BÖLÜM: AÇIK İLANLAR LİSTESİ */}
      {view === 'selection' && (
        <div className="postings-section">
          <h3 className="section-title">Açık İş ve Staj İlanları</h3>
          {jobPostings.map((job) => (
            <div key={job.id} className="posting-card">
              <div className="posting-info">
                <h4>{job.title}</h4>
                <div className="posting-company">{job.company}</div>
                <span className="posting-type">{job.type}</span>
                <span className="posting-date">📅 {job.date}</span>
              </div>
              <button className="apply-link" onClick={() => handleCardClick(job.category)}>
                Başvur
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Careers;