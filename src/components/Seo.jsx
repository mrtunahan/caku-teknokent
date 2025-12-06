import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, keywords }) => {
  return (
    <Helmet>
      {/* Sayfa Başlığı */}
      <title>{title} | ÇAKÜ Teknokent</title>
      
      {/* Meta Açıklaması (Google'da çıkan gri yazı) */}
      <meta name="description" content={description} />
      
      {/* Anahtar Kelimeler */}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Sosyal Medya Kartları (Open Graph) - Opsiyonel ama önerilir */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default Seo;