import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFilePdf, FaExternalLinkAlt, FaHome, FaChevronRight } from "react-icons/fa";

const Legislation = () => {
  const { hash } = useLocation();

  // Sayfa açıldığında hash varsa (#kanunlar gibi) oraya kaydır
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  const categories = [
    {
      id: "kanunlar", // Navbar linki için ID
      title: "Kanunlar",
      items: [
        { id: 1, title: "4691 Sayılı Teknoloji Geliştirme Bölgeleri Kanunu", link: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.4691.pdf", type: "pdf" },
        { id: 2, title: "5746 Sayılı Ar-Ge Faaliyetlerinin Desteklenmesi Hakkında Kanun", link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5746.pdf", type: "pdf" }
      ]
    },
    {
      id: "yonetmelikler",
      title: "Yönetmelikler",
      items: [
        { id: 3, title: "Teknoloji Geliştirme Bölgeleri Uygulama Yönetmeliği", link: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=22742&MevzuatTur=7&MevzuatTertip=5", type: "link" }
      ]
    },
    {
      id: "yonergeler",
      title: "Yönergeler",
      items: [
        { id: 4, title: "Teknokent Proje Değerlendirme Yönergesi", link: "#", type: "pdf" },
        { id: 5, title: "Kuluçka Merkezi İşleyiş Yönergesi", link: "#", type: "pdf" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HERO BÖLÜMÜ */}
      <div className="relative h-[300px] w-full bg-gray-900 overflow-hidden flex items-center justify-center mt-[80px]">
        <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop" alt="Mevzuat Arkaplan" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Mevzuat
          </motion.h1>
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm md:text-base">
            <a href="/" className="hover:text-white flex items-center gap-1 transition-colors"><FaHome /> Anasayfa</a>
            <FaChevronRight className="text-xs opacity-50" />
            <span className="text-white font-semibold">Mevzuat</span>
          </div>
        </div>
      </div>

      {/* İÇERİK LİSTESİ */}
      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-16">
        {categories.map((category, catIndex) => (
          // ID buraya veriliyor ki link buraya kaysın
          <div key={catIndex} id={category.id} className="scroll-mt-32"> 
            <h2 className="text-2xl font-bold text-brand-dark mb-6 border-l-4 border-caku-red pl-4 flex items-center gap-2">
              {category.title}
              <span className="text-sm font-normal text-gray-400 ml-2">({category.items.length})</span>
            </h2>
            
            <div className="flex flex-col gap-4">
              {category.items.map((item, index) => (
                <motion.a 
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white border border-gray-200 rounded-lg p-5 flex items-center justify-between hover:shadow-lg hover:border-brand-blue transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 ${item.type === 'pdf' ? 'bg-red-500' : 'bg-blue-500'}`}>
                        {item.type === "pdf" ? <FaFilePdf /> : <FaExternalLinkAlt />}
                     </div>
                     <span className="text-gray-700 font-medium group-hover:text-brand-blue transition-colors">
                       {item.title}
                     </span>
                  </div>
                  <FaChevronRight className="text-gray-300 group-hover:text-brand-blue transition-colors shrink-0" />
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Legislation;