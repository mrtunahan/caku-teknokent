import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import api from "../api"; // API bağlantısı
import { getImageUrl } from "../utils/imageHelper"; // Resim yolu düzenleyici

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/news");
        if (response.data.success) {
          // Son eklenen 3 haberi al (Tarihe göre sıralı geldiğini varsayıyoruz)
          // Sadece 'haberler' kategorisindekileri veya genel karışık son 3'ü gösterebiliriz.
          // Burada genel son 3 kaydı alıyoruz:
          const latestNews = response.data.data.slice(0, 3);
          setNewsData(latestNews);
        }
      } catch (error) {
        console.error("Haberler yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return null; // Yüklenirken boş dönebilir veya Skeleton koyabilirsiniz.

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Başlık Kısmı */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-brand-light font-semibold tracking-wider uppercase text-sm">Güncel Gelişmeler</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Haberler ve Duyurular</h2>
          </div>
          
          {/* Tümünü Gör Linki - Dinamik Listeye Gider */}
          <Link to="/liste/haberler" className="hidden md:flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all">
            Tümünü Gör <FaArrowRight />
          </Link>
        </div>

        {/* Haber Kartları (Grid) */}
        {newsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((item) => (
              <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                
                {/* Resim Alanı */}
                <Link to={`/haber-detay/${item.id}`} className="relative h-56 overflow-hidden block">
                  <img 
                    src={getImageUrl(item.image_url)} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Resim+Yok" }}
                  />
                  <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded uppercase shadow-md">
                    {item.category}
                  </div>
                </Link>

                {/* İçerik Alanı */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <FaCalendarAlt className="text-brand-light" />
                    <span>{item.date}</span>
                  </div>
                  
                  <Link to={`/haber-detay/${item.id}`} className="block mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-blue transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                  </Link>
                  
                  {/* İçerik Özeti (Opsiyonel - HTML taglerini temizleyerek) */}
                  <div className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                     {item.content ? item.content.replace(/<[^>]+>/g, '') : ''}
                  </div>
                  
                  <Link to={`/haber-detay/${item.id}`} className="inline-flex items-center gap-2 text-brand-light font-medium hover:text-brand-blue transition-colors mt-auto">
                    Devamını Oku <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-10 bg-gray-50 rounded-lg">
            Henüz haber girişi yapılmamış.
          </div>
        )}

        {/* Mobilde "Tümünü Gör" butonu */}
        <div className="mt-8 text-center md:hidden">
            <Link to="/liste/haberler" className="inline-block bg-brand-blue text-white px-6 py-3 rounded shadow hover:bg-brand-dark transition-colors font-medium">
                Tüm Haberleri Gör
            </Link>
        </div>

      </div>
    </section>
  );
};

export default News;