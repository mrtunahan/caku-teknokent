import PageHeader from "../components/PageHeader";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageHeader title="Hakkımızda" />
      <div className="container mx-auto px-4 py-12 max-w-4xl text-gray-700 leading-relaxed space-y-6">
        <p className="text-lg">
          <strong>Çankırı Karatekin Üniversitesi Teknokent</strong>, üniversite-sanayi işbirliğini geliştirmek, teknoloji tabanlı girişimciliği desteklemek ve bölgenin ekonomik kalkınmasına katkıda bulunmak amacıyla kurulmuştur.
        </p>
        <p>
          Bünyemizde yer alan AR-GE firmaları, kuluçka merkezimiz ve teknoloji transfer ofisimiz ile inovasyon ekosisteminin kalbinde yer alıyoruz. Girişimcilere modern ofis alanları, mentorluk desteği ve yatırım ağlarına erişim imkanı sunuyoruz.
        </p>
      </div>
    </div>
  );
};
export default About;