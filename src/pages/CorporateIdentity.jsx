import PageHeader from "../components/PageHeader";
import { FaDownload } from "react-icons/fa";

const CorporateIdentity = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Kurumsal Kimlik" />
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        
        {/* Logolar Bölümü */}
        <h3 className="text-2xl font-bold text-brand-dark mb-6 border-l-4 border-caku-red pl-4">Logolarımız</h3>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Logo 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <img src="https://cakuteknokent.com.tr/wp-content/uploads/logo-3.png" alt="Renkli Logo" className="h-16 mx-auto mb-6" />
            <p className="text-gray-500 mb-4">Renkli Logo (Zemin Beyaz)</p>
            <button className="flex items-center justify-center gap-2 mx-auto text-caku-red font-semibold hover:underline">
              <FaDownload /> İndir (.png)
            </button>
          </div>
          {/* Logo 2 */}
          <div className="bg-brand-dark p-8 rounded-xl shadow-sm border border-gray-700 text-center">
            <img src="https://cakuteknokent.com.tr/wp-content/uploads/logo-3.png" alt="Beyaz Logo" className="h-16 mx-auto mb-6 brightness-0 invert" />
            <p className="text-gray-400 mb-4">Beyaz Logo (Zemin Koyu)</p>
            <button className="flex items-center justify-center gap-2 mx-auto text-white font-semibold hover:underline">
              <FaDownload /> İndir (.png)
            </button>
          </div>
        </div>

        {/* Renkler Bölümü */}
        <h3 className="text-2xl font-bold text-brand-dark mb-6 border-l-4 border-brand-blue pl-4">Kurumsal Renklerimiz</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="h-24 bg-brand-blue rounded-lg shadow-md"></div>
            <p className="font-bold text-gray-700">ÇAKÜ Mavisi</p>
            <p className="text-sm text-gray-500">HEX: #005696</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-caku-red rounded-lg shadow-md"></div>
            <p className="font-bold text-gray-700">ÇAKÜ Kırmızısı</p>
            <p className="text-sm text-gray-500">HEX: #E3000B</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-brand-dark rounded-lg shadow-md"></div>
            <p className="font-bold text-gray-700">Koyu Lacivert</p>
            <p className="text-sm text-gray-500">HEX: #003366</p>
          </div>
        </div>

      </div>
    </div>
  );
};
export default CorporateIdentity;