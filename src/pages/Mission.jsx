import PageHeader from "../components/PageHeader";

const Mission = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Misyon & Vizyon" />
      <div className="container mx-auto px-4 py-12 max-w-5xl grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-caku-red">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Misyonumuz</h2>
          <p className="text-gray-600">Bilimsel araştırmaları ekonomik değere dönüştürerek, ulusal ve uluslararası rekabet gücünü artırmak; girişimcilik kültürünü yaygınlaştırmaktır.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-brand-blue">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Vizyonumuz</h2>
          <p className="text-gray-600">Bölgenin ve ülkenin teknoloji üssü olmak, sürdürülebilir kalkınma için inovasyonun öncüsü haline gelmektir.</p>
        </div>
      </div>
    </div>
  );
};
export default Mission;