import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";
import PageHeader from "../components/PageHeader";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const NewsList = () => {
  const { category } = useParams(); // URL'den kategoriyi al (örn: 'duyurular', 'haberler')
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Kategori ismini başlık için güzelleştirme
  const categoryTitles = {
    "haberler": "Haberler",
    "duyurular": "Duyurular",
    "etkinlikler": "Etkinlikler",
    "firmalar": "Firmalardan Haberler"
  };

  const pageTitle = categoryTitles[category] || "İçerik Listesi";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/news"); // Tüm haberleri çekiyoruz
        if (response.data.success) {
          // Gelen veriyi URL'deki kategoriye göre filtreliyoruz
          const filteredItems = response.data.data.filter(
            item => item.category === category
          );
          setItems(filteredItems);
        }
      } catch (error) {
        console.error("Veri yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]); // Kategori değişirse tekrar çalıştır

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title={pageTitle} />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-4">
                <Skeleton className="h-48 w-full rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                
                {/* Resim */}
                <Link to={`/haber-detay/${item.id}`} className="block h-56 overflow-hidden relative">
                  <img 
                    src={getImageUrl(item.image_url)} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Resim+Yok" }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-gray-800 uppercase shadow-sm">
                    {item.category}
                  </div>
                </Link>

                {/* İçerik */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold mb-3">
                    <FaCalendarAlt className="text-caku-red" /> {item.date}
                  </div>

                  <Link to={`/haber-detay/${item.id}`} className="block mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-blue transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  <div className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow" dangerouslySetInnerHTML={{__html: item.content}}></div>

                  <Link to={`/haber-detay/${item.id}`} className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm group/btn mt-auto">
                    Devamını Oku 
                    <FaArrowRight className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Henüz İçerik Yok</h3>
            <p className="text-gray-500">Bu kategoriye ait henüz bir içerik eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;