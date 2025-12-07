import { useEffect, useState } from "react";
import api from "../api";
import PageHeader from "../components/PageHeader";

const About = () => {
  const [data, setData] = useState({ title: "Hakkımızda", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/pages/hakkimizda");
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("Veri yüklenemedi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Üst Başlık */}
      <PageHeader title={data.title} />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Beyaz Kart Alanı */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 relative overflow-hidden">
          
          {/* Dekoratif Arka Plan Deseni (Opsiyonel - Modernlik katar) */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-32 bg-gray-100 rounded w-full mt-6"></div>
            </div>
          ) : (
            <div 
              className="prose prose-lg prose-slate max-w-none prose-headings:text-brand-dark prose-a:text-brand-blue hover:prose-a:text-blue-700 prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: data.content }} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default About;