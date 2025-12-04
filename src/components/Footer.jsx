import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaLinkedin, FaInstagram, FaChevronRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-6 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4">
        
        {/* ANA GRID ALANI (4 Sütunlu Yapı) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* 1. SÜTUN: Marka & Hakkında (4 birim genişlik) */}
          <div className="lg:col-span-4">
            <a href="/" className="inline-block mb-6">
                <img 
                src="https://cakuteknokent.com.tr/wp-content/uploads/logo-3.png" 
                alt="ÇAKÜ Teknokent" 
                // DEĞİŞİKLİK BURADA: 
                // hover:brightness-100 hover:invert-0 -> Üzerine gelince beyazlatma filtresini kaldırır
                className="h-12 w-auto brightness-0 invert opacity-90 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300"
                />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 pr-4">
              Çankırı Karatekin Üniversitesi Teknokent; girişimcilere, akademisyenlere ve sanayicilere AR-GE ve inovasyon odaklı projelerinde modern altyapı ve danışmanlık hizmetleri sunan bir teknoloji üssüdür.
            </p>
            {/* Sosyal Medya İkonları */}
            <div className="flex gap-3">
              <SocialIcon icon={<FaLinkedin />} link="https://www.linkedin.com/company/caku-teknokent/posts/?feedView=all" />
              <SocialIcon icon={<FaInstagram />} link="https://www.instagram.com/caku_teknokent/" />
              <SocialIcon icon={<FaFacebook />} link="#" />
            </div>
          </div>

          {/* 2. SÜTUN: Hızlı Linkler (2 birim genişlik) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              Kurumsal
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-caku-red rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              <FooterLink text="Hakkımızda" link="#" />
              <FooterLink text="Yönetim Kurulu" link="/yonetim-kurulu" />
              <FooterLink text="Mevzuat" link="/kanun-ve-yonetmelikler" />
              <FooterLink text="Haberler" link="#" />
              <FooterLink text="Ön Başvuru" link="/basvuru" />
            </ul>
          </div>

          {/* 3. SÜTUN: İletişim Bilgileri (3 birim genişlik) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6 relative inline-block">
              İletişim
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-caku-red rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-caku-red mt-1 shrink-0" />
                <span>Çankırı Karatekin Üniversitesi<br/>Uluyazı Kampüsü, Teknokent Binası<br/>Merkez / ÇANKIRI</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-caku-red shrink-0" />
                <a href="tel:+903762189500" className="hover:text-white transition-colors">+90 (376) 218 95 00</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-caku-red shrink-0" />
                <a href="mailto:info@cakuteknokent.com.tr" className="hover:text-white transition-colors">info@cakuteknokent.com.tr</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-caku-red font-bold text-xs border border-caku-red px-1 rounded">KEP</span>
                <span>cakuteknokent@hs01.kep.tr</span>
              </li>
            </ul>
          </div>

          {/* 4. SÜTUN: Mini Harita (3 birim genişlik) */}
          <div className="lg:col-span-3">
            <div className="h-full min-h-[200px] w-full rounded-xl overflow-hidden border border-gray-700 shadow-lg group relative">
              <iframe 
                src="https://maps.google.com/maps?q=Çankırı+Karatekin+Üniversitesi+Uluyazı+Kampüsü&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                className="grayscale group-hover:grayscale-0 transition-all duration-500 absolute inset-0"
              ></iframe>
              {/* Harita Üzeri Buton */}
              <a 
                href="https://goo.gl/maps/XYZ" // Buraya gerçek Google Maps linki gelebilir
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 bg-white text-brand-dark text-xs font-bold px-3 py-1.5 rounded shadow hover:bg-caku-red hover:text-white transition-colors z-10"
              >
                Haritada Aç
              </a>
            </div>
          </div>

        </div>

        {/* ALT TELİF ÇİZGİSİ */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Çankırı Teknokent A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</a>
             <span className="text-gray-700">|</span>
             <a href="#" className="hover:text-white transition-colors">Çerez Politikası</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

// YARDIMCI KÜÇÜK BİLEŞENLER (Kod tekrarını önlemek için)

const SocialIcon = ({ icon, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-caku-red hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ text, link }) => (
  <li>
    <a href={link} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
      <FaChevronRight className="text-[10px] text-caku-red opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
      <span className="transform group-hover:translate-x-1 transition-transform">{text}</span>
    </a>
  </li>
);

export default Footer;