import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";
import { FaCalendarAlt, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Skeleton from "../components/Skeleton";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/news/${id}`);
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

  if (loading) return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-32 container mx-auto px-4 max-w-4xl">
         <Skeleton className="h-10 w-48 mb-6" />
         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
             <Skeleton className="w-full h-[400px]" />
             <div className="p-8">
                 <Skeleton className="h-8 w-3/4 mb-4" />
                 <Skeleton className="h-4 w-full mb-2" />
                 <Skeleton className="h-4 w-full mb-2" />
                 <Skeleton className="h-4 w-2/3" />
             </div>
         </div>
    </div>
  );

  if (!news) return <div className="min-h-screen flex items-center justify-center pt-20">İçerik bulunamadı.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Seo 
        title={news.title} 
        description={news.content ? news.content.substring(0, 150).replace(/<[^>]+>/g, '') + "..." : news.title} 
      />

      {/* Üst Banner (Opsiyonel: İsterseniz burayı kaldırabilirsiniz, aşağıda başlık var) */}
      <PageHeader title={news.title} image={news.image_url ? getImageUrl(news.image_url) : null} />

      <div className="container mx-auto px-4 py-12 max-w-4xl mt-[-100px] relative z-10">
        
        {/* Geri Dön Butonu */}
        <Link to={`/liste/${news.category}`} className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors font-medium bg-black/20 hover:bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
          <FaArrowLeft /> Listeye Dön
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Büyük Görsel */}
          <div className="w-full h-auto max-h-[500px] relative bg-gray-100 flex justify-center items-center overflow-hidden">
             {news.image_url ? (
                <img 
                  src={getImageUrl(news.image_url)} 
                  alt={news.title} 
                  className="w-full h-full object-cover"
                />
             ) : (
                <div className="text-gray-400 py-20">Görsel Bulunmuyor</div>
             )}
            
            <div className="absolute top-4 left-4 bg-brand-blue text-white px-4 py-1.5 rounded-lg text-sm font-bold uppercase shadow-lg tracking-wide">
              {news.category}
            </div>
          </div>

          {/* İçerik Gövdesi */}
          <div className="p-8 md:p-12">
            
            {/* Meta Bilgiler (Tarih ve Paylaş) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2 text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full">
                <FaCalendarAlt className="text-caku-red" />
                {new Date(news.date).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              
              <div className="flex gap-3 items-center">
                <span className="text-sm text-gray-400 mr-1">Paylaş:</span>
                <button className="text-gray-400 hover:text-blue-600 transition-colors bg-gray-50 p-2 rounded-full hover:bg-blue-50"><FaFacebook /></button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors bg-gray-50 p-2 rounded-full hover:bg-blue-50"><FaTwitter /></button>
                <button className="text-gray-400 hover:text-blue-700 transition-colors bg-gray-50 p-2 rounded-full hover:bg-blue-50"><FaLinkedin /></button>
              </div>
            </div>

            {/* --- DEĞİŞİKLİK: Başlık Buraya da Eklendi --- */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                {news.title}
            </h1>

            {/* Metin İçeriği */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content || "<p class='text-gray-400 italic'>Bu içerik için henüz metin girilmemiş.</p>" }}
            ></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;