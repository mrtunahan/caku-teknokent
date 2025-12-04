const References = () => {
  // 1. PAYDAŞLAR LİSTESİ (SABİT - Senin yerel dosyaların)
  const stakeholders = [
    { name: "Çankırı Karatekin Üniversitesi", logo: "/paydas/caku.png" },
    { name: "Çankırı Yakınkent OSB", logo: "/paydas/yakin.jpg" },
    { name: "Şabanözü OSB", logo: "/paydas/saban.png" },
    { name: "Korgun OSB", logo: "/paydas/korgun.jpg" }
  ];

  // 2. FİRMALAR LİSTESİ (KAYAN - Senin yerel dosyaların)
  const companies = [
    { name: "LST Yazılım", logo: "/logos/lst.jpeg" },
    { name: "Spectrum Consulting", logo: "/logos/spectrum.png" },
    { name: "3D Robotik", logo: "/logos/3D-Robotik-Logo.png" },
    { name: "Bilişim School", logo: "/logos/bilisim_school.png" },
    { name: "BiSoft", logo: "/logos/bisoft.png" },
    { name: "Biveri", logo: "/logos/Biveri-logo.png" },
    { name: "Ortana", logo: "/logos/Ortana-logo.jpg" },
    { name: "Yurtsemen", logo: "/logos/yurtsemen.png" },
    { name: "StockMount", logo: "/logos/stochmount.png" },
    { name: "ProMIS", logo: "/logos/promis.png" },
    { name: "Pelit", logo: "/logos/pelit.png" },
    { name: "Neophran", logo: "/logos/neophran.png" },
    { name: "Miva", logo: "/logos/miva.png" },
    { name: "Metis", logo: "/logos/metis_bilisim.png" },
    { name: "Med Mar", logo: "/logos/med_mar.png" },
    { name: "Lobi Bilişim", logo: "/logos/lobi_bilisim.png" },
    { name: "KhanTech", logo: "khan_tech.png" },
    { name: "ivvo", logo: "/logos/ivvo.png" },
  ];

  // Sonsuz döngü pürüzsüz olsun diye firmalar listesini iki kere birleştiriyoruz
  const loopedCompanies = [...companies, ...companies];

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
                {/* Logo */}
                <div className="h-24 md:h-28 flex items-center justify-center">
                  {/* GÜNCELLEME: Grayscale ve opacity sınıfları kaldırıldı */}
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

      {/* --- 2. BÖLÜM: FİRMALARIMIZ (KAYAN SLIDER) --- */}
      <section className="py-12 bg-gray-50 border-t border-gray-200 overflow-hidden">
        <div className="container mx-auto px-4 mb-8 text-center">
          <h3 className="text-gray-400 font-semibold uppercase tracking-widest text-sm">
            Bünyemizdeki Değerli Firmalar
          </h3>
        </div>

        {/* Kayan Alan */}
        <div className="relative w-full overflow-hidden">
          {/* Sol ve Sağ kenarlardaki hafif fluluk efekti (Gradient) */}
          <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent"></div>

          {/* Animasyonlu Şerit */}
          <div className="animate-scroll flex gap-12 items-center">
            {loopedCompanies.map((company, index) => (
              <div 
                key={index} 
                // GÜNCELLEME: Grayscale ve opacity sınıfları kaldırıldı
                className="flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                {/* Logo Resmi */}
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default References;