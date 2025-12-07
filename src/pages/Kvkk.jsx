import { useEffect, useState } from "react";
import api from "../api";
import PageHeader from "../components/PageHeader";
import { FaUserShield } from "react-icons/fa";

const Kvkk = () => {
  const [data, setData] = useState({ title: "Kişisel Verilerin Korunması", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/pages/kvkk");
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("Veri yüklenemedi", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title={data.title} />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* İkonlu Başlık Alanı (Opsiyonel) */}
        <div className="flex items-center gap-3 mb-6 opacity-60">
            <FaUserShield className="text-2xl text-brand-blue" />
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Yasal Bilgilendirme</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 md:p-14">
          {loading ? (
              <div className="space-y-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
          ) : (
              <div 
                  className="prose prose-slate max-w-none text-gray-700 leading-loose prose-headings:text-brand-dark prose-strong:text-brand-blue"
                  dangerouslySetInnerHTML={{ __html: data.content }} 
              />
          )}
        </div>
      </div>
    </div>
  );
};
export default Kvkk;