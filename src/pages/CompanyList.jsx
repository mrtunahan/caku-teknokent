import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaSearch, FaBuilding } from "react-icons/fa";

const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Tüm Firmaların Listesi (References.jsx dosyasındaki verilerle eşitlendi)
  const companies = [
    { id: 1, name: "LST Yazılım", sector: "Yazılım & Bilişim", logo: "/logos/lst.jpeg" },
    { id: 2, name: "BiSoft Bilgi Teknolojileri", sector: "Bilişim", logo: "/logos/bisoft.png" },
    { id: 3, name: "Ortana Elektronik", sector: "Elektronik & ITS", logo: "/logos/Ortana-logo.jpg" },
    { id: 4, name: "Spectrum Consulting", sector: "Danışmanlık", logo: "/logos/spectrum.png" },
    { id: 5, name: "3D Robotik Otomasyon", sector: "Robotik & Otomasyon", logo: "/logos/3D-Robotik-Logo.png" },
    { id: 6, name: "Bilişim School", sector: "Eğitim Teknolojileri", logo: "/logos/bilisim_school.png" },
    { id: 7, name: "Biveri Veri Madenciliği", sector: "Veri Analitiği", logo: "/logos/Biveri-logo.png" },
    { id: 8, name: "Yurtsemen", sector: "Yazılım", logo: "/logos/yurtsemen.png" },
    { id: 9, name: "StockMount", sector: "E-Ticaret Yazılımları", logo: "/logos/stochmount.png" },
    { id: 10, name: "ProMIS", sector: "Yazılım Çözümleri", logo: "/logos/promis.png" },
    { id: 11, name: "Pelit", sector: "Ar-Ge", logo: "/logos/pelit.png" },
    { id: 12, name: "Neophran", sector: "Yazılım", logo: "/logos/neophran.png" },
    { id: 13, name: "Miva", sector: "Medya & Yazılım", logo: "/logos/miva.png" },
    { id: 14, name: "Metis Bilişim", sector: "Bilişim Teknolojileri", logo: "/logos/metis_bilisim.png" },
    { id: 15, name: "Med Mar", sector: "Medikal Teknoloji", logo: "/logos/med_mar.png" },
    { id: 16, name: "Lobi Bilişim", sector: "Yazılım", logo: "/logos/lobi_bilisim.png" },
    { id: 17, name: "KhanTech", sector: "Savunma & Teknoloji", logo: "khan_tech.png" },
    { id: 18, name: "ivvo", sector: "Yazılım", logo: "/logos/ivvo.png" },
  ];

  // Arama filtresi fonksiyonu
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Firma Listesi" />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* Arama Kutusu */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Firma adı veya sektör ara..." 
              className="w-full p-5 pl-14 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-caku-red focus:border-transparent transition-all text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          </div>
          <p className="text-center text-sm text-gray-400 mt-3">
            Toplam <span className="font-bold text-caku-red">{filteredCompanies.length}</span> firma listeleniyor.
          </p>
        </div>

        {/* Firma Listesi (Grid) */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCompanies.map((comp) => (
              <div 
                key={comp.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center p-8 group hover:-translate-y-1"
              >
                {/* Logo Alanı */}
                <div className="h-24 w-full flex items-center justify-center mb-6 p-2">
                  <img 
                    src={comp.logo} 
                    alt={comp.name} 
                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                    onError={(e) => { 
                      e.target.style.display = 'none'; // Resim yoksa gizle
                      e.target.nextSibling.style.display = 'flex'; // İkonu göster
                    }} 
                  />
                  {/* Yedek İkon (Resim yüklenmezse görünür) */}
                  <div className="hidden w-16 h-16 bg-gray-100 rounded-full items-center justify-center text-gray-300 text-2xl">
                    <FaBuilding />
                  </div>
                </div>

                {/* Firma Bilgileri */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-brand-blue transition-colors">
                  {comp.name}
                </h3>
                <span className="inline-block bg-blue-50 text-brand-blue text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                  {comp.sector}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* Arama Sonucu Bulunamadı */
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Aradığınız kriterlere uygun firma bulunamadı.</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-caku-red font-semibold hover:underline"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompanyList;