import { useState, useEffect } from "react";
import axios from "axios";

const References = () => {
  // 1. PAYDAŞLAR LİSTESİ (SABİT - Değişmez)
  const stakeholders = [
    { name: "Çankırı Karatekin Üniversitesi", logo: "/paydas/caku.png" },
    { name: "Çankırı Yakınkent OSB", logo: "/paydas/yakin.jpg" },
    { name: "Şabanözü OSB", logo: "/paydas/saban.png" },
    { name: "Korgun OSB", logo: "/paydas/korgun.jpg" }
  ];

  // 2. FİRMALAR LİSTESİ (DİNAMİK - Backend'den gelecek)
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/companies");
        if (response.data.success) {
          setCompanies(response.data.data);
        }
      } catch (error) {
        console.error("Firmalar yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Sonsuz döngü efekti için listeyi iki kere birleştiriyoruz (Eğer veri varsa)
  const loopedCompanies = companies.length > 0 ? [...companies, ...companies] : [];

  // Resim URL Yardımcısı
  const getLogoUrl = (path) => {
    // Eğer veritabanında logo yoksa veya path null ise boş döndür
    if (!path) return "https://via.placeholder.com/150x80?text=Firma";
    // Eğer path zaten http ile başlıyorsa (eski veri) olduğu gibi kullan, yoksa uploads klasöründen al
    if (path.startsWith("http")) return path;
    return `http://localhost:3000/uploads/images/${path}`;
  };

  return (
    <div className="bg-white">
      
      {/* --- 1. BÖLÜM: PAYDAŞLARIMIZ (SABİT) --- */}
      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Paydaşlarımız
          </h3>
          <div className="w-16 h-1 bg-caku-red mx-auto rounded mb-12"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-items-center max-w-6xl mx-auto">
            {stakeholders.map((item, index) => (
              <div key={index} className="group flex flex-col items-center justify-center p-4 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="h-24 md:h-28 flex items-center justify-center">
                  <img 
                    src={item.logo} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 2. BÖLÜM: FİRMALARIMIZ (KAYAN SLIDER - DİNAMİK) --- */}
      <section className="py-12 bg-gray-50 border-t border-gray-200 overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <h3 className="text-gray-400 font-semibold uppercase tracking-widest text-sm">
            Bünyemizdeki Değerli Firmalar
          </h3>
        </div>

        {/* Kayan Alan */}
        {loading ? (
          <div className="text-center text-gray-400">Yükleniyor...</div>
        ) : companies.length > 0 ? (
          <div className="relative w-full overflow-hidden">
            {/* Sol ve Sağ kenarlardaki hafif fluluk efekti */}
            <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent"></div>
            <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent"></div>

            {/* Animasyonlu Şerit */}
            <div className="animate-scroll flex gap-12 items-center">
              {loopedCompanies.map((company, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110"
                  title={company.name}
                >
                  <img 
                    src={getLogoUrl(company.logo_url)} 
                    alt={company.name} 
                    className="h-12 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100"
                    onError={(e) => { e.target.style.display = 'none'; }} // Hatalı resimleri gizle
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 italic">Henüz firma eklenmemiş.</div>
        )}
      </section>

    </div>
  );
};

export default References;