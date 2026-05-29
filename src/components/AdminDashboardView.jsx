import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  CalendarRange, 
  TicketCheck, 
  Film, 
  TrendingUp, 
  CircleDollarSign, 
  Ticket, 
  Percent, 
  LogOut, 
  Home, 
  Lock, 
  Trash2, 
  Edit3, 
  PlusCircle
} from 'lucide-react';

// Guard Overlay component for Employee restriction
function EmployeeLockOverlay() {
  return (
    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md flex flex-col items-center justify-center p-8 z-30 border border-zinc-800 rounded-2xl text-center select-none">
      <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500 flex items-center justify-center text-amber-500 mb-4 animate-pulse">
        <Lock className="w-8 h-8" />
      </div>
      <h4 className="text-lg font-black text-white uppercase tracking-wider mb-2">QUYỀN TRUY CẬP HẠN CHẾ</h4>
      <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
        Tài khoản Nhân viên chỉ có quyền xem lịch chiếu và in vé. Quyền chỉnh sửa thuộc về Admin.
      </p>
    </div>
  );
}

export default function AdminDashboardView({ onBackHome }) {
  const { user, userRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Analytical Snapshot Mock Data
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
      <aside className="w-full lg:w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Platform Info */}
          <div className="p-6 border-b border-zinc-800">
            <span className="text-brand-coral font-black tracking-widest text-lg uppercase block mb-1">
              Lora Film
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-brand-yellow text-black">
                {userRole}
              </span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                Trang quản trị
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-brand-coral/10 text-brand-coral border-l-4 border-brand-coral'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Tổng Quan</span>
            </button>
            <button
              onClick={() => setActiveTab('showtimes')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase transition-all duration-200 ${
                activeTab === 'showtimes'
                  ? 'bg-brand-coral/10 text-brand-coral border-l-4 border-brand-coral'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <CalendarRange className="w-4 h-4" />
              <span>Quản Lý Lịch Chiếu</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase transition-all duration-200 ${
                activeTab === 'bookings'
                  ? 'bg-brand-coral/10 text-brand-coral border-l-4 border-brand-coral'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <TicketCheck className="w-4 h-4" />
              <span>Duyệt Đặt Vé</span>
            </button>
            <button
              onClick={() => setActiveTab('cinemas')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase transition-all duration-200 ${
                activeTab === 'cinemas'
                  ? 'bg-brand-coral/10 text-brand-coral border-l-4 border-brand-coral'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Hệ Thống Rạp</span>
            </button>
          </nav>
        </div>

        {/* User profile actions footer */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <div className="px-4 py-2">
            <p className="text-xs text-zinc-500 font-bold uppercase">Tài khoản</p>
            <p className="text-sm font-bold text-white truncate">{user?.fullName || 'Manager'}</p>
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

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 space-y-8 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide uppercase">
              {activeTab === 'overview' && 'TỔNG QUAN HỆ THỐNG'}
              {activeTab === 'showtimes' && 'QUẢN LÝ LỊCH CHIẾU'}
              {activeTab === 'bookings' && 'DUYỆT ĐẶT VÉ'}
              {activeTab === 'cinemas' && 'HỆ THỐNG RẠP'}
            </h1>
            <p className="text-zinc-500 text-xs uppercase tracking-wider mt-1">
              Báo cáo hiệu suất vận hành LoraFilm hôm nay
            </p>
          </div>

          <div className="text-right text-xs text-zinc-400">
            Hệ thống trực tuyến: <span className="text-emerald-500 font-black">ONLINE</span>
          </div>
        </div>

        {/* Analytical Counter Cards Grid */}
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

        {/* Dynamic Panels */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative min-h-[400px]">
          
          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-coral" />
                <span>Vé Đã Bán Gần Đây</span>
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
                      <td className="py-3.5 px-4">Tu Vu Tru John Wick: Ballerina</td>
                      <td className="py-3.5 px-4 font-semibold text-brand-coral">19:30 | 29/05</td>
                      <td className="py-3.5 px-4">F4, F5</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-extrabold">220.000đ</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase">
                          Đã thanh toán
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">Trần Thị Hoa</td>
                      <td className="py-3.5 px-4">Dinh Thinh La Yeu</td>
                      <td className="py-3.5 px-4 font-semibold text-brand-coral">09:30 | 29/05</td>
                      <td className="py-3.5 px-4">A12</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-extrabold">80.000đ</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase">
                          Đã thanh toán
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-bold text-white">Phạm Minh Đức</td>
                      <td className="py-3.5 px-4">Buon Than Ban Thanh</td>
                      <td className="py-3.5 px-4 font-semibold text-brand-coral">22:15 | 29/05</td>
                      <td className="py-3.5 px-4">J5, J6</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-extrabold">220.000đ</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase">
                          Chờ duyệt
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Showtimes Config Tab (Employee restriction guard applies) */}
          {activeTab === 'showtimes' && (
            <div className="h-full relative min-h-[300px]">
              {userRole === 'EMPLOYEE' && <EmployeeLockOverlay />}
              
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Chỉnh Sửa Lịch Chiếu</h3>
                  <button className="flex items-center gap-2 bg-brand-coral hover:bg-opacity-95 text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all">
                    <PlusCircle className="w-4 h-4" />
                    <span>THÊM SUẤT CHIẾU MỚI</span>
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
                      <h4 className="font-bold text-white text-base">Tu Vu Tru John Wick: Ballerina (13:15)</h4>
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
            </div>
          )}

          {/* Bookings Approval Tab (Employee restriction guard applies) */}
          {activeTab === 'bookings' && (
            <div className="h-full relative min-h-[300px]">
              {userRole === 'EMPLOYEE' && <EmployeeLockOverlay />}

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white mb-4">Danh Sách Yêu Cầu Huỷ Vé / Đặt Vé Chờ Duyệt</h3>
                
                <div className="bg-zinc-950/60 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-brand-yellow font-black">YÊU CẦU DUYỆT THANH TOÁN</span>
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
            </div>
          )}

          {/* Cinemas Config Tab (Employee restriction guard applies) */}
          {activeTab === 'cinemas' && (
            <div className="h-full relative min-h-[300px]">
              {userRole === 'EMPLOYEE' && <EmployeeLockOverlay />}

              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Hệ Thống Phòng Chiếu & Rạp</h3>
                  <button className="bg-brand-coral text-white text-xs font-black py-2.5 px-4 rounded-xl">
                    THÊM PHÒNG CHIẾU
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-zinc-950/60 border border-zinc-800 p-5 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-white text-sm">Lora Nguyễn Du - Phòng Chiếu 1 (IMAX)</h4>
                      <span className="text-[10px] uppercase font-black text-brand-coral bg-brand-coral/10 border border-brand-coral/20 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs mb-4">Tổng số ghế: 126 ghế | Cấu hình âm thanh Dolby Atmos</p>
                    <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-2 rounded-xl text-xs border border-zinc-800">
                      Sửa Cấu Hình Phòng
                    </button>
                  </div>

                  <div className="bg-zinc-950/60 border border-zinc-800 p-5 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-white text-sm">Lora Thảo Điền - Phòng Chiếu 3 (2D/3D)</h4>
                      <span className="text-[10px] uppercase font-black text-brand-coral bg-brand-coral/10 border border-brand-coral/20 px-2 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs mb-4">Tổng số ghế: 154 ghế | Cấu hình âm thanh Dolby Cinema</p>
                    <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold py-2 rounded-xl text-xs border border-zinc-800">
                      Sửa Cấu Hình Phòng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
