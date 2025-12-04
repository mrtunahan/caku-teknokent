import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from 'react-router-dom';

const Hero = () => {
  // Video elementine erişmek için bir referans oluşturuyoruz.
  const videoRef = useRef(null);

  // Videonun zamanı her güncellendiğinde çalışacak fonksiyon.
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      // Eğer videonun şu anki zamanı 10 saniyeyi geçerse...
      if (videoRef.current.currentTime >= 10) {
        // ...videoyu en başa (0. saniyeye) sar.
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-gray-900 overflow-hidden">
      
      {/* 1. Arkaplan Videosu (Yerel Dosya) */}
      <video 
        ref={videoRef} // Referansı buraya bağlıyoruz
        autoPlay 
        loop 
        muted // Sessiz olması için
        playsInline
        onTimeUpdate={handleTimeUpdate} // Zaman kontrol fonksiyonunu ekliyoruz
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      >
        {/* ÖNEMLİ: Videoyu 'public' klasörünün içine attığınızı varsayıyorum.
           Eğer 'public/videos/tanitim.mp4' yoluna koyduysanız aşağıdaki src kısmını şöyle yapın:
           src="/videos/tanitim.mp4"
        */}
        <source src="/videos/tanitim.mp4" type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      
      {/* 2. Koyu Katman (Overlay) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
      
      {/* 3. İçerik Alanı (Burası aynı kalıyor) */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pt-20">
        <div className="container mx-auto px-4 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-white space-y-6"
          >
            <h1 className="text-4xl md:text-7xl font-bold leading-tight tracking-tight drop-shadow-2xl">
              Geleceği <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-white">
                Birlikte Tasarlıyoruz
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-200 font-light drop-shadow-md max-w-2xl mx-auto">
              Çankırı Karatekin Üniversitesi Teknokent ile fikirlerinizi girişime, girişimlerinizi başarıya dönüştürün.
            </p>
            
            <div className="flex flex-col md:flex-row gap-5 justify-center pt-10 items-center w-full px-4">
            {/* Sol Buton: Kırmızı - Bizim yeni sayfaya gider */}
            <Link to="/basvuru" className="w-full md:w-auto">
            <button className="w-full md:w-auto min-w-[220px] bg-caku-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-red-900/50 transform hover:-translate-y-1 flex items-center justify-center">
            Proje Ön Başvurusu
            </button>
            </Link>

            {/* 2. Buton: Hakem Başvurusu (Mavi) */}
            <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdRKoIBM9XzD53x--OC8N_kDuOdD8QKfF0r1pLWxlPRRrqaEQ/viewform" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full md:w-auto"
            > 
                <button className="w-full md:w-auto min-w-[220px] bg-brand-blue hover:bg-blue-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-900/50 transform hover:-translate-y-1 flex items-center justify-center">
                Hakem Başvurusu
                </button>
            </a>
  
            {/* 3. Buton: AR-GE PORTAL (Şeffaf/Glass) */}
            <a href="https://argeportal.cakuteknokent.com.tr/" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <button className="w-full md:w-auto min-w-[220px] bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg border border-white/30 hover:shadow-white/20 transform hover:-translate-y-1 flex items-center justify-center">
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