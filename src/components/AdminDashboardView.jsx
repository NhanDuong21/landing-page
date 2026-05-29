import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Film, 
  Building2, 
  CircleDollarSign, 
  Users, 
  Settings, 
  Ticket, 
  ShieldCheck, 
  ChevronDown, 
  ChevronRight, 
  LogOut, 
  Home, 
  Percent, 
  Trash2, 
  Edit3, 
  PlusCircle
} from 'lucide-react';
import { MOVIES } from '../data/mockData';

export default function AdminDashboardView({ onBackHome }) {
  const { user, userRole, logout } = useAuth();
  
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState('overview');

  // Collapsible sidebar section states
  const [expandedSections, setExpandedSections] = useState({
    noiDung: true,
    coSo: false,
    kinhDoanh: false,
    nguoiDung: false,
    cauHinh: false,
    baoMat: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mock Operational Metrics
  const metrics = [
    {
      title: 'Doanh thu hôm nay',
      value: '24.840.000đ',
      icon: <CircleDollarSign className="w-8 h-8 text-brand-coral" />,
      change: '+12.5% so với hôm qua'
    },
    {
      title: 'Tổng số vé đã bán',
      value: '228 vé',
      icon: <Ticket className="w-8 h-8 text-brand-yellow" />,
      change: '18 phòng chiếu đang hoạt động'
    },
    {
      title: 'Tỷ lệ lấp đầy phòng',
      value: '84.2%',
      icon: <Percent className="w-8 h-8 text-emerald-500" />,
      change: '+4.8% trong khung giờ vàng'
    }
  ];

  const handleLogout = () => {
    logout();
    onBackHome();
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar System Navigation Panel */}
      <aside className="w-full lg:w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Section */}
          <div className="p-6 border-b border-zinc-800">
            <span className="text-brand-coral font-black tracking-widest text-lg uppercase block mb-1">
              Lora Film
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-brand-yellow text-black">
                {userRole}
              </span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                Trang Quản Trị
              </span>
            </div>
          </div>

          {/* Navigation Items Accordion */}
          <nav className="p-4 space-y-2 overflow-y-auto max-h-[65vh] scrollbar-thin">
            {/* Dashboard Link */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-brand-coral/10 text-brand-coral border-l-4 border-brand-coral'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard (Tổng Quan)</span>
            </button>

            {/* Quản Lý Nội Dung Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('noiDung')}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:bg-zinc-800/50 hover:text-white uppercase"
              >
                <div className="flex items-center gap-3">
                  <Film className="w-4 h-4 shrink-0" />
                  <span>Quản Lý Nội Dung</span>
                </div>
                {expandedSections.noiDung ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedSections.noiDung && (
                <div className="pl-8 space-y-1">
                  <button
                    onClick={() => setActiveTab('movies')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'movies' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Quản lý phim
                  </button>
                  <button
                    onClick={() => setActiveTab('actors')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'actors' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Quản lý diễn viên
                  </button>
                  <button
                    onClick={() => setActiveTab('showtimes')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'showtimes' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Quản lý suất chiếu
                  </button>
                </div>
              )}
            </div>

            {/* Quản Lý Cơ Sở Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('coSo')}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:bg-zinc-800/50 hover:text-white uppercase"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Quản Lý Cơ Sở</span>
                </div>
                {expandedSections.coSo ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedSections.coSo && (
                <div className="pl-8 space-y-1">
                  <button
                    onClick={() => setActiveTab('clusters')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'clusters' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Quản lý cụm rạp
                  </button>
                  <button
                    onClick={() => setActiveTab('halls')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'halls' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Quản lý phòng chiếu
                  </button>
                </div>
              )}
            </div>

            {/* Vận Hành Kinh Doanh Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('kinhDoanh')}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:bg-zinc-800/50 hover:text-white uppercase"
              >
                <div className="flex items-center gap-3">
                  <CircleDollarSign className="w-4 h-4 shrink-0" />
                  <span>Vận Hành Kinh Doanh</span>
                </div>
                {expandedSections.kinhDoanh ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedSections.kinhDoanh && (
                <div className="pl-8 space-y-1">
                  <button
                    onClick={() => setActiveTab('tickets')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'tickets' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Quản lý vé bán
                  </button>
                  <button
                    onClick={() => setActiveTab('concessions')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'concessions' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Doanh thu bắp nước
                  </button>
                </div>
              )}
            </div>

            {/* Quản Lý Người Dùng Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('nguoiDung')}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:bg-zinc-800/50 hover:text-white uppercase"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Quản Lý Người Dùng</span>
                </div>
                {expandedSections.nguoiDung ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedSections.nguoiDung && (
                <div className="pl-8 space-y-1">
                  <button
                    onClick={() => setActiveTab('customers')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'customers' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Danh sách khách hàng
                  </button>
                  <button
                    onClick={() => setActiveTab('payroll')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'payroll' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Bảng lương nhân viên
                  </button>
                </div>
              )}
            </div>

            {/* Cấu Hình Phim Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('cauHinh')}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:bg-zinc-800/50 hover:text-white uppercase"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4 shrink-0" />
                  <span>Cấu Hình Phim</span>
                </div>
                {expandedSections.cauHinh ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedSections.cauHinh && (
                <div className="pl-8 space-y-1">
                  <button
                    onClick={() => setActiveTab('delays')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'delays' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Ngưỡng trễ lịch chiếu
                  </button>
                  <button
                    onClick={() => setActiveTab('pricing')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'pricing' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Hệ số giá vé
                  </button>
                </div>
              )}
            </div>

            {/* Đặt Vé Link */}
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase transition-all duration-200 ${
                activeTab === 'bookings'
                  ? 'bg-brand-coral/10 text-brand-coral border-l-4 border-brand-coral'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <Ticket className="w-4 h-4 shrink-0" />
              <span>Đặt Vé (Giao dịch)</span>
            </button>

            {/* Bảo Mật & Phân Quyền Section */}
            <div className="space-y-1">
              <button
                onClick={() => toggleSection('baoMat')}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:bg-zinc-800/50 hover:text-white uppercase"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Bảo Mật & Phân Quyền</span>
                </div>
                {expandedSections.baoMat ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
              {expandedSections.baoMat && (
                <div className="pl-8 space-y-1">
                  <button
                    onClick={() => setActiveTab('keys')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'keys' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Danh sách khoá bảo mật
                  </button>
                  <button
                    onClick={() => setActiveTab('credentials')}
                    className={`w-full text-left py-2 px-3 rounded text-[11px] font-semibold block ${activeTab === 'credentials' ? 'text-brand-coral bg-white/5 font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Quản lý tài khoản
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <div className="px-4 py-2">
            <p className="text-xs text-zinc-500 font-bold uppercase">Người dùng</p>
            <p className="text-sm font-bold text-white truncate">{user?.fullName || 'Administrator'}</p>
          </div>

          <button
            onClick={onBackHome}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content Space */}
      <main className="flex-grow p-6 md:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide uppercase">
              {activeTab === 'overview' && 'TỔNG QUAN HỆ THỐNG'}
              {activeTab === 'movies' && 'DANH SÁCH PHIM'}
              {activeTab === 'actors' && 'QUẢN LÝ DIỄN VIÊN'}
              {activeTab === 'showtimes' && 'QUẢN LÝ LỊCH CHIẾU'}
              {activeTab === 'clusters' && 'CỤM RẠP HỆ THỐNG'}
              {activeTab === 'halls' && 'QUẢN LÝ PHÒNG CHIẾU'}
              {activeTab === 'tickets' && 'LỊCH SỬ VÉ BÁN'}
              {activeTab === 'concessions' && 'KHO BẮP NƯỚC'}
              {activeTab === 'customers' && 'DANH SÁCH THÀNH VIÊN'}
              {activeTab === 'payroll' && 'BẢNG LƯƠNG NHÂN VIÊN'}
              {activeTab === 'delays' && 'CẤU HÌNH TRỄ LỊCH CHIẾU'}
              {activeTab === 'pricing' && 'HỆ SỐ PHỤ THU GIÁ VÉ'}
              {activeTab === 'bookings' && 'DUYỆT GIAO DỊCH CHỜ'}
              {activeTab === 'keys' && 'KHOÁ BẢO MẬT HỆ THỐNG'}
              {activeTab === 'credentials' && 'QUẢN LÝ TÀI KHOẢN'}
            </h1>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mt-1">
              Báo cáo hiệu suất và công cụ cấu hình hệ thống LoraFilm
            </p>
          </div>
          <div className="text-right text-xs text-zinc-400">
            Hệ thống trực tuyến: <span className="text-emerald-500 font-black">ONLINE</span>
          </div>
        </div>

        {/* Operational Snapshots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((item, idx) => (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center gap-5 shadow-lg">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0">
                {item.icon}
              </div>
              <div>
                <span className="text-zinc-500 text-xs font-black uppercase tracking-wider block mb-1">
                  {item.title}
                </span>
                <span className="text-2xl font-black text-white block mb-0.5">{item.value}</span>
                <span className="text-[10px] text-zinc-400 block font-semibold">{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Central Display Panels */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative min-h-[400px]">
          
          {/* Overview Panel */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>Giao dịch vé gần đây</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-400">
                  <thead className="bg-zinc-950 text-zinc-500 text-xs font-black uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Khách hàng</th>
                      <th className="py-3 px-4">Phim</th>
                      <th className="py-3 px-4">Suất chiếu</th>
                      <th className="py-3 px-4">Ghế</th>
                      <th className="py-3 px-4">Tổng tiền</th>
                      <th className="py-3 px-4">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">Lê Văn Sơn</td>
                      <td className="py-3.5 px-4">John Wick: Ballerina</td>
                      <td className="py-3.5 px-4 font-semibold text-brand-coral">19:30 | Hôm nay</td>
                      <td className="py-3.5 px-4">F4, F5</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-extrabold">220.000đ</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase">
                          Thành công
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">Trần Thị Hoa</td>
                      <td className="py-3.5 px-4">Dinh Thinh La Yeu</td>
                      <td className="py-3.5 px-4 font-semibold text-brand-coral">09:30 | Hôm nay</td>
                      <td className="py-3.5 px-4">A12</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-extrabold">80.000đ</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase">
                          Thành công
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Movies list under Content Management */}
          {activeTab === 'movies' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Danh sách phim hiện tại</h3>
                <button className="flex items-center gap-2 bg-brand-coral hover:bg-opacity-95 text-white text-xs font-black py-2.5 px-4 rounded-xl">
                  <PlusCircle className="w-4 h-4" />
                  <span>THÊM PHIM MỚI</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-400">
                  <thead className="bg-zinc-950 text-zinc-500 text-xs font-black uppercase tracking-wider border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Tên phim</th>
                      <th className="py-3 px-4">Độ dài</th>
                      <th className="py-3 px-4">Giới hạn tuổi</th>
                      <th className="py-3 px-4">Trạng thái</th>
                      <th className="py-3 px-4">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {MOVIES.slice(0, 6).map((movie) => (
                      <tr key={movie.id}>
                        <td className="py-3.5 px-4 font-bold text-white">{movie.title}</td>
                        <td className="py-3.5 px-4">{movie.duration}</td>
                        <td className="py-3.5 px-4 font-bold text-zinc-200">{movie.ageRating}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase border ${
                            movie.status === 'NOW_SHOWING' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {movie.status === 'NOW_SHOWING' ? 'Đang chiếu' : 'Sắp chiếu'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-850 rounded">
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/20 border border-red-900/40 rounded">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Showtimes configuration tab */}
          {activeTab === 'showtimes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Quản lý lịch chiếu</h3>
                <button className="flex items-center gap-2 bg-brand-coral hover:bg-opacity-95 text-white text-xs font-black py-2.5 px-4 rounded-xl">
                  <PlusCircle className="w-4 h-4" />
                  <span>THÊM SUẤT CHIẾU</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-brand-yellow font-black">2D DIGITAL | Rạp Lora Nguyễn Du</span>
                    <h4 className="font-bold text-white text-base">Dinh Thinh La Yeu (19:30)</h4>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300 bg-red-950/20 border border-red-900/40 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-brand-coral font-black">IMAX 3D | Rạp Lora Thảo Điền</span>
                    <h4 className="font-bold text-white text-base">John Wick: Ballerina (13:15)</h4>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300 bg-red-950/20 border border-red-900/40 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings validation tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white mb-4">Giao dịch vé chờ phê duyệt</h3>
              
              <div className="bg-zinc-950/60 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-brand-yellow font-black">YÊU CẦU DUYỆT ĐẶT VÉ</span>
                  <p className="text-white font-bold mt-1">Khách hàng: Phạm Minh Đức (member@gmail.com)</p>
                  <p className="text-zinc-400 text-xs mt-0.5">Phim: Buon Than Ban Thanh | Ghế: J5, J6 | Giá: 220.000đ</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase">
                    Chấp Nhận
                  </button>
                  <button className="bg-zinc-900 border border-zinc-800 text-red-400 hover:bg-zinc-850 px-4 py-2 rounded-xl text-xs uppercase">
                    Từ Chối
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Fallback View for other tabs */}
          {!['overview', 'movies', 'showtimes', 'bookings'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <Settings className="w-12 h-12 text-zinc-700 animate-spin" style={{ animationDuration: '6s' }} />
              <h3 className="text-base font-bold text-zinc-400 uppercase tracking-wider">Cấu Hình Hoạt Động</h3>
              <p className="text-zinc-600 text-xs max-w-sm">
                Mục này đang hiển thị dữ liệu mô phỏng trong bộ nhớ đệm local của trình duyệt.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
