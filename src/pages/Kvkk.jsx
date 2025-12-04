import PageHeader from "../components/PageHeader";

const Kvkk = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Kişisel Verilerin Korunması" />
      <div className="container mx-auto px-4 py-12 max-w-4xl bg-white p-10 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">KVKK Aydınlatma Metni</h3>
        <p className="text-gray-600 text-sm">
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, Çankırı Teknokent A.Ş. olarak, Veri Sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında işlemekteyiz...
          (Buraya uzun KVKK metni gelecek)
        </p>
      </div>
    </div>
  );
};
export default Kvkk;