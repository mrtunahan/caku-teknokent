import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaListUl } from "react-icons/fa";
import api from "../api";
import Seo from "../components/Seo";

const Mission = () => {
  const [content, setContent] = useState({ misyon: null, vizyon: null, hedefler: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resMisyon, resVizyon, resHedefler] = await Promise.all([
          api.get("/pages/misyon").catch(() => ({ data: { data: null } })),
          api.get("/pages/vizyon").catch(() => ({ data: { data: null } })),
          api.get("/pages/hedefler").catch(() => ({ data: { data: null } }))
        ]);
        setContent({
          misyon: resMisyon.data.data,
          vizyon: resVizyon.data.data,
          hedefler: resHedefler.data.data
        });
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <>
      <Seo title="Misyon & Vizyon" description="Çankırı Karatekin Üniversitesi Teknokent Kurumsal Değerleri" />

      {/* Sayfa içeriğini ortalamak ve tam ekran hissi vermek için padding ayarlandı */}
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          
          {/* Başlık Alanı */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Kurumsal Değerlerimiz</h1>
            <p className="text-gray-500 text-lg">
              Teknoloji ve inovasyon yolculuğumuzda bize rehberlik eden temel ilkelerimiz.
            </p>
          </div>

          {/* TEK SATIRDA 3 KUTU (GRID YAPISI) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. MİSYON KUTUSU */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-600 hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm">
                <FaBullseye />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Misyonumuz</h2>
              <div 
                className="prose text-gray-600 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content.misyon?.content || "Bilgi ve teknolojinin sanayiye aktarılmasını sağlayarak, bölgesel ve ulusal kalkınmaya katkıda bulunmak." }} 
              />
            </motion.div>

            {/* 2. VİZYON KUTUSU */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600 hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm">
                <FaEye />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vizyonumuz</h2>
              <div 
                className="prose text-gray-600 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content.vizyon?.content || "Ar-Ge ve inovasyon ekosisteminde öncü, uluslararası rekabet gücüne sahip bir teknoloji üssü olmak." }} 
              />
            </motion.div>

            {/* 3. HEDEFLER KUTUSU */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-600 hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm">
                <FaListUl />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Hedeflerimiz</h2>
              <div 
                className="prose text-gray-600 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content.hedefler?.content || "Üniversite-Sanayi işbirliğini güçlendirmek ve girişimcilik kültürünü yaygınlaştırmak." }} 
              />
            </motion.div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Mission;