import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  FaLaptopCode, FaNetworkWired, FaBolt, FaIndustry, FaFlask, 
  FaCogs, FaHeartbeat, FaDraftingCompass, FaShieldAlt 
} from "react-icons/fa";

const Sectors = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    // Slider genişliğini hesapla (İçerik - Görünen Alan)
    if(carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const sectors = [
    { id: 1, title: "Yazılım", rate: 67.8, icon: <FaLaptopCode />, color: "#3b82f6" },
    { id: 2, title: "Bilgisayar & İletişim", rate: 10.2, icon: <FaNetworkWired />, color: "#06b6d4" },
    { id: 3, title: "Makine ve Teçhizat", rate: 5.1, icon: <FaCogs />, color: "#f97316" },
    { id: 4, title: "Savunma Sanayi", rate: 3.4, icon: <FaShieldAlt />, color: "#ef4444" },
    { id: 5, title: "Enerji", rate: 3.4, icon: <FaBolt />, color: "#eab308" },
    { id: 6, title: "İmalat Sanayi", rate: 1.7, icon: <FaIndustry />, color: "#64748b" },
    { id: 7, title: "Kimya", rate: 1.7, icon: <FaFlask />, color: "#22c55e" },
    { id: 8, title: "Medikal", rate: 1.7, icon: <FaHeartbeat />, color: "#ec4899" },
    { id: 9, title: "Müh. / Mimarlık", rate: 1.7, icon: <FaDraftingCompass />, color: "#a855f7" },
  ];

  return (
    // pt-32: Üstteki kutunun taşması için boşluk
    // pb-16: Alt boşluk
    <section className="pt-32 pb-16 bg-[#0f172a] relative overflow-hidden">
      
      {/* Arkaplan Efektleri */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-brand-blue rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-caku-red rounded-full blur-[100px]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.08 }}></div>
      </div>

      <div className="relative z-10 w-full">
        
        {/* Başlık Alanı (Ortalanmış) */}
        <div className="container mx-auto px-4 text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Firmaların Sektörel Dağılımı</span>
          </h2>
          <div className="w-16 h-1 bg-caku-red rounded mx-auto mb-3"></div>
          <p className="text-gray-400 text-sm font-light">
            Teknokent firmalarının faaliyet alanları.
          </p>
        </div>

        {/* --- TAM EKRAN SLIDER ALANI --- */}
        <div className="w-full flex justify-center"> {/* Slider'ı ortalamak için kapsayıcı */}
            <motion.div 
                ref={carousel} 
                className="cursor-grab overflow-hidden w-full max-w-[95%]" // %95 genişlik ile kenarlardan az boşluk bırak
            >
            <motion.div 
                drag="x" 
                dragConstraints={{ right: 0, left: -width }} 
                className="flex gap-4 py-4"
                // Eğer içerik ekrana sığıyorsa ortala, sığmıyorsa sola yasla
                style={{ justifyContent: width === 0 ? "center" : "flex-start" }}
            >
                {sectors.map((sector, index) => (
                <SectorCard key={sector.id} data={sector} index={index} />
                ))}
            </motion.div>
            </motion.div>
        </div>

      </div>
    </section>
  );
};

// KART BİLEŞENİ (Kompakt Tasarım)
const SectorCard = ({ data, index }) => {
  const radius = 22; // Biraz daha küçülttük
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (data.rate / 100) * circumference;

  return (
    <motion.div 
      className="relative group min-w-[140px] w-[140px]" // Kart genişliğini 140px'e indirdik (daha iyi sığması için)
    >
      <div 
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center h-full transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10"
        style={{ boxShadow: `0 0 0 1px inset ${data.color}15` }}
      >
        
        {/* Glow */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md" style={{ backgroundColor: data.color }}></div>

        {/* Grafik */}
        <div className="relative w-14 h-14 mb-2">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="28" cy="28" r={radius} stroke="#334155" strokeWidth="3" fill="transparent" className="opacity-40" />
            <motion.circle
              cx="28" cy="28" r={radius}
              stroke={data.color} strokeWidth="3" fill="transparent" strokeLinecap="round" strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: strokeDashoffset }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1 }}
              style={{ filter: `drop-shadow(0 0 2px ${data.color})` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-base" style={{ color: data.color }}>
            {data.icon}
          </div>
        </div>

        {/* Yazılar */}
        <div>
          <div className="text-base font-bold text-white tracking-wide">
            %{data.rate}
          </div>
          <div className="h-8 flex items-center justify-center w-full px-1">
             <p className="text-gray-400 text-[9px] font-semibold uppercase tracking-wide leading-tight line-clamp-2">
              {data.title}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Sectors;