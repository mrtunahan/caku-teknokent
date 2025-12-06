import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaChevronDown, FaLinkedin, FaInstagram } from 'react-icons/fa';
import GTranslate from "./GTranslate";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isSolid = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MENÜ YAPISI GÜNCELLENDİ ("Ortaklarımız" kaldırıldı)
  const menuItems = [
    { 
      name: 'KURUMSAL', 
      link: '#', 
      submenu: [
        { name: 'Hakkımızda', link: '/hakkimizda' },
        { name: 'Misyon – Vizyon- Hedeflerimiz', link: '/misyon-vizyon' },
        // { name: 'Ortaklarımız', link: '/ortaklarimiz' }, // BU SATIR SİLİNDİ
        { name: 'Yönetim', link: '/yonetim-kurulu' },
        { name: 'Paydaşlarımız', link: '/ortaklarimiz' },
        { name: 'Ofisler ve Altyapılar', link: '/ofisler' },
        { name: 'Kurumsal Kimlik', link: '/kurumsal-kimlik' },
        { name: 'Kişisel Verileri Koruma Kanunu', link: '/kvkk' }
      ]
    },
    { 
      name: 'MEVZUAT', 
      link: '/kanun-ve-yonetmelikler',
      submenu: [
        { name: 'Kanunlar', link: '/kanun-ve-yonetmelikler#kanunlar' },
        { name: 'Yönetmelikler', link: '/kanun-ve-yonetmelikler#yonetmelikler' },
        { name: 'Yönergeler', link: '/kanun-ve-yonetmelikler#yonergeler' }
      ]
    },
    { 
      name: 'FİRMALAR', 
      link: '#',
      submenu: [
        { name: 'Firma Listesi', link: '/firma-listesi' },
        { name: 'Firma Haberleri', link: '/firma-haberleri' }
      ] 
    },
    { name: 'KARİYER', link: '/kariyer' },
    { name: 'İLETİŞİM', link: '/iletisim' },
  ];

  const handleLanguageChange = (langCode) => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isSolid 
          ? "bg-white text-gray-800 shadow-lg py-2"
          : "bg-transparent text-white py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-4">
             <a href="https://www.milliteknolojiakademisi.gov.tr/" target="_blank" rel="noopener noreferrer">
               <img 
                 src="/logos/tc1.png" 
                 alt="Milli Teknoloji Hamlesi" 
                 className={`h-12 w-auto transition-all duration-300 ${isSolid ? "" : "brightness-0 invert"}`}
               />
             </a>
             <div className={`hidden md:block h-12 w-px transition-colors duration-300 ${isSolid ? 'bg-gray-800' : 'bg-white/50'}`}></div>
             <a href="/">
               <img 
                 src="https://cakuteknokent.com.tr/wp-content/uploads/logo-3.png" 
                 alt="ÇAKÜ Teknokent" 
                 className={`h-12 w-auto transition-all duration-300 ${isSolid ? "" : "brightness-0 invert"}`}
               />
             </a>
        </div>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <a 
                href={item.link} 
                className={`flex items-center gap-1 font-bold text-sm tracking-wide py-4 transition-colors ${
                  isSolid ? 'hover:text-caku-red' : 'hover:text-brand-light'
                }`}
              >
                {item.name}
                {item.submenu && <FaChevronDown className="text-xs opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
              </a>

              {/* DROPDOWN */}
              {item.submenu && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-b-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 border-t-4 border-caku-red overflow-hidden">
                  {item.submenu.map((sub, subIndex) => (
                    <a 
                      key={subIndex} 
                      href={sub.link} 
                      className="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-caku-red hover:pl-8 transition-all border-b border-gray-100 last:border-none"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <FaSearch className={`cursor-pointer transition-colors ${isSolid ? 'text-gray-400 hover:text-caku-red' : 'text-white hover:text-brand-light'}`} />

          <div className={`flex items-center gap-2 text-xs font-bold tracking-wider ${isSolid ? 'text-gray-600' : 'text-white'}`}>
              <button onClick={() => handleLanguageChange('tr')} className="hover:text-caku-red transition-colors">TR</button>
              <span className="opacity-50">|</span>
              <button onClick={() => handleLanguageChange('en')} className="hover:text-caku-red transition-colors">EN</button>
              <span className="opacity-50">|</span>
              <button onClick={() => handleLanguageChange('ar')} className="hover:text-caku-red transition-colors">AR</button>
          </div>
          
          <GTranslate />

          <div className={`h-6 w-px ${isSolid ? 'bg-gray-300' : 'bg-white/30'}`}></div>
          
          <div className={`flex gap-4 text-lg ${isSolid ? 'text-gray-500' : 'text-white'}`}>
              <a href="https://www.linkedin.com/company/caku-teknokent/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:text-[#0077b5] cursor-pointer transition-colors"/>
              </a>
              <a href="https://www.instagram.com/caku_teknokent/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-[#E1306C] cursor-pointer transition-colors"/>
              </a>
          </div>
        </div>

        {/* MOBİL BUTON */}
        <button 
          className={`lg:hidden text-2xl ${isSolid ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBİL MENÜ */}
      {isOpen && (
        <div className="lg:hidden bg-white absolute top-full left-0 w-full shadow-xl border-t h-screen overflow-y-auto pb-20 text-gray-800">
          <div className="flex flex-col p-6 space-y-4">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a href={item.link} className="block text-lg font-bold py-2 border-b border-gray-100">
                  {item.name}
                </a>
                {item.submenu && (
                  <div className="pl-4 mt-2 space-y-2 bg-gray-50 p-3 rounded-lg">
                    {item.submenu.map((sub, subIndex) => (
                      <a key={subIndex} href={sub.link} className="block text-sm text-gray-500 hover:text-caku-red">
                        • {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;