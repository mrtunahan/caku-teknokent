import { useState } from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const TabsNews = () => {
  // Hangi sekmenin açık olduğunu tutan "State"
  const [activeTab, setActiveTab] = useState("haberler");

  // Sekme Başlıkları
  const tabs = [
    { id: "haberler", label: "HABERLER" },
    { id: "duyurular", label: "DUYURULAR" },
    { id: "etkinlikler", label: "ETKİNLİKLER" },
    { id: "firmalar", label: "FİRMALARDAN HABERLER" },
  ];

  // İçerik Verileri (Her kategori için ayrı liste)
  const contentData = {
    haberler: [
      { id: 1, title: "Teknokent'te Yapay Zeka Zirvesi", date: "03.12.2025", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop" },
      { id: 2, title: "Yeni Kuluçka Merkezi Açıldı", date: "01.12.2025", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" },
      { id: 3, title: "Üniversite Sanayi İşbirliği", date: "28.11.2025", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop" },
    ],
    duyurular: [
      { id: 4, title: "2025 Dönemi Ön Başvuruları Başladı", date: "15.11.2025", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop" },
      { id: 5, title: "Ofis Tahsis Duyurusu", date: "10.11.2025", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop" },
    ],
    etkinlikler: [
      { id: 6, title: "Girişimcilik Kampı 2025", date: "20.12.2025", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop" },
    ],
    firmalar: [
      { id: 7, title: "Firmamız X, Yatırım Aldı!", date: "05.12.2025", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600&auto=format&fit=crop" },
    ]
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* 1. SEKMELER (GOSB Tarzı) */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm md:text-base font-bold tracking-wider transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? "border-caku-red text-caku-red"   // Aktifken Kırmızı ve Altı Çizgili
                  : "border-transparent text-gray-400 hover:text-brand-blue" // Pasifken Gri
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2. İÇERİK IZGARASI (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {contentData[activeTab].map((item) => (
            <div key={item.id} className="group cursor-pointer border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-300">
              
              {/* Resim */}
              <div className="overflow-hidden rounded-t-lg h-56 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Metin */}
              <div className="p-6 bg-white">
                <div className="flex items-center gap-2 text-xs text-brand-light font-bold mb-3 uppercase">
                  <FaCalendarAlt /> {item.date}
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-caku-red transition-colors leading-snug">
                  {item.title}
                </h3>
                <span className="inline-block mt-4 text-sm font-semibold text-gray-400 group-hover:text-brand-blue transition-colors">
                  Devamını Oku &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 3. TÜMÜNÜ GÖR BUTONU */}
        <div className="mt-12 text-center">
            <button className="px-8 py-3 border border-gray-300 text-gray-600 rounded hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all font-semibold text-sm tracking-wide">
                TÜM LİSTEYİ GÖRÜNTÜLE
            </button>
        </div>

      </div>
    </section>
  );
};

export default TabsNews;