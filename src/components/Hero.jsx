import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from 'react-router-dom';

const Hero = () => {
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 10) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-gray-900 overflow-hidden">
      
      {/* 1. Arkaplan Videosu */}
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      >
        <source src="/videos/tanitim.mp4" type="video/mp4" />
      </video>
      
      {/* 2. Koyu Katman (Daha okunaklı olması için ayarlandı) */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-gray-900/90"></div>
      
      {/* 3. İçerik Alanı */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pt-10">
        <div className="container mx-auto px-4 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto space-y-8"
          >
            {/* BAŞLIK: Standart renklerle garanti gradient */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-2xl">
              <span className="text-white">Geleceği </span> <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-500">
                Birlikte Şekillendirelim
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-200 font-light drop-shadow-md max-w-3xl mx-auto leading-relaxed">
              Çankırı Karatekin Üniversitesi Teknokent ile fikirlerinizi girişime, girişimlerinizi başarıya dönüştürün.
            </p>
            
            {/* BUTONLAR: Standart Renkler (Red-600, Blue-600) */}
            <div className="flex flex-col md:flex-row gap-5 justify-center pt-8 items-center w-full px-4">
              
              {/* 1. Buton: Kırmızı */}
              <Link to="/basvuru" className="w-full md:w-auto">
                <button className="w-full md:w-auto min-w-[200px] bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-red-900/40 transform hover:-translate-y-1">
                  Proje Ön Başvurusu
                </button>
              </Link>

              {/* 2. Buton: Mavi */}
              <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdRKoIBM9XzD53x--OC8N_kDuOdD8QKfF0r1pLWxlPRRrqaEQ/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full md:w-auto"
              > 
                  <button className="w-full md:w-auto min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-900/40 transform hover:-translate-y-1">
                    Hakem Başvurusu
                  </button>
              </a>
    
              {/* 3. Buton: Gri/Koyu (Portal) */}
              <a href="https://argeportal.cakuteknokent.com.tr/" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                  <button className="w-full md:w-auto min-w-[200px] bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-gray-700/40 transform hover:-translate-y-1">
                    AR-GE Portal
                  </button>
              </a>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;