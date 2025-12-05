import { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TabsNews = () => {
  const [activeTab, setActiveTab] = useState("haberler");
  const [newsList, setNewsList] = useState([]); // Tüm haberleri tutacak
  const [loading, setLoading] = useState(true);

  // Sekme Başlıkları
  const tabs = [
    { id: "haberler", label: "HABERLER" },
    { id: "duyurular", label: "DUYURULAR" },
    { id: "etkinlikler", label: "ETKİNLİKLER" },
    { id: "firmalar", label: "FİRMALARDAN HABERLER" },
  ];

  // Verileri Backend'den Çek
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/news");
        if (response.data.success) {
          setNewsList(response.data.data);
        }
      } catch (error) {
        console.error("Haberler yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Aktif sekmeye göre filtrele
  const filteredContent = newsList.filter(item => item.category === activeTab);

  // Resim URL Yardımcısı
  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop"; // Varsayılan Resim
    return `http://localhost:3000/uploads/images/${path}`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* SEKMELER */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm md:text-base font-bold tracking-wider transition-all duration-300 border-b-2 ${
                activeTab === tab.id
                  ? "border-caku-red text-caku-red"
                  : "border-transparent text-gray-400 hover:text-brand-blue"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* İÇERİK ALANI */}
        {loading ? (
          <div className="text-center text-gray-500">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <div key={item.id} className="group border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white">
    
                {/* Resim - Tıklanabilir */}
                <Link to={`/haber-detay/${item.id}`} className="overflow-hidden rounded-t-lg h-56 relative bg-gray-100 block">
                  <img 
                    src={getImageUrl(item.image_url)} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Resim+Yok" }}
                  />
                </Link>
                
                {/* Metin */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-brand-light font-bold mb-3 uppercase">
                    <FaCalendarAlt /> {item.date}
                  </div>
                  
                  {/* Başlık - Tıklanabilir */}
                  <Link to={`/haber-detay/${item.id}`} className="block">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-caku-red transition-colors leading-snug mb-3">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">
                    {item.content}
                  </p>
                  
                  {/* Buton - Tıklanabilir */}
                  <Link to={`/haber-detay/${item.id}`} className="inline-block text-sm font-semibold text-gray-400 group-hover:text-brand-blue transition-colors mt-auto">
                    Devamını Oku &rarr;
                  </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg text-gray-500">
                Bu kategoride henüz içerik bulunmuyor.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default TabsNews;