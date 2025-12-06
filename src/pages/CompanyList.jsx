import { useState, useEffect } from "react";
// api.js'i import ettiğinizden emin olun (önceki adımdan)
import api from "../api";
// Resim yardımcısını import ettiğinizden emin olun (önceki adımdan)
import { getImageUrl } from "../utils/imageHelper";
import PageHeader from "../components/PageHeader";
import { FaSearch, FaBuilding } from "react-icons/fa";
// YENİ: Skeleton bileşenini import ediyoruz
import Skeleton from "../components/Skeleton"; 

const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/companies");
        if (response.data.success) {
          setCompanies(response.data.data);
        }
      } catch (error) {
        console.error("Firmalar yüklenemedi:", error);
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.sector && company.sector.toLowerCase().includes(searchTerm.toLowerCase()))
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

        {/* --- DEĞİŞİKLİK BURADA BAŞLIYOR --- */}
        {loading ? (
          /* Yükleniyor Durumu: Skeleton Efekti */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 8 tane sahte kart oluşturup gösteriyoruz */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-8 border border-gray-100 flex flex-col items-center">
                {/* Logo Yeri */}
                <Skeleton className="w-24 h-24 rounded-full mb-6" />
                {/* İsim Satırı */}
                <Skeleton className="h-6 w-3/4 mb-3" />
                {/* Sektör Satırı */}
                <Skeleton className="h-4 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          /* Veriler Yüklendi ve Sonuç Var */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCompanies.map((comp) => (
              <div 
                key={comp.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center p-8 group hover:-translate-y-1"
              >
                <div className="h-24 w-full flex items-center justify-center mb-6 p-2">
                  {comp.logo_url ? (
                    <img 
                      src={getImageUrl(comp.logo_url)} 
                      alt={comp.name} 
                      className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                      onError={(e) => { 
                        e.target.style.display = 'none'; 
                        e.target.nextSibling.style.display = 'flex'; 
                      }} 
                    />
                  ) : null}
                  
                  <div 
                    className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center text-gray-300 text-2xl"
                    style={{ display: comp.logo_url ? 'none' : 'flex' }}
                  >
                    <FaBuilding />
                  </div>
                </div>

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
        {/* --- DEĞİŞİKLİK BURADA BİTİYOR --- */}

      </div>
    </div>
  );
};

export default CompanyList;