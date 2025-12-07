import { useEffect, useState } from "react";
import api from "../api";
import PageHeader from "../components/PageHeader";

const Offices = () => {
  const [data, setData] = useState({ title: "Ofisler ve Altyapı", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/pages/ofisler");
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

      <div className="container mx-auto px-4 py-16 max-w-6xl">
         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 min-h-[400px]">
            {loading ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400 space-y-4">
                     <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
                     <p>Yükleniyor...</p>
                </div>
            ) : (
                <div 
                    className="prose prose-lg prose-blue max-w-none text-gray-700 prose-img:rounded-xl prose-img:shadow-md prose-img:w-full prose-img:object-cover"
                    dangerouslySetInnerHTML={{ __html: data.content }} 
                />
            )}
         </div>
      </div>
    </div>
  );
};
export default Offices;