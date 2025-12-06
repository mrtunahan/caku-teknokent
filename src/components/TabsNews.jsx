import { useState, useEffect } from "react";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaArrowRight, FaThLarge } from "react-icons/fa";
import { Link } from "react-router-dom";

const TabsNews = () => {
  const [activeTab, setActiveTab] = useState("haberler");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CAROUSEL STATE'LERİ ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerScreen, setItemsPerScreen] = useState(3);

  // Sekme Başlıkları
  const tabs = [
    { id: "haberler", label: "HABERLER" },
    { id: "duyurular", label: "DUYURULAR" },
    { id: "etkinlikler", label: "ETKİNLİKLER" },
    { id: "firmalar", label: "FİRMALARDAN HABERLER" },
  ];


  // Sekmeye göre "Tümünü Görüntüle" linkini belirle
  const getViewAllLink = (tab) => {
    // Artık hepsi /liste/... formatında olacak
    return `/liste/${tab}`;
  };

  // Ekran boyutuna göre gösterilecek kart sayısını ayarla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerScreen(1); // Mobil
      } else if (window.innerWidth < 1024) {
        setItemsPerScreen(2); // Tablet
      } else {
        setItemsPerScreen(3); // Masaüstü
      }
    };

    handleResize(); // İlk açılışta çalıştır
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Verileri Çek
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/news");
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

  // Sekme değiştiğinde slider'ı başa sar
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // Aktif sekmeye göre veriyi filtrele
  const filteredContent = newsList.filter((item) => item.category === activeTab);
  
  // Maksimum kaydırılabilecek index sayısı
  const maxIndex = Math.max(0, filteredContent.length - itemsPerScreen);

  // --- OTOMATİK KAYDIRMA MANTIĞI (5 SN) ---
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, maxIndex, currentIndex]);

  // Manuel İleri
  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Manuel Geri
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(maxIndex);
    }
  };

  return (
    <section className="py-16 bg-white select-none">
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
          <div 
            className="relative group/slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {filteredContent.length > 0 ? (
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * (100 / itemsPerScreen)}%)` }}
                >
                  {filteredContent.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex-shrink-0 px-3 w-full md:w-1/2 lg:w-1/3 box-border"
                      style={{ width: `${100 / itemsPerScreen}%` }}
                    >
                      <div className="border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white min-h-[450px]">
                        
                        {/* Resim */}
                        <Link to={`/haber-detay/${item.id}`} className="overflow-hidden rounded-t-lg h-52 relative bg-gray-100 block shrink-0">
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
                          
                          <Link to={`/haber-detay/${item.id}`} className="block mb-3">
                            <h3 className="text-lg font-bold text-gray-800 hover:text-caku-red transition-colors leading-snug line-clamp-2">
                              {item.title}
                            </h3>
                          </Link>

                          <div 
                            className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow overflow-hidden"
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          ></div>
                          
                          <Link to={`/haber-detay/${item.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-brand-blue transition-colors mt-auto">
                            Devamını Oku <FaArrowRight className="text-xs" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg text-gray-500">
                Bu kategoride henüz içerik bulunmuyor.
              </div>
            )}

            {/* OK BUTONLARI */}
            {filteredContent.length > itemsPerScreen && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white text-brand-dark p-3 rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-caku-red hover:text-white z-10 border border-gray-100"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white text-brand-dark p-3 rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-caku-red hover:text-white z-10 border border-gray-100"
                >
                  <FaChevronRight />
                </button>
              </>
            )}

          </div>
        )}

        {/* --- YENİ EKLENEN BUTON: TÜMÜNÜ GÖRÜNTÜLE --- */}
        {/* Sadece içerik varsa göster */}
        {filteredContent.length > 0 && (
            <div className="flex justify-center mt-12">
                <Link 
                    to={getViewAllLink(activeTab)} 
                    className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-full shadow-sm text-gray-600 font-semibold hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300 group"
                >
                    <FaThLarge className="text-sm opacity-70 group-hover:opacity-100" />
                    <span>Tümünü Görüntüle</span>
                    <FaArrowRight className="text-xs opacity-70 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        )}

      </div>
    </section>
  );
};

export default TabsNews;