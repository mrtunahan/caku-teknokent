import React, { useState } from 'react';
import "./Career.css"; 

const Careers = () => {
  // Görünüm State'i: 'selection' (kartlar) veya 'form' (başvuru formu)
  const [view, setView] = useState('selection'); 
  // Hangi tür başvuru? 'staj' veya 'is'
  const [formType, setFormType] = useState(null);

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
          <button className="back-btn" onClick={handleBack}>
            ← Geri Dön
          </button>

          {/* Başlık Dinamik Değişir */}
          <h2 style={{marginTop:0, color:'#007bff'}}>
            {formType === 'staj' ? '' :''}
          </h2>
          <p style={{marginBottom:'20px', color:'#666'}}>
            {formType === 'staj' 
              ? 'Lütfen başvurmak istediğiniz firmayı seçerek bilgilerinizi giriniz.' 
              : 'Yeteneklerinize uygun firmayı seçerek kariyer yolculuğuna başlayın.'}
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            
            {/* 1. Başvuru Yapılacak Firma */}
            <div className="form-group">
              <label>Başvuru Yapılacak Firma</label>
              <select required>
                <option value="">Seçiniz...</option>
                {companies.map(company => (
                  <option key={company.id} value={company.name}>{company.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Ad Soyad */}
            <div className="form-group">
              <label>Ad Soyad</label>
              <input type="text" placeholder="Adınız Soyadınız" required />
            </div>

            {/* 3. Yetkinlikler */}
            <div className="form-group">
              <label>Yetkinlikler (Programlama dilleri, teknolojiler vb.)</label>
              <input type="text" placeholder="Örn: React, Python, Adobe XD, Takım Çalışması..." />
            </div>

            {/* 4. GitHub Adresi */}
            <div className="form-group">
              <label>GitHub Adresi</label>
              <input type="url" placeholder="https://github.com/kullaniciadi" />
            </div>

            {/* 5. CV Yükleme */}
            <div className="form-group">
              <label>CV Yükle (PDF veya Word)</label>
              <input type="file" accept=".pdf,.doc,.docx" style={{padding: '10px'}} />
            </div>

            {/* 6. Motivasyon Açıklaması */}
            <div className="form-group">
              <label>Motivasyon Açıklaması</label>
              <textarea rows="5" placeholder="Neden bu pozisyona başvuruyorsunuz? Kendinizden kısaca bahsedin..."></textarea>
            </div>

            <button className="submit-btn">
              {formType === 'staj' ? 'Staj Başvurusunu Gönder' : 'İş Başvurusunu Gönder'}
            </button>
          </form>
        </div>
      )}

      {/* 3. BÖLÜM: AÇIK İLANLAR LİSTESİ (Sadece seçim ekranında görünür) */}
      {view === 'selection' && (
        <div className="postings-section">
          <h3 className="section-title">Açık İş ve Staj İlanları</h3>
          
          {jobPostings.length === 0 ? (
            <p style={{textAlign:'center', color:'#777'}}>Şu anda açık pozisyon bulunmamaktadır.</p>
          ) : (
            jobPostings.map((job) => (
              <div key={job.id} className="posting-card">
                <div className="posting-info">
                  <h4>{job.title}</h4>
                  <div className="posting-company">{job.company}</div>
                  <span className="posting-type">{job.type}</span>
                  <span className="posting-date">📅 {job.date}</span>
                </div>
                
                <button 
                  className="apply-link" 
                  onClick={() => handleCardClick(job.category)}
                >
                  Başvur
                </button>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default Careers;