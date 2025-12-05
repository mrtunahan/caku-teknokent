import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

const NewsDetail = () => {
  const { id } = useParams(); // URL'deki id'yi al (örn: /haber-detay/5)
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/news/${id}`);
        if (response.data.success) {
          setNews(response.data.data);
        }
      } catch (error) {
        console.error("Haber detayı yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const getImageUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop";
    return `http://localhost:3000/uploads/images/${path}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  if (!news) return <div className="min-h-screen flex items-center justify-center">Haber bulunamadı.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title={news.title} />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Geri Dön Butonu */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue mb-6 transition-colors font-medium">
          <FaArrowLeft /> Ana Sayfaya Dön
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Büyük Görsel */}
          <div className="w-full h-[400px] relative">
            <img 
              src={getImageUrl(news.image_url)} 
              alt={news.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-bold uppercase shadow-lg">
              {news.category}
            </div>
          </div>

          {/* İçerik */}
          <div className="p-8 md:p-12">
            
            {/* Meta Bilgiler */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <FaCalendarAlt className="text-caku-red" />
                {news.date}
              </div>
              
              {/* Paylaş Butonları (Görsel) */}
              <div className="flex gap-3">
                <span className="text-sm text-gray-400 mr-2 self-center">Paylaş:</span>
                <button className="text-gray-400 hover:text-blue-600 transition-colors"><FaFacebook size={20} /></button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors"><FaTwitter size={20} /></button>
                <button className="text-gray-400 hover:text-blue-700 transition-colors"><FaLinkedin size={20} /></button>
              </div>
            </div>

            {/* Metin İçeriği */}
            <div 
            className="prose max-w-none text-gray-700 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: news.content || "İçerik bilgisi bulunmamaktadır." }}
            ></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;