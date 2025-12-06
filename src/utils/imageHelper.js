export const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/150?text=Resim+Yok"; // Resim yoksa varsayılan
  if (path.startsWith("http")) return path; // Zaten tam link ise dokunma

  // .env dosyasındaki API adresini al (http://localhost:3000/api)
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  
  // '/api' kısmını atıp '/uploads' ekleyerek resim yolunu oluştur
  // Sonuç: http://localhost:3000/uploads/images/dosya.jpg
  const baseUrl = apiUrl.replace('/api', '');
  
  return `${baseUrl}/uploads/images/${path}`;
};