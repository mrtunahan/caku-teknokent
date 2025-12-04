import { motion } from "framer-motion";
import { FaFilePdf, FaExternalLinkAlt, FaHome, FaChevronRight } from "react-icons/fa";

const Legislation = () => {
  // Linkler ve Başlıklar
  const laws = [
    {
      id: 1,
      title: "4691 Sayılı Teknoloji Geliştirme Bölgeleri Kanunu",
      link: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.4691.pdf",
      type: "pdf"
    },
    {
      id: 2,
      title: "Teknoloji Geliştirme Bölgeleri Uygulama Yönetmeliği",
      link: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=22742&MevzuatTur=7&MevzuatTertip=5",
      type: "link"
    },
    {
      id: 3,
      title: "5746 Sayılı Ar-Ge Faaliyetlerinin Desteklenmesi Hakkında Kanun",
      link: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.5746.pdf",
      type: "pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. ÜST HERO BÖLÜMÜ (Resimli Başlık) */}
      <div className="relative h-[400px] w-full bg-gray-900 overflow-hidden flex items-center justify-center">
        {/* Arkaplan Resmi */}
        <img 
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop" 
          alt="Mevzuat Arkaplan" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

        {/* Başlık Metni */}
        <div className="relative z-10 text-center px-4 mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Kanun ve Yönetmelikler
          </motion.h1>
          
          {/* Breadcrumb (Yol Haritası) */}
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm md:text-base">
            <a href="/" className="hover:text-white flex items-center gap-1 transition-colors"><FaHome /> Anasayfa</a>
            <FaChevronRight className="text-xs opacity-50" />
            <span className="text-white font-semibold">Kanun ve Yönetmelikler</span>
          </div>
        </div>
      </div>

      {/* 2. LİSTE BÖLÜMÜ (3 Parça) */}
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <div className="flex flex-col gap-6">
          {laws.map((item, index) => (
            <motion.a 
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border-l-8 border-brand-blue rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 flex items-center justify-between overflow-hidden"
            >
              {/* Hover Efekti (Arkaplan Dolgusu) */}
              <div className="absolute inset-0 bg-brand-blue/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>

              <div className="relative z-10 flex items-center gap-4 md:gap-6">
                 {/* İkon */}
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    {item.type === "pdf" ? <FaFilePdf className="text-xl" /> : <FaExternalLinkAlt className="text-lg" />}
                 </div>
                 
                 {/* Yazı */}
                 <span className="text-lg md:text-xl font-bold text-gray-700 group-hover:text-brand-blue transition-colors">
                   {item.title}
                 </span>
              </div>

              {/* Sağ Ok İkonu */}
              <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                 <FaChevronRight className="text-brand-blue" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Legislation;