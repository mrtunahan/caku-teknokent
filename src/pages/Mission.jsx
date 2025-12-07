import { useEffect, useState } from "react";
import api from "../api"; // Sizin axios instance'ınız

const MisyonVizyon = () => {
  const [misyon, setMisyon] = useState(null);
  const [vizyon, setVizyon] = useState(null);
  const [hedefler, setHedefler] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Üç veriyi paralel olarak çekiyoruz
        const [resMisyon, resVizyon, resHedefler] = await Promise.all([
          api.get("/pages/misyon"),
          api.get("/pages/vizyon"),
          api.get("/pages/hedefler")
        ]);

        if (resMisyon.data.success) setMisyon(resMisyon.data.data);
        if (resVizyon.data.success) setVizyon(resVizyon.data.data);
        if (resHedefler.data.success) setHedefler(resHedefler.data.data);
      } catch (error) {
        console.error("Veri çekilemedi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="py-20 text-center">Yükleniyor...</div>;

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      
      {/* MİSYON BÖLÜMÜ */}
      {misyon && (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-brand-dark mb-4 border-l-4 border-red-600 pl-4">
            {misyon.title || 'Misyonumuz'}
          </h2>
          <div 
            className="prose max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: misyon.content }} 
          />
        </section>
      )}

      {/* VİZYON BÖLÜMÜ */}
      {vizyon && (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-brand-dark mb-4 border-l-4 border-blue-600 pl-4">
            {vizyon.title || 'Vizyonumuz'}
          </h2>
          <div 
            className="prose max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: vizyon.content }} 
          />
        </section>
      )}

      {/* HEDEFLER BÖLÜMÜ */}
      {hedefler && (
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-brand-dark mb-4 border-l-4 border-green-600 pl-4">
            {hedefler.title || 'Hedeflerimiz'}
          </h2>
          <div 
            className="prose max-w-none text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: hedefler.content }} 
          />
        </section>
      )}

    </div>
  );
};

export default MisyonVizyon;