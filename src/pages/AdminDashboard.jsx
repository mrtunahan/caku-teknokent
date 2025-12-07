import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { 
  FaSignOutAlt, FaFileDownload, FaProjectDiagram, FaBriefcase, FaNewspaper, FaBuilding, FaEnvelope,
  FaTrash, FaEye, FaTimesCircle,FaListUl, FaPlus, FaEdit, FaSearch, FaCog, FaBars, FaFileDownload as FaCvIcon,
  FaInfoCircle, FaBullseye, FaUsers, FaHandshake, FaBuilding as FaOfficeIcon, FaIdCard, FaUserSecret, FaChevronDown
} from "react-icons/fa";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ITEMS_PER_PAGE = 7;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [careers, setCareers] = useState([]);
  const [news, setNews] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [messages, setMessages] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  
  // Pagination & Loading
  const [currentPage, setCurrentPage] = useState(1);
  const [projectTotalPages, setProjectTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isKurumsalOpen, setIsKurumsalOpen] = useState(true); 

  // Modals States
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalType, setModalType] = useState(null); 
  
  // --- FORM STATES ---
  // Haber
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState(null);
  const [newsForm, setNewsForm] = useState({ title: '', category: 'haberler', date: '', content: '' });
  const [newsFile, setNewsFile] = useState(null);
  // Firma
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(null);
  const [companyForm, setCompanyForm] = useState({ name: '', sector: '' });
  const [companyLogo, setCompanyLogo] = useState(null);
  // Yönetim Kurulu
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [boardForm, setBoardForm] = useState({ name: '', title: '', email: '', is_chairman: false });
  const [boardImage, setBoardImage] = useState(null);
  // Paydaşlar
  const [showStakeholderModal, setShowStakeholderModal] = useState(false);
  const [isEditingStakeholder, setIsEditingStakeholder] = useState(false);
  const [currentStakeholderId, setCurrentStakeholderId] = useState(null);
  const [stakeholderForm, setStakeholderForm] = useState({ name: '', link: '' });
  const [stakeholderLogo, setStakeholderLogo] = useState(null);

  // Sayfa İçerik Editörü
  const [pageContent, setPageContent] = useState({ title: '', content: '' });
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) { navigate("/admin"); return; }
    fetchData();
  }, [activeTab, currentPage, navigate]);
  // Mevcut useEffect'in altına ekleyin
  useEffect(() => {
    setCurrentPage(1);
    setSearchTerm(""); // Sekme değişince aramayı da temizle
    setLoading(true); // Yükleniyor durumuna al
  }, [activeTab]);

  const fetchData = async () => {
    if(activeTab === 'projects') fetchProjects(currentPage);
    else if(activeTab.startsWith('page_')) fetchPageContent(activeTab.replace('page_', ''));
    else fetchOtherData();
  };

  const fetchProjects = async (page) => {
    try {
      const res = await api.get(`/applications?page=${page}&limit=${ITEMS_PER_PAGE}`);
      if (res.data.success) {
        setProjects(res.data.data);
        if (res.data.pagination) setProjectTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const fetchOtherData = async () => {
    try {
      const [careersRes, newsRes, companiesRes, messagesRes, boardRes, stakeRes] = await Promise.all([
        api.get("/career/list"), api.get("/news"), api.get("/companies"), api.get("/contact"),
        api.get("/board-members"), api.get("/stakeholders")
      ]);
      if (careersRes.data.success) setCareers(careersRes.data.data);
      if (newsRes.data.success) setNews(newsRes.data.data);
      if (companiesRes.data.success) setCompanies(companiesRes.data.data);
      if (messagesRes.data.success) setMessages(messagesRes.data.data);
      if (boardRes.data.success) setBoardMembers(boardRes.data.data);
      if (stakeRes.data.success) setStakeholders(stakeRes.data.data);
    } catch (error) { console.error(error); }
  };

  const fetchPageContent = async (slug) => {
      setPageLoading(true);
      try {
          const res = await api.get(`/pages/${slug}`);
          if(res.data.success) {
              setPageContent({ title: res.data.data.title, content: res.data.data.content });
          }
      } catch(err) { console.error(err); } 
      finally { setPageLoading(false); }
  };

  // --- CRUD İŞLEMLERİ ---

  const handleBoardSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', boardForm.name);
      formData.append('title', boardForm.title);
      formData.append('email', boardForm.email);
      formData.append('is_chairman', boardForm.is_chairman);
      if (boardImage) formData.append('image', boardImage);

      try {
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          if (isEditingBoard) {
              await api.put(`/board-members/${currentBoardId}`, formData, config);
              alert("Üye güncellendi!");
          } else {
              await api.post("/board-members", formData, config);
              alert("Üye eklendi!");
          }
          setShowBoardModal(false);
          fetchOtherData();
      } catch (error) { alert("Hata!"); }
  };

  const handleStakeholderSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', stakeholderForm.name);
      formData.append('link', stakeholderForm.link);
      if (stakeholderLogo) formData.append('logo', stakeholderLogo);

      try {
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          if (isEditingStakeholder) {
              await api.put(`/stakeholders/${currentStakeholderId}`, formData, config);
              alert("Paydaş güncellendi!");
          } else {
              await api.post("/stakeholders", formData, config);
              alert("Paydaş eklendi!");
          }
          setShowStakeholderModal(false);
          fetchOtherData();
      } catch (error) { alert("Hata!"); }
  };

  const handleNewsSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', newsForm.title); formData.append('category', newsForm.category);
      formData.append('date', newsForm.date); formData.append('content', newsForm.content);
      if (newsFile) formData.append('image', newsFile);
      try {
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          if (isEditingNews) await api.put(`/news/${currentNewsId}`, formData, config);
          else await api.post("/news", formData, config);
          setShowNewsModal(false); fetchOtherData();
      } catch (error) { alert("Hata!"); }
  };

  const handleCompanySubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', companyForm.name); formData.append('sector', companyForm.sector);
      if (companyLogo) formData.append('logo', companyLogo);
      try {
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          if (isEditingCompany) await api.put(`/companies/${currentCompanyId}`, formData, config);
          else await api.post("/companies", formData, config);
          setShowCompanyModal(false); fetchOtherData();
      } catch (error) { alert("Hata!"); }
  };

  const handlePageUpdate = async (e) => {
      e.preventDefault();
      const slug = activeTab.replace('page_', '');
      try { await api.put(`/pages/${slug}`, pageContent); alert("Sayfa içeriği güncellendi!"); } catch(err) { alert("Hata oluştu!"); }
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    let endpoint = '';
    if (type === 'project') endpoint = `/applications/${id}`;
    else if (type === 'career') endpoint = `/career/${id}`;
    else if (type === 'news') endpoint = `/news/${id}`;
    else if (type === 'company') endpoint = `/companies/${id}`;
    else if (type === 'message') endpoint = `/contact/${id}`;
    else if (type === 'board') endpoint = `/board-members/${id}`;
    else if (type === 'stakeholder') endpoint = `/stakeholders/${id}`;

    try {
      await api.delete(endpoint);
      if (type === 'project') { setProjects(prev => prev.filter(p => p.id !== id)); fetchProjects(currentPage); }
      else { fetchOtherData(); }
      if (selectedApp?.id === id) closeModal();
    } catch (error) { alert("Silme başarısız."); }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/applications/${id}/status`, { basvuru_durumu: newStatus });
      setProjects(prev => prev.map(p => p.id === id ? { ...p, basvuru_durumu: newStatus } : p));
      if (selectedApp && selectedApp.id === id) setSelectedApp(prev => ({ ...prev, basvuru_durumu: newStatus }));
    } catch (error) { alert("Hata!"); }
  };

  const handleLogout = () => { localStorage.removeItem("adminToken"); localStorage.removeItem("adminUser"); navigate("/admin"); };
  const openModal = (app, type) => { setSelectedApp(app); setModalType(type); };
  const closeModal = () => { setSelectedApp(null); setModalType(null); };
  const getFileUrl = (folder, filename) => `http://localhost:5000/uploads/${folder}/${filename}`;

  const openNewsModal = (item = null) => { 
      if (item) { setIsEditingNews(true); setCurrentNewsId(item.id); setNewsForm({ title: item.title, category: item.category, date: item.date, content: item.content || '' }); } 
      else { setIsEditingNews(false); setCurrentNewsId(null); setNewsForm({ title: '', category: 'haberler', date: '', content: '' }); } 
      setNewsFile(null); setShowNewsModal(true); 
  };
  const openCompanyModal = (item = null) => { 
      if (item) { setIsEditingCompany(true); setCurrentCompanyId(item.id); setCompanyForm({ name: item.name, sector: item.sector }); } 
      else { setIsEditingCompany(false); setCurrentCompanyId(null); setCompanyForm({ name: '', sector: '' }); } 
      setCompanyLogo(null); setShowCompanyModal(true); 
  };
  const openBoardModal = (item = null) => {
      if (item) { setIsEditingBoard(true); setCurrentBoardId(item.id); setBoardForm({ name: item.name, title: item.title, email: item.email, is_chairman: item.is_chairman }); }
      else { setIsEditingBoard(false); setCurrentBoardId(null); setBoardForm({ name: '', title: '', email: '', is_chairman: false }); }
      setBoardImage(null); setShowBoardModal(true);
  };
  const openStakeholderModal = (item = null) => {
      if (item) { setIsEditingStakeholder(true); setCurrentStakeholderId(item.id); setStakeholderForm({ name: item.name, link: item.link }); }
      else { setIsEditingStakeholder(false); setCurrentStakeholderId(null); setStakeholderForm({ name: '', link: '' }); }
      setStakeholderLogo(null); setShowStakeholderModal(true);
  };

  const getMonthlyProjectCounts = () => {
    const counts = new Array(12).fill(0);
    const currentYear = new Date().getFullYear();
    projects.forEach(p => { if (new Date(p.basvuru_tarihi).getFullYear() === currentYear) counts[new Date(p.basvuru_tarihi).getMonth()]++; });
    return counts;
  };
  const monthlyData = { labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'], datasets: [{ label: 'Projeler', data: getMonthlyProjectCounts(), backgroundColor: '#005696', borderRadius: 6 }] };
  const applicationsData = { labels: ['Projeler', 'İş', 'Staj'], datasets: [{ data: [projects.length, careers.filter(c => c.basvuru_tipi === 'is').length, careers.filter(c => c.basvuru_tipi === 'staj').length], backgroundColor: ['#3b82f6', '#8b5cf6', '#f97316'], borderWidth: 0 }] };

  const filteredData = () => {
    switch (activeTab) {
        case 'projects': return projects; 
        case 'careers': return careers.filter(item => item.ad_soyad?.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'news': return news.filter(item => item.title?.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'companies': return companies.filter(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'messages': return messages.filter(item => item.ad_soyad?.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'board': return boardMembers.filter(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'stakeholders': return stakeholders.filter(item => item.name?.toLowerCase().includes(searchTerm.toLowerCase()));
        default: return [];
    }
  };

  const getPaginatedData = () => {
    const data = filteredData();
    if (activeTab === 'projects') return data; 
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = () => {
      if (activeTab === 'projects') return projectTotalPages;
      return Math.ceil(filteredData().length / ITEMS_PER_PAGE) || 1;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500 font-medium">Panel Yükleniyor...</div>;

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-gray-800 overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`bg-[#1e293b] text-white flex flex-col transition-all duration-300 ${isSidebarOpen ? 'w-72' : 'w-20'} overflow-y-auto`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-700 shrink-0">
          <h1 className={`font-bold text-xl tracking-wider ${!isSidebarOpen && 'hidden'}`}>YÖNETİM PANELİ</h1>
          {!isSidebarOpen && <span className="font-bold text-xl">YP</span>}
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          <SidebarItem active={activeTab === "projects"} onClick={() => setActiveTab("projects")} icon={<FaProjectDiagram />} label="Proje Başvuruları" isOpen={isSidebarOpen} />
          <SidebarItem active={activeTab === "careers"} onClick={() => setActiveTab("careers")} icon={<FaBriefcase />} label="Kariyer Başvuruları" isOpen={isSidebarOpen} />
          <SidebarItem active={activeTab === "news"} onClick={() => setActiveTab("news")} icon={<FaNewspaper />} label="Haber & Duyuru" isOpen={isSidebarOpen} />
          <SidebarItem active={activeTab === "companies"} onClick={() => setActiveTab("companies")} icon={<FaBuilding />} label="Firma Yönetimi" isOpen={isSidebarOpen} />
          <SidebarItem active={activeTab === "messages"} onClick={() => setActiveTab("messages")} icon={<FaEnvelope />} label="Gelen Mesajlar" isOpen={isSidebarOpen} />
          
          <div className="border-t border-gray-700 my-4"></div>

          <div className="">
            <button onClick={() => setIsKurumsalOpen(!isKurumsalOpen)} className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center gap-3"><FaBuilding /><span className={`font-semibold ${!isSidebarOpen && 'hidden'}`}>KURUMSAL</span></div>
                {isSidebarOpen && <FaChevronDown className={`text-xs transition-transform ${isKurumsalOpen ? 'rotate-180' : ''}`} />}
            </button>
            {isKurumsalOpen && isSidebarOpen && (
                <div className="pl-4 mt-1 space-y-1">
                    <SidebarSubItem active={activeTab === "page_hakkimizda"} onClick={() => setActiveTab("page_hakkimizda")} icon={<FaInfoCircle />} label="Hakkımızda" />
                    <SidebarSubItem active={activeTab === "page_misyon"} onClick={() => setActiveTab("page_misyon")} icon={<FaBullseye />} label="Misyon & Vizyon" />
                    <SidebarSubItem active={activeTab === "board"} onClick={() => setActiveTab("board")} icon={<FaUsers />} label="Yönetim Kurulu" />
                    <SidebarSubItem active={activeTab === "stakeholders"} onClick={() => setActiveTab("stakeholders")} icon={<FaHandshake />} label="Paydaşlarımız" />
                    <SidebarSubItem active={activeTab === "page_ofisler"} onClick={() => setActiveTab("page_ofisler")} icon={<FaOfficeIcon />} label="Ofisler & Altyapı" />
                    <SidebarSubItem active={activeTab === "page_kimlik"} onClick={() => setActiveTab("page_kimlik")} icon={<FaIdCard />} label="Kurumsal Kimlik" />
                    <SidebarSubItem active={activeTab === "page_kvkk"} onClick={() => setActiveTab("page_kvkk")} icon={<FaUserSecret />} label="KVKK Metni" />
                </div>
            )}
          </div>
        </nav>

        <div className="p-3 border-t border-gray-700 space-y-2 shrink-0">
          <Link to="/admin/profile" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"><FaCog className="text-lg" /><span className={`${!isSidebarOpen && 'hidden'}`}>Ayarlar</span></Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-600/20 text-red-400 hover:text-red-200 transition-colors"><FaSignOutAlt className="text-lg" /><span className={`${!isSidebarOpen && 'hidden'}`}>Çıkış Yap</span></button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 border-b border-gray-200">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-brand-blue transition"><FaBars className="text-xl" /></button>
           <div className="font-bold text-gray-700">{activeTab.startsWith('page_') ? 'İçerik Yönetimi' : 'Yönetim Paneli'}</div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
            
            {activeTab.startsWith('page_') ? (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center gap-2"><FaEdit className="text-brand-blue" /> Sayfa İçeriğini Düzenle</h2>
                    {pageLoading ? <div className="text-center py-10">Yükleniyor...</div> : (
                        <form onSubmit={handlePageUpdate} className="space-y-6">
                            <div><label className="block text-sm font-bold text-gray-700 mb-2">Sayfa Başlığı</label><input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-blue outline-none" value={pageContent.title} onChange={(e) => setPageContent({...pageContent, title: e.target.value})}/></div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">İçerik (HTML Destekler)</label>
                                {/* PADDING TOP ARTIRILDI: p-3 -> p-3 pt-4 */}
                                <textarea rows="15" className="w-full border border-gray-300 rounded-lg p-3 pt-4 focus:ring-2 focus:ring-brand-blue outline-none font-mono text-sm" value={pageContent.content} onChange={(e) => setPageContent({...pageContent, content: e.target.value})} placeholder="Buraya metin veya HTML kodu girebilirsiniz..."></textarea>
                            </div>
                            <div className="flex justify-end"><button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg">Kaydet ve Yayınla</button></div>
                        </form>
                    )}
                </div>
            ) : (
                <>
                   {activeTab === 'projects' && (
                     <>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                            <StatCard title="Toplam Proje" count={projects.length} icon={<FaProjectDiagram />} color="blue" />
                            <StatCard title="Kariyer Başvurusu" count={careers.length} icon={<FaBriefcase />} color="purple" />
                            <StatCard title="Haber & Duyuru" count={news.length} icon={<FaNewspaper />} color="orange" />
                            <StatCard title="Firma Sayısı" count={companies.length} icon={<FaBuilding />} color="emerald" />
                            <StatCard title="Gelen Mesaj" count={messages.length} icon={<FaEnvelope />} color="pink" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 lg:col-span-2 flex flex-col h-64"><div className="flex justify-between items-center mb-2 shrink-0"><div><h3 className="font-bold text-gray-800 text-sm">Aylık Proje Başvuruları</h3></div></div><div className="flex-1 w-full relative min-h-0"><Bar data={monthlyData} options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } }} /></div></div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col h-64"><div className="mb-2 shrink-0"><h3 className="font-bold text-gray-800 text-sm">Dağılım</h3></div><div className="flex-1 w-full relative min-h-0 flex items-center justify-center"><Doughnut data={applicationsData} options={{ cutout: '70%', maintainAspectRatio: false, responsive: true, plugins: { legend: { position: 'right', labels: { usePointStyle: true, boxWidth: 6, font: { size: 11 } } } } }} /></div></div>
                        </div>
                     </>
                   )}

                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                    {activeTab === 'projects' && 'Proje Başvuruları'}
                    {activeTab === 'careers' && 'Kariyer Başvuruları'}
                    {activeTab === 'news' && 'Haber Yönetimi'}
                    {activeTab === 'companies' && 'Firma Yönetimi'}
                    {activeTab === 'messages' && 'Gelen Mesajlar'}
                    {activeTab === 'board' && 'Yönetim Kurulu'}
                    {activeTab === 'stakeholders' && 'Paydaşlar'}
                    </h2>
                    
                    {activeTab === 'projects' && <button onClick={() => window.open('http://localhost:5000/api/applications/export/excel', '_blank')} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow-sm font-medium text-sm"><FaFileDownload /> Excel İndir</button>}
                    {activeTab === 'news' && <AddBtn onClick={() => openNewsModal()} label="Haber Ekle" />}
                    {activeTab === 'companies' && <AddBtn onClick={() => openCompanyModal()} label="Firma Ekle" />}
                    {activeTab === 'board' && <AddBtn onClick={() => openBoardModal()} label="Üye Ekle" />}
                    {activeTab === 'stakeholders' && <AddBtn onClick={() => openStakeholderModal()} label="Paydaş Ekle" />}
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between" style={{minHeight: '400px'}}>
                    <div className="overflow-x-auto">
                        <RenderTable 
                        activeTab={activeTab} 
                        data={getPaginatedData()} 
                        onAction={{ handleDelete, openModal, openNewsModal, openCompanyModal, openBoardModal, openStakeholderModal, getFileUrl }}
                        />
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
                        <span className="text-sm text-gray-500 font-medium">Sayfa {currentPage} / {getTotalPages()}</span>
                        <div className="flex gap-2">
                            <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Önceki</button>
                            <button onClick={() => setCurrentPage(prev => Math.min(getTotalPages(), prev + 1))} disabled={currentPage === getTotalPages()} className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">Sonraki</button>
                        </div>
                    </div>
                  </div>
                </>
            )}
        </main>
      </div>

      {/* MODALLAR */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative p-8 animate-fadeIn">
            <button onClick={closeModal} className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-600 transition-colors"><FaTimesCircle /></button>
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-gray-800">{modalType === 'project' ? 'Proje Detayı' : modalType === 'career' ? 'Kariyer Detayı' : 'Mesaj Detayı'}</h2>
            <div className="space-y-4">
                <DetailRow label="Ad Soyad" value={selectedApp.adiniz_soyadiniz || selectedApp.ad_soyad} />
                <DetailRow label="E-posta" value={selectedApp.email} />
                {modalType === 'message' && (<><DetailRow label="Telefon" value={selectedApp.telefon || "-"} /><DetailRow label="Tarih" value={new Date(selectedApp.createdAt).toLocaleDateString("tr-TR")} /><div className="mt-6"><h4 className="font-bold text-gray-700 mb-2 border-l-4 border-blue-500 pl-3">Mesajın Tamamı</h4><div className="bg-blue-50/50 p-5 rounded-xl text-gray-700 text-sm leading-relaxed border border-blue-100 whitespace-pre-wrap break-words shadow-inner overflow-hidden">{selectedApp.mesaj}</div></div></>)}
                {modalType === 'project' && (<><DetailRow label="Proje Adı" value={selectedApp.proje_adi} /><div className="bg-gray-50 p-4 rounded-lg mt-2 text-sm leading-relaxed border border-gray-200"><span className="font-bold block mb-1 text-gray-700">Özet:</span>{selectedApp.proje_ozeti}</div></>)}
                {modalType === 'career' && (<><DetailRow label="Başvuru Tipi" value={selectedApp.basvuru_tipi} /><DetailRow label="Firma" value={selectedApp.firma_adi} />{selectedApp.cv_dosya_yolu && (<div className="pt-4"><a href={getFileUrl('cv', selectedApp.cv_dosya_yolu)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-2.5 rounded-lg hover:bg-blue-800 transition shadow-sm"><FaCvIcon /> CV'yi İndir / Görüntüle</a></div>)}</>)}
            </div>
          </div>
        </div>
      )}

      {showBoardModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
                <h3 className="text-xl font-bold mb-4">{isEditingBoard ? 'Üyeyi Düzenle' : 'Yeni Üye Ekle'}</h3>
                <form onSubmit={handleBoardSubmit} className="space-y-4">
                    <input required type="text" placeholder="Ad Soyad" className="w-full border p-2 rounded" value={boardForm.name} onChange={e => setBoardForm({...boardForm, name: e.target.value})} />
                    <input required type="text" placeholder="Unvan (Örn: Yönetim Kurulu Başkanı)" className="w-full border p-2 rounded" value={boardForm.title} onChange={e => setBoardForm({...boardForm, title: e.target.value})} />
                    <input type="email" placeholder="E-posta" className="w-full border p-2 rounded" value={boardForm.email} onChange={e => setBoardForm({...boardForm, email: e.target.value})} />
                    <label className="flex items-center gap-2"><input type="checkbox" checked={boardForm.is_chairman} onChange={e => setBoardForm({...boardForm, is_chairman: e.target.checked})} /> Yönetim Kurulu Başkanı mı?</label>
                    <div className="space-y-1"><label className="text-sm font-semibold">Fotoğraf Yükle</label><input type="file" onChange={e => setBoardImage(e.target.files[0])} className="w-full text-sm" /></div>
                    <div className="flex justify-end gap-2 mt-4"><button type="button" onClick={() => setShowBoardModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button><button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-800">Kaydet</button></div>
                </form>
            </div>
        </div>
      )}

      {showStakeholderModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
                <h3 className="text-xl font-bold mb-4">{isEditingStakeholder ? 'Paydaşı Düzenle' : 'Yeni Paydaş Ekle'}</h3>
                <form onSubmit={handleStakeholderSubmit} className="space-y-4">
                    <input required type="text" placeholder="Paydaş Adı" className="w-full border p-2 rounded" value={stakeholderForm.name} onChange={e => setStakeholderForm({...stakeholderForm, name: e.target.value})} />
                    <input type="text" placeholder="Web Sitesi Linki (Opsiyonel)" className="w-full border p-2 rounded" value={stakeholderForm.link} onChange={e => setStakeholderForm({...stakeholderForm, link: e.target.value})} />
                    <div className="space-y-1"><label className="text-sm font-semibold">Logo Yükle</label><input type="file" onChange={e => setStakeholderLogo(e.target.files[0])} className="w-full text-sm" /></div>
                    <div className="flex justify-end gap-2 mt-4"><button type="button" onClick={() => setShowStakeholderModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button><button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-800">Kaydet</button></div>
                </form>
            </div>
        </div>
      )}

      {/* Haber Modalı */}
      {showNewsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
                <h3 className="text-xl font-bold mb-4">{isEditingNews ? 'Haberi Düzenle' : 'Yeni Haber Ekle'}</h3>
                <form onSubmit={handleNewsSubmit} className="space-y-4">
                    <input required type="text" placeholder="Başlık" className="w-full border p-2 rounded" value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} />
                    <select className="w-full border p-2 rounded" value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value})}><option value="haberler">Haberler</option><option value="duyurular">Duyurular</option><option value="etkinlikler">Etkinlikler</option><option value="firmalar">Firmalardan</option></select>
                    <input required type="date" className="w-full border p-2 rounded" value={newsForm.date} onChange={e => setNewsForm({...newsForm, date: e.target.value})} />
                    {/* PADDING TOP ARTIRILDI: p-2 -> p-2 pt-3 */}
                    <textarea rows="4" placeholder="İçerik" className="w-full border p-2 pt-3 rounded" value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})}></textarea>
                    <input type="file" onChange={e => setNewsFile(e.target.files[0])} className="w-full text-sm" />
                    <div className="flex justify-end gap-2 mt-4"><button type="button" onClick={() => setShowNewsModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button><button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-800">Kaydet</button></div>
                </form>
            </div>
        </div>
      )}

      {showCompanyModal && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6"><form onSubmit={handleCompanySubmit} className="space-y-4"><input required type="text" placeholder="Firma Adı" className="w-full border p-2 rounded" value={companyForm.name} onChange={e => setCompanyForm({...companyForm, name: e.target.value})} /><input required type="text" placeholder="Sektör" className="w-full border p-2 rounded" value={companyForm.sector} onChange={e => setCompanyForm({...companyForm, sector: e.target.value})} /><input type="file" onChange={e => setCompanyLogo(e.target.files[0])} className="w-full text-sm" /><div className="flex justify-end gap-2 mt-4"><button type="button" onClick={() => setShowCompanyModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">İptal</button><button type="submit" className="px-4 py-2 bg-brand-blue text-white rounded hover:bg-blue-800">Kaydet</button></div></form></div></div>)}

    </div>
  );
};

const RenderTable = ({ activeTab, data, onAction }) => {
    const { handleDelete, openModal, openNewsModal, openCompanyModal, openBoardModal, openStakeholderModal, getFileUrl } = onAction;
    
    if (activeTab === 'projects') return (<table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-600 text-xs"><tr><th className="px-6 py-4">Tarih</th><th className="px-6 py-4">Ad Soyad</th><th className="px-6 py-4">Proje</th><th className="px-6 py-4">Durum</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead><tbody className="divide-y divide-gray-100">{data.map(item => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-6 py-4 text-gray-500">{new Date(item.basvuru_tarihi).toLocaleDateString("tr-TR")}</td><td className="px-6 py-4 font-medium">{item.adiniz_soyadiniz}</td><td className="px-6 py-4">{item.proje_adi}</td><td className="px-6 py-4"><StatusBadge status={item.basvuru_durumu} /></td><td className="px-6 py-4 text-right space-x-2"><TableAction onClick={() => openModal(item, 'project')} icon={<FaEye />} color="blue" /><TableAction onClick={() => handleDelete(item.id, 'project')} icon={<FaTrash />} color="red" /></td></tr>))}</tbody></table>);
    if (activeTab === 'careers') return (<table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-600 text-xs"><tr><th className="px-6 py-4">Tarih</th><th className="px-6 py-4">Ad Soyad</th><th className="px-6 py-4">Tip</th><th className="px-6 py-4">CV</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead><tbody className="divide-y divide-gray-100">{data.map(item => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-6 py-4 text-gray-500">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</td><td className="px-6 py-4 font-medium">{item.ad_soyad}</td><td className="px-6 py-4">{item.basvuru_tipi}</td><td className="px-6 py-4">{item.cv_dosya_yolu ? <a href={getFileUrl('cv', item.cv_dosya_yolu)} target="_blank" className="text-blue-600 hover:underline font-bold text-xs">İNDİR</a> : '-'}</td><td className="px-6 py-4 text-right space-x-2"><TableAction onClick={() => openModal(item, 'career')} icon={<FaEye />} color="blue" /><TableAction onClick={() => handleDelete(item.id, 'career')} icon={<FaTrash />} color="red" /></td></tr>))}</tbody></table>);
    if (activeTab === 'news') return (<table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-600 text-xs"><tr><th className="px-6 py-4">Görsel</th><th className="px-6 py-4">Başlık</th><th className="px-6 py-4">Kategori</th><th className="px-6 py-4">Tarih</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead><tbody className="divide-y divide-gray-100">{data.map(item => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-6 py-4"><img src={item.image_url ? getFileUrl('images', item.image_url) : 'https://via.placeholder.com/50'} className="w-10 h-10 object-cover rounded-lg border" /></td><td className="px-6 py-4 font-medium">{item.title}</td><td className="px-6 py-4"><span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${item.category === 'haberler' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{item.category}</span></td><td className="px-6 py-4 text-gray-500">{new Date(item.date).toLocaleDateString('tr-TR')}</td><td className="px-6 py-4 text-right space-x-2"><TableAction onClick={() => openNewsModal(item)} icon={<FaEdit />} color="indigo" /><TableAction onClick={() => handleDelete(item.id, 'news')} icon={<FaTrash />} color="red" /></td></tr>))}</tbody></table>);
    if (activeTab === 'companies') return (<table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-600 text-xs"><tr><th className="px-6 py-4">Logo</th><th className="px-6 py-4">Firma</th><th className="px-6 py-4">Sektör</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead><tbody className="divide-y divide-gray-100">{data.map(item => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-6 py-4"><img src={item.logo_url ? getFileUrl('images', item.logo_url) : 'https://via.placeholder.com/50'} className="w-10 h-10 object-contain bg-white rounded-lg border p-1" /></td><td className="px-6 py-4 font-medium">{item.name}</td><td className="px-6 py-4 text-gray-500">{item.sector}</td><td className="px-6 py-4 text-right space-x-2"><TableAction onClick={() => openCompanyModal(item)} icon={<FaEdit />} color="indigo" /><TableAction onClick={() => handleDelete(item.id, 'company')} icon={<FaTrash />} color="red" /></td></tr>))}</tbody></table>);
    if (activeTab === 'messages') return (<table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-600 text-xs"><tr><th className="px-6 py-4">Tarih</th><th className="px-6 py-4">Ad Soyad</th><th className="px-6 py-4">Mesaj</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead><tbody className="divide-y divide-gray-100">{data.map(item => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-6 py-4 text-gray-500">{new Date(item.createdAt).toLocaleDateString("tr-TR")}</td><td className="px-6 py-4 font-medium">{item.ad_soyad}</td><td className="px-6 py-4 truncate max-w-xs">{item.mesaj}</td><td className="px-6 py-4 text-right space-x-2"><TableAction onClick={() => openModal(item, 'message')} icon={<FaEye />} color="blue" /><TableAction onClick={() => handleDelete(item.id, 'message')} icon={<FaTrash />} color="red" /></td></tr>))}</tbody></table>);
    if (activeTab === 'board') return (<table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-600 text-xs"><tr><th className="px-6 py-4">Fotoğraf</th><th className="px-6 py-4">Ad Soyad</th><th className="px-6 py-4">Unvan</th><th className="px-6 py-4">Başkan mı?</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead><tbody className="divide-y divide-gray-100">{data.map(item => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-6 py-4"><img src={item.image_url ? getFileUrl('images', item.image_url) : 'https://via.placeholder.com/50'} className="w-10 h-10 object-cover rounded-full border" /></td><td className="px-6 py-4 font-medium">{item.name}</td><td className="px-6 py-4">{item.title}</td><td className="px-6 py-4">{item.is_chairman ? <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">BAŞKAN</span> : '-'}</td><td className="px-6 py-4 text-right space-x-2"><TableAction onClick={() => openBoardModal(item)} icon={<FaEdit />} color="indigo" /><TableAction onClick={() => handleDelete(item.id, 'board')} icon={<FaTrash />} color="red" /></td></tr>))}</tbody></table>);
    if (activeTab === 'stakeholders') return (<table className="w-full text-left text-sm"><thead className="bg-gray-50 text-gray-600 text-xs"><tr><th className="px-6 py-4">Logo</th><th className="px-6 py-4">Paydaş Adı</th><th className="px-6 py-4">Link</th><th className="px-6 py-4 text-right">İşlem</th></tr></thead><tbody className="divide-y divide-gray-100">{data.map(item => (<tr key={item.id} className="hover:bg-gray-50"><td className="px-6 py-4"><img src={item.logo_url ? getFileUrl('images', item.logo_url) : 'https://via.placeholder.com/50'} className="w-10 h-10 object-contain bg-white rounded border p-1" /></td><td className="px-6 py-4 font-medium">{item.name}</td><td className="px-6 py-4 text-blue-500 hover:underline text-xs"><a href={item.link} target="_blank">{item.link}</a></td><td className="px-6 py-4 text-right space-x-2"><TableAction onClick={() => openStakeholderModal(item)} icon={<FaEdit />} color="indigo" /><TableAction onClick={() => handleDelete(item.id, 'stakeholder')} icon={<FaTrash />} color="red" /></td></tr>))}</tbody></table>);
    return null;
};

const SidebarItem = ({ active, onClick, icon, label, isOpen }) => (<button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${active ? 'bg-brand-blue text-white shadow-lg shadow-blue-900/50' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><span className="text-lg">{icon}</span><span className={`font-medium ${!isOpen && 'hidden'}`}>{label}</span></button>);
const SidebarSubItem = ({ active, onClick, icon, label }) => (<button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}><span className="text-xs opacity-70">{icon}</span><span>{label}</span></button>);
const StatCard = ({ title, count, icon, color }) => (<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-start hover:shadow-md transition-shadow"><div><p className={`text-xs font-bold uppercase tracking-wider text-${color}-600 mb-1`}>{title}</p><h2 className="text-3xl font-bold text-gray-800">{count}</h2></div><div className={`p-3 rounded-xl bg-${color}-50 text-${color}-500 text-xl`}>{icon}</div></div>);
const StatusBadge = ({ status }) => { const colors = { onaylandi: 'bg-green-100 text-green-700', reddedildi: 'bg-red-100 text-red-700', beklemede: 'bg-yellow-100 text-yellow-700' }; return <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${colors[status] || 'bg-gray-100'}`}>{status}</span>; };
const AddBtn = ({ onClick, label }) => (<button onClick={onClick} className="bg-brand-blue text-white px-5 py-2.5 rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-800 transition flex items-center gap-2 font-medium"><FaPlus /> {label}</button>);
const TableAction = ({ onClick, icon, color }) => (<button onClick={onClick} className={`p-2 rounded-lg text-${color}-500 hover:bg-${color}-50 transition`}>{icon}</button>);
const DetailRow = ({ label, value }) => <div className="flex border-b border-gray-100 py-3"><span className="w-1/3 font-bold text-gray-500 text-sm">{label}</span><span className="w-2/3 text-sm font-medium text-gray-800">{value}</span></div>;

export default AdminDashboard;