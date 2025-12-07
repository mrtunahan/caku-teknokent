import { useState, useEffect } from "react";
import api from "../api";
import { getImageUrl } from "../utils/imageHelper";
import { motion } from "framer-motion";

const References = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stakeRes, compRes] = await Promise.all([
            api.get("/stakeholders"), // Paydaşları Çek
            api.get("/companies")     // Firmaları Çek
        ]);
        
        if (stakeRes.data.success) setStakeholders(stakeRes.data.data);
        if (compRes.data.success) setCompanies(compRes.data.data);

      } catch (error) {
        console.error("Veri yükleme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sonsuz döngü efekti için liste birleştirme
  const loopedCompanies = companies.length > 0 ? [...companies, ...companies] : [];

  return (
    <div className="bg-white">
      
      {/* --- 1. BÖLÜM: PAYDAŞLARIMIZ (DİNAMİK) --- */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 overflow-hidden">
        
        {/* Dekoratif */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-caku-red/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-tight">
              Güçlü <span className="text-brand-blue">İş Birlikleri</span>, Ortak <span className="text-caku-red">Gelecek</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-brand-blue to-caku-red mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Bölgesel kalkınma ve inovasyon hedeflerimize, değerli paydaşlarımızın gücüyle yürüyoruz.
            </p>
          </motion.div>
          
          {loading ? (
             <div className="text-gray-400">Yükleniyor...</div>
          ) : stakeholders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {stakeholders.map((item, index) => (
                <motion.a 
                    key={item.id}
                    href={item.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex items-center justify-center h-48 border border-gray-100 relative overflow-hidden cursor-pointer"
                >
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-blue/10 rounded-2xl transition-all duration-500"></div>
                    <img 
                    src={getImageUrl(item.logo_url)} 
                    alt={item.name} 
                    className="max-h-24 w-auto object-contain filter grayscale-0 transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Logo" }}
                    />
                </motion.a>
                ))}
            </div>
          ) : (
             <div className="bg-white p-6 rounded-lg shadow-sm text-gray-500">Henüz paydaş eklenmemiş. Admin panelinden ekleyebilirsiniz.</div>
          )}

        </div>
      </section>

      {/* --- 2. BÖLÜM: FİRMALARIMIZ (SLIDER) --- */}
      <section className="py-16 bg-white border-t border-gray-100 overflow-hidden relative">
        <div className="container mx-auto px-4 mb-10 text-center">
          <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">
            Bünyemizdeki Değerli Firmalar
          </h3>
        </div>

        {companies.length > 0 ? (
          <div className="relative w-full overflow-hidden group">
            <div className="absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
            <div className="absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-white via-white/80 to-transparent"></div>

            <div className="animate-scroll flex gap-16 items-center py-4">
              {loopedCompanies.map((company, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
                  title={company.name}
                >
                  <img 
                    src={getImageUrl(company.logo_url)} 
                    alt={company.name} 
                    className="h-16 w-auto object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 italic">Henüz firma eklenmemiş.</div>
        )}
      </section>

    </div>
  );
};

export default References;