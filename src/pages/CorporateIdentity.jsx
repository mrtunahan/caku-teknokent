import { useEffect, useState } from "react";
import api from "../api";
import PageHeader from "../components/PageHeader";
import { FaIdCard } from "react-icons/fa";

const CorporateIdentity = () => {
  const [data, setData] = useState({ title: "Kurumsal Kimlik", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/pages/kimlik");
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

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            
            {/* Yükleniyor Durumu */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-400 font-medium">İçerik Yükleniyor...</span>
                </div>
            ) : (
                /* İçerik */
                <article className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto">
                   <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </article>
            )}
        </div>
      </div>
    </div>
  );
};
export default CorporateIdentity;