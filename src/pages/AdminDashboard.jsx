import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { 
  FaSignOutAlt, FaFileDownload, FaProjectDiagram, FaBriefcase, FaNewspaper, FaBuilding, FaEnvelope,
  FaTrash, FaEye, FaCheck, FaTimes, FaTimesCircle, FaPlus, FaEdit, FaSearch, FaCog, FaBars
} from "react-icons/fa";

// Grafikler
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [careers, setCareers] = useState([]);
  const [news, setNews] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // MODAL STATES
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalType, setModalType] = useState(null); 
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState(null);
  const [newsForm, setNewsForm] = useState({ title: '', category: 'haberler', date: '', content: '' });
  const [newsFile, setNewsFile] = useState(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(null);
  const [companyForm, setCompanyForm] = useState({ name: '', sector: '' });
  const [companyLogo, setCompanyLogo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { navigate("/admin"); return; }
    fetchData(token);
  }, [navigate]);

  const fetchData = async (token) => {
    const authToken = token || localStorage.getItem("adminToken");
    const config = { headers: { Authorization: `Bearer ${authToken}` } };
    try {
      const [projectsRes, careersRes, newsRes, companiesRes, messagesRes] = await Promise.all([
        axios.get("http://localhost:3000/api/applications?limit=100", config),
        axios.get("http://localhost:3000/api/career/list", config),
        axios.get("http://localhost:3000/api/news", config),
        axios.get("http://localhost:3000/api/companies", config),
        axios.get("http://localhost:3000/api/contact", config)
      ]);
      if (projectsRes.data.success) setProjects(projectsRes.data.data);
      if (careersRes.data.success) setCareers(careersRes.data.data);
      if (newsRes.data.success) setNews(newsRes.data.data);
      if (companiesRes.data.success) setCompanies(companiesRes.data.data);
      if (messagesRes.data.success) setMessages(messagesRes.data.data);
    } catch (error) { if (error.response?.status === 401) handleLogout(); } 
    finally { setLoading(false); }
  };

  // --- YENİ: AYLIK PROJE VERİLERİNİ HESAPLA ---
  const getMonthlyProjectCounts = () => {
    const counts = new Array(12).fill(0); // [0,0,0,0,0,0,0,0,0,0,0,0]
    const currentYear = new Date().getFullYear();

    projects.forEach(p => {
      const date = new Date(p.basvuru_tarihi);
      // Sadece bu yılın verilerini al (Opsiyonel, isterseniz kaldırabilirsiniz)
      if (date.getFullYear() === currentYear) {
         const month = date.getMonth(); // 0 = Ocak, 11 = Aralık
         counts[month]++;
      }
    });
    return counts;
  };

  const monthlyData = {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    datasets: [
      {
        label: 'Proje Başvurusu',
        data: getMonthlyProjectCounts(),
        backgroundColor: '#005696', // ÇAKÜ Mavisi
        borderRadius: 6, // Yuvarlak köşeler
        barThickness: 20, // İnce ve zarif barlar
        hoverBackgroundColor: '#003366',
      }
    ]
  };

  // GRAFİK AYARLARI (Modern Görünüm İçin)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Üstteki kutucuğu gizle
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false }, // Dikey çizgileri kaldır
        ticks: { color: '#64748b', font: { size: 12 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#f1f5f9', borderDash: [5, 5] }, // Yatay çizgileri kesik yap
        ticks: { stepSize: 1, color: '#64748b' },
        border: { display: false }
      }
    }
  };

  const applicationsData = {
    labels: ['Projeler', 'İş', 'Staj'],
    datasets: [{
      data: [
        projects.length,
        careers.filter(c => c.basvuru_tipi === 'is').length,
        careers.filter(c => c.basvuru_tipi === 'staj').length,
      ],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#f97316'],
      borderWidth: 0,
      hoverOffset: 10
    }],
  };

  const doughnutOptions = {
    cutout: '75%', // Ortası boş modern halka
    plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, color: '#64748b' } }
    }
  };

  // --- FİLTRELEME ---
  const filteredProjects = projects.filter(item => item.adiniz_soyadiniz.toLowerCase().includes(searchTerm.toLowerCase()) || item.proje_adi.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredCareers = careers.filter(item => item.ad_soyad.toLowerCase().includes(searchTerm.toLowerCase()) || item.firma_adi.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredNews = news.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredCompanies = companies.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredMessages = messages.filter(item => item.ad_soyad.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase()));

  // --- İŞLEMLER (Aynı Kalıyor) ---
  // (Kodun kısalığı için buradaki handle fonksiyonlarını önceki kodunuzdan koruyun veya kopyalayın)
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append('title', newsForm.title);
    formData.append('category', newsForm.category);
    formData.append('date', newsForm.date);
    formData.append('content', newsForm.content);
    if (newsFile) formData.append('image', newsFile);
    try {
        let res;
        const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
        if (isEditingNews) {
            res = await axios.put(`http://localhost:3000/api/news/${currentNewsId}`, formData, config);
            setNews(news.map(n => n.id === currentNewsId ? res.data.data : n));
            alert("Haber güncellendi!");
        } else {
            res = await axios.post("http://localhost:3000/api/news", formData, config);
            setNews([res.data.data, ...news]);
            alert("Haber eklendi!");
        }
        setShowNewsModal(false);
    } catch (error) { alert("İşlem hatası!"); }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append('name', companyForm.name);
    formData.append('sector', companyForm.sector);
    if (companyLogo) formData.append('logo', companyLogo);
    try {
        let res;
        const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
        if (isEditingCompany) {
            res = await axios.put(`http://localhost:3000/api/companies/${currentCompanyId}`, formData, config);
            setCompanies(companies.map(c => c.id === currentCompanyId ? res.data.data : c));
            alert("Firma güncellendi!");
        } else {
            res = await axios.post("http://localhost:3000/api/companies", formData, config);
            setCompanies([...companies, res.data.data]);
            alert("Firma eklendi!");
        }
        setShowCompanyModal(false);
    } catch (error) { alert("Hata!"); }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    const token = localStorage.getItem("adminToken");
    let url = '';
    if (type === 'project') url = `http://localhost:3000/api/applications/${id}`;
    else if (type === 'career') url = `http://localhost:3000/api/career/${id}`;
    else if (type === 'news') url = `http://localhost:3000/api/news/${id}`;
    else if (type === 'company') url = `http://localhost:3000/api/companies/${id}`;
    else if (type === 'message') url = `http://localhost:3000/api/contact/${id}`;

    try {
      await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
      if (type === 'project') setProjects(prev => prev.filter(p => p.id !== id));
      else if (type === 'career') setCareers(prev => prev.filter(c => c.id !== id));
      else if (type === 'news') setNews(prev => prev.filter(n => n.id !== id));
      else if (type === 'company') setCompanies(prev => prev.filter(c => c.id !== id));
      else if (type === 'message') setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedApp?.id === id) closeModal();
    } catch (error) { alert("Silme başarısız."); }
  };

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.patch(`http://localhost:3000/api/applications/${id}/status`, { basvuru_durumu: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      setProjects(prev => prev.map(p => p.id === id ? { ...p, basvuru_durumu: newStatus } : p));
      if (selectedApp && selectedApp.id === id) setSelectedApp(prev => ({ ...prev, basvuru_durumu: newStatus }));
    } catch (error) { alert("Hata!"); }
  };

  // Helper Funcs
  const openNewsModal = (item = null) => { if (item) { setIsEditingNews(true); setCurrentNewsId(item.id); setNewsForm({ title: item.title, category: item.category, date: item.date, content: item.content || '' }); } else { setIsEditingNews(false); setCurrentNewsId(null); setNewsForm({ title: '', category: 'haberler', date: '', content: '' }); } setNewsFile(null); setShowNewsModal(true); };
  const openCompanyModal = (item = null) => { if (item) { setIsEditingCompany(true); setCurrentCompanyId(item.id); setCompanyForm({ name: item.name, sector: item.sector }); } else { setIsEditingCompany(false); setCurrentCompanyId(null); setCompanyForm({ name: '', sector: '' }); } setCompanyLogo(null); setShowCompanyModal(true); };
  const handleLogout = () => { localStorage.removeItem("adminToken"); localStorage.removeItem("adminUser"); navigate("/admin"); };
  const openModal = (app, type) => { setSelectedApp(app); setModalType(type); };
  const closeModal = () => { setSelectedApp(null); setModalType(null); };
  const getFileUrl = (folder, filename) => `http://localhost:3000/uploads/${folder}/${filename}`;
  const truncateText = (text, limit = 140) => { if (!text) return ""; if (text.length <= limit) return text; return text.substring(0, limit) + "..."; };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500 font-medium">Panel Yükleniyor...</div>;

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`bg-[#1e293b] text-white flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <h1 className={`font-bold text-xl tracking-wider ${!isSidebarOpen && 'hidden'}`}>TEKNOKENT</h1>
          {!isSidebarOpen && <span className="font-bold text-xl">T</span>}
        </div>
        <nav className="flex-1 py-6 px-3 space-y-2">
          <SidebarItem active={activeTab === "projects"} onClick={() => setActiveTab("projects")} icon={<FaProjectDiagram />} label="Projeler" isOpen={isSidebarOpen} />
          <SidebarItem active={activeTab === "careers"} onClick={() => setActiveTab("careers")} icon={<FaBriefcase />} label="Kariyer" isOpen={isSidebarOpen} />
          <SidebarItem active={activeTab === "news"} onClick={() => setActiveTab("news")} icon={<FaNewspaper />} label="Haberler" isOpen={isSidebarOpen} />
          <SidebarItem active={activeTab === "companies"} onClick={() => setActiveTab("companies")} icon={<FaBuilding />} label="Firmalar" isOpen={isSidebarOpen} />
          <SidebarItem active={activeTab === "messages"} onClick={() => setActiveTab("messages")} icon={<FaEnvelope />} label="Mesajlar" isOpen={isSidebarOpen} />
        </nav>
        <div className="p-3 border-t border-gray-700 space-y-2">
          <Link to="/admin/profile" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white">
            <FaCog className="text-lg" />
            <span className={`${!isSidebarOpen && 'hidden'}`}>Ayarlar / Şifre</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-600/20 text-red-400 hover:text-red-200 transition-colors">
            <FaSignOutAlt className="text-lg" />
            <span className={`${!isSidebarOpen && 'hidden'}`}>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* ANA İÇERİK */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 border-b border-gray-200">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-brand-blue transition"><FaBars className="text-xl" /></button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Ara..." className="pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 w-64 transition-all border border-gray-200" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="w-8 h-8 bg-brand-blue rounded-full text-white flex items-center justify-center font-bold shadow-md">A</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          
          {/* İSTATİSTİK KARTLARI */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            <StatCard title="Toplam Proje" count={projects.length} icon={<FaProjectDiagram />} color="blue" />
            <StatCard title="Kariyer Başvurusu" count={careers.length} icon={<FaBriefcase />} color="purple" />
            <StatCard title="Haber & Duyuru" count={news.length} icon={<FaNewspaper />} color="orange" />
            <StatCard title="Firma Sayısı" count={companies.length} icon={<FaBuilding />} color="emerald" />
            <StatCard title="Gelen Mesaj" count={messages.length} icon={<FaEnvelope />} color="pink" />
          </div>

          {/* YENİ GRAFİK ALANI (DÜZELTİLMİŞ & KOMPAKT) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* SOL: AYLIK PROJE GRAFİĞİ */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 lg:col-span-2 flex flex-col h-64"> {/* h-64 sabit yükseklik */}
               <div className="flex justify-between items-center mb-2 shrink-0">
                 <div>
                    <h3 className="font-bold text-gray-800 text-sm">Aylık Proje Başvuruları</h3>
                    <p className="text-xs text-gray-400">Bu yılki başvuru trendi</p>
                 </div>
                 <div className="p-1.5 bg-blue-50 text-brand-blue rounded-lg text-xs"><FaProjectDiagram /></div>
               </div>
               
               {/* Grafik Konteyneri - flex-1 ile kalan tüm alanı kaplar */}
               <div className="flex-1 w-full relative min-h-0"> 
                 <Bar 
                    data={monthlyData} 
                    options={{
                        ...chartOptions, 
                        maintainAspectRatio: false, // Kapsayıcıya uyması için zorunlu
                        responsive: true
                    }} 
                 />
               </div>
            </div>

            {/* SAĞ: BAŞVURU DAĞILIMI */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col h-64"> {/* h-64 sabit yükseklik */}
               <div className="mb-2 shrink-0">
                   <h3 className="font-bold text-gray-800 text-sm">Proje Başvurularının Sektörel Dağılımı</h3>
                   <p className="text-xs text-gray-400">Kategorilere göre oranlar</p>
               </div>
               
               {/* Grafik Konteyneri - flex-1 ile kalan tüm alanı kaplar */}
               <div className="flex-1 w-full relative min-h-0 flex items-center justify-center">
                 <Doughnut 
                    data={applicationsData} 
                    options={{
                        cutout: '70%', 
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            legend: { 
                                position: 'right', // Efsaneyi sağa alarak alanı verimli kullan
                                labels: { usePointStyle: true, boxWidth: 6, font: { size: 11 }, padding: 15 } 
                            }
                        }
                    }} 
                 />
               </div>
            </div>
          </div>

          {/* BAŞLIK VE BUTONLAR */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'projects' && 'Proje Başvuruları'}
              {activeTab === 'careers' && 'Kariyer Başvuruları'}
              {activeTab === 'news' && 'Haber Yönetimi'}
              {activeTab === 'companies' && 'Firma Yönetimi'}
              {activeTab === 'messages' && 'Gelen Mesajlar'}
            </h2>
            {activeTab === 'news' && <AddBtn onClick={() => openNewsModal()} label="Haber Ekle" />}
            {activeTab === 'companies' && <AddBtn onClick={() => openCompanyModal()} label="Firma Ekle" />}
          </div>

          {/* --- TABLOLAR --- */}
          {/* (Tablo kodları aynı kalıyor, yer kaplamaması için özet geçiyorum. Lütfen önceki kodunuzdaki tablo kısımlarını buraya yapıştırın veya koruyun) */}
          
          {/* Sadece PROJE tablosunu örnek olarak koyuyorum, diğerlerini de altına eklemelisiniz */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                {/* ... TABLO İÇERİĞİ BURAYA GELECEK (Switch case veya koşullu render ile) ... */}
                {/* Burada activeTab kontrolü ile ilgili tabloyu render etmelisiniz */}
                <RenderTable 
                   activeTab={activeTab} 
                   projects={filteredProjects} 
                   careers={filteredCareers} 
                   news={filteredNews} 
                   companies={filteredCompanies} 
                   messages={filteredMessages}
                   onAction={{ handleDelete, openModal, openNewsModal, openCompanyModal, getFileUrl }}
                />
            </div>
          </div>

        </main>
      </div>

      {/* ... MODALLAR ... (Aynı kalıyor) */}
      {/* Modal kodlarını buraya ekleyin */}
      
      {/* (Modal kodlarını önceki koddan buraya kopyalayın) */}
       {/* Detay Modalı */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative p-8">
            <button onClick={closeModal} className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-600"><FaTimesCircle /></button>
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">{modalType === 'project' ? 'Proje Detayı' : modalType === 'career' ? 'Kariyer Detayı' : 'Mesaj Detayı'}</h2>
            <div className="space-y-3">
                <DetailRow label="Ad Soyad" value={selectedApp.adiniz_soyadiniz || selectedApp.ad_soyad} />
                <DetailRow label="E-posta" value={selectedApp.email} />
                {modalType === 'project' && (
                    <>
                        <DetailRow label="Proje" value={selectedApp.proje_adi} />
                        <div className="bg-gray-50 p-4 rounded-lg mt-2 text-sm leading-relaxed border border-gray-200">{selectedApp.proje_ozeti}</div>
                        <div className="mt-6 flex gap-3">
                            <button onClick={() => handleStatusChange(selectedApp.id, 'onaylandi')} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 shadow-md">Onayla</button>
                            <button onClick={() => handleStatusChange(selectedApp.id, 'reddedildi')} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 shadow-md">Reddet</button>
                        </div>
                    </>
                )}
                {/* ... Diğer modal tipleri ... */}
            </div>
          </div>
        </div>
      )}
      
      {/* Haber ve Firma Modalları da buraya... */}

    </div>
  );
};

// Tabloyu render eden yardımcı bileşen (Kod temizliği için)
const RenderTable = ({ activeTab, projects, careers, news, companies, messages, onAction }) => {
    const { handleDelete, openModal, openNewsModal, openCompanyModal, getFileUrl } = onAction;
    
    if (activeTab === 'projects') return (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs"><tr><th className="px-6 py-4">Tarih</th><th className="px-6 py-4">Ad Soyad</th><th className="px-6 py-4">Proje</th><th className="px-6 py-4">Durum</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
                {projects.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-500">{new Date(item.basvuru_tarihi).toLocaleDateString("tr-TR")}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{item.adiniz_soyadiniz}</td>
                        <td className="px-6 py-4 text-gray-600">{item.proje_adi}</td>
                        <td className="px-6 py-4"><StatusBadge status={item.basvuru_durumu} /></td>
                        <td className="px-6 py-4 text-right space-x-2">
                            <TableAction onClick={() => openModal(item, 'project')} icon={<FaEye />} color="blue" />
                            <TableAction onClick={() => handleDelete(item.id, 'project')} icon={<FaTrash />} color="red" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
    // Diğer tabloları da benzer mantıkla buraya ekleyebilirsiniz (Kariyer, Haber, Firma, Mesaj)
    // Örnek Kariyer:
    if (activeTab === 'careers') return (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs"><tr><th className="px-6 py-4">Tarih</th><th className="px-6 py-4">Ad Soyad</th><th className="px-6 py-4">Tip</th><th className="px-6 py-4">CV</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
                {careers.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-500">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{item.ad_soyad}</td>
                        <td className="px-6 py-4 text-gray-600">{item.basvuru_tipi}</td>
                        <td className="px-6 py-4">{item.cv_dosya_yolu ? <a href={getFileUrl('cv', item.cv_dosya_yolu)} target="_blank" className="text-blue-600 hover:underline font-bold text-xs">İNDİR</a> : '-'}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                             <TableAction onClick={() => openModal(item, 'career')} icon={<FaEye />} color="blue" />
                             <TableAction onClick={() => handleDelete(item.id, 'career')} icon={<FaTrash />} color="red" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
    
    // Diğerleri (Haber, Firma, Mesaj) için de aynı yapı...
    // Haber
    if (activeTab === 'news') return (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs"><tr><th className="px-6 py-4">Görsel</th><th className="px-6 py-4">Başlık</th><th className="px-6 py-4">Tarih</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
                {news.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4"><img src={item.image_url ? getFileUrl('images', item.image_url) : 'https://via.placeholder.com/50'} className="w-10 h-10 object-cover rounded-lg" /></td>
                        <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                        <td className="px-6 py-4 text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                             <TableAction onClick={() => openNewsModal(item)} icon={<FaEdit />} color="indigo" />
                             <TableAction onClick={() => handleDelete(item.id, 'news')} icon={<FaTrash />} color="red" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // Firma
    if (activeTab === 'companies') return (
         <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs"><tr><th className="px-6 py-4">Logo</th><th className="px-6 py-4">Firma</th><th className="px-6 py-4">Sektör</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
                {companies.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4"><img src={item.logo_url ? getFileUrl('images', item.logo_url) : 'https://via.placeholder.com/50'} className="w-10 h-10 object-contain bg-white rounded-lg border p-1" /></td>
                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-gray-500">{item.sector}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                             <TableAction onClick={() => openCompanyModal(item)} icon={<FaEdit />} color="indigo" />
                             <TableAction onClick={() => handleDelete(item.id, 'company')} icon={<FaTrash />} color="red" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // Mesaj
    if (activeTab === 'messages') return (
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-semibold uppercase text-xs"><tr><th className="px-6 py-4">Tarih</th><th className="px-6 py-4">Ad Soyad</th><th className="px-6 py-4">Mesaj</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
                {messages.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-gray-500">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</td>
                        <td className="px-6 py-4 font-medium text-gray-900">{item.ad_soyad}</td>
                        <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{item.mesaj}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                             <TableAction onClick={() => openModal(item, 'message')} icon={<FaEye />} color="blue" />
                             <TableAction onClick={() => handleDelete(item.id, 'message')} icon={<FaTrash />} color="red" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return null;
};

const SidebarItem = ({ active, onClick, icon, label, isOpen }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${active ? 'bg-brand-blue text-white shadow-lg shadow-blue-900/50' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
  >
    <span className="text-xl">{icon}</span>
    <span className={`font-medium ${!isOpen && 'hidden'}`}>{label}</span>
  </button>
);
const StatCard = ({ title, count, icon, color }) => (<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition-shadow"><div><p className={`text-xs font-bold uppercase tracking-wider text-${color}-600 mb-1`}>{title}</p><h2 className="text-3xl font-bold text-gray-800">{count}</h2></div><div className={`p-3 rounded-xl bg-${color}-50 text-${color}-500 text-xl`}>{icon}</div></div>);
const StatusBadge = ({ status }) => { const colors = { onaylandi: 'bg-green-100 text-green-700', reddedildi: 'bg-red-100 text-red-700', beklemede: 'bg-yellow-100 text-yellow-700' }; return <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${colors[status] || 'bg-gray-100'}`}>{status}</span>; };
const AddBtn = ({ onClick, label }) => (<button onClick={onClick} className="bg-brand-blue text-white px-5 py-2.5 rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-800 transition flex items-center gap-2 font-medium"><FaPlus /> {label}</button>);
const TableAction = ({ onClick, icon, color }) => (<button onClick={onClick} className={`p-2 rounded-lg text-${color}-500 hover:bg-${color}-50 transition`}>{icon}</button>);
const DetailRow = ({ label, value }) => <div className="flex border-b border-gray-100 py-3"><span className="w-1/3 font-bold text-gray-500 text-sm">{label}</span><span className="w-2/3 text-sm font-medium text-gray-800">{value}</span></div>;

export default AdminDashboard;