import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api"; // axios yerine api.js kullanıyoruz
import { getImageUrl } from "../utils/imageHelper"; // Resim yolunu standartlaştırıyoruz
import { FaCalendarAlt, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        // Base URL api.js içinden otomatik gelir
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  if (!news) return <div className="min-h-screen flex items-center justify-center">Haber bulunamadı.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Seo 
        title={news.title}
        description={news.content ? news.content.substring(0, 150) + "..." : "Haber detayı"}
      />
      <PageHeader title={news.title} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue mb-6 transition-colors font-medium">
          <FaArrowLeft /> Ana Sayfaya Dön
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="w-full h-[400px] relative">
            {/* getImageUrl helper'ı kullanıldı */}
            <img 
              src={getImageUrl(news.image_url)} 
              alt={news.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-bold uppercase shadow-lg">
              {news.category}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <FaCalendarAlt className="text-caku-red" />
                {news.date}
              </div>
              <div className="flex gap-3">
                <span className="text-sm text-gray-400 mr-2 self-center">Paylaş:</span>
                <button className="text-gray-400 hover:text-blue-600 transition-colors"><FaFacebook size={20} /></button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors"><FaTwitter size={20} /></button>
                <button className="text-gray-400 hover:text-blue-700 transition-colors"><FaLinkedin size={20} /></button>
              </div>
            </div>
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