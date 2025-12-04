import { useRef, useEffect } from "react";
import { FaBuilding, FaUsers, FaProjectDiagram, FaCheckDouble } from "react-icons/fa";
import { useInView, animate } from "framer-motion";

// Sadece sayma işini yapan özel mini-bileşen
const Counter = ({ to }) => {
  const nodeRef = useRef();
  // useInView: Eleman ekranda göründü mü? (once: true -> sadece 1 kere çalışsın)
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const node = nodeRef.current;
    
    if (inView) {
      // animate fonksiyonu framer-motion'dan gelir
      const controls = animate(0, to, {
        duration: 2.5, // Kaç saniyede saysın? (2.5 saniye)
        ease: "easeOut", // Yavaşlayarak dursun
        onUpdate(value) {
          // Her adımda sayıyı güncelle ve yanına + koy
          node.textContent = Math.floor(value) + "+";
        },
      });

      return () => controls.stop();
    }
  }, [to, inView]);

  return <span ref={nodeRef} className="text-4xl font-bold text-brand-dark mb-2 block">0+</span>;
};

const Stats = () => {
  // Verileri "string" yerine "number" (sayı) olarak güncelledik
  const stats = [
    { id: 1, title: "Aktif Firma", count: 59, icon: <FaBuilding /> },
    { id: 2, title: "Aktif Çalışan", count: 446, icon: <FaUsers /> },
    { id: 3, title: "Yürütülen Proje", count: 71, icon: <FaProjectDiagram /> },
    { id: 4, title: "Tamamlanan Proje", count: 7, icon: <FaCheckDouble /> },
  ];

  return (
    // DÜZELTME: -mt-16 (yukarı taş) ve -mb-16 (aşağı taş) ekledik. z-30 ile en üste aldık.
    <div className="relative z-30 container mx-auto px-4 -mt-16 -mb-16">
      <div className="bg-white rounded-lg shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 p-10 border-b-4 border-caku-red">
        
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center justify-center text-center group">
            <div className="text-5xl text-brand-blue mb-4 transform group-hover:scale-110 group-hover:text-caku-red transition-all duration-300">
              {stat.icon}
            </div>
            <Counter to={stat.count} />
            <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
              {stat.title}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Stats;