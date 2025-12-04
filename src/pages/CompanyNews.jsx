import PageHeader from "../components/PageHeader";

const CompanyNews = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Firmalardan Haberler" />
      <div className="container mx-auto px-4 py-16 max-w-5xl grid md:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">LST Yazılım</span>
            <h3 className="text-lg font-bold mt-2">Yeni E-Ticaret Modülü Yayında</h3>
            <p className="text-gray-600 text-sm mt-2">LST Yazılım, geliştirdiği yeni yapay zeka destekli modül ile satışları artırmayı hedefliyor.</p>
         </div>
         <div className="bg-white p-6 rounded-lg shadow border-t-4 border-blue-500">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">BiSoft</span>
            <h3 className="text-lg font-bold mt-2">Uluslararası Fuarda Büyük İlgi</h3>
            <p className="text-gray-600 text-sm mt-2">BiSoft, Dubai'de düzenlenen teknoloji fuarında yeni ürünlerini tanıttı.</p>
         </div>
      </div>
    </div>
  );
};
export default CompanyNews;