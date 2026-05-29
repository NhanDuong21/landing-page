import { useState } from 'react';
import { Film, ChevronDown, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Header({ onNavigate }) {
  const { user, userRole, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('VIE');

  const handleLogoClick = (e) => {
    e.preventDefault();
    onNavigate('home');
  };

  const handleLogoutClick = () => {
    logout();
    setProfileDropdownOpen(false);
    onNavigate('home');
  };

  const handleAdminViewClick = () => {
    setProfileDropdownOpen(false);
    if (userRole === 'ADMIN') {
      onNavigate('admin');
    } else if (userRole === 'EMPLOYEE') {
      onNavigate('employee');
    }
  };

  // Determine menu items based on role
  let currentMenus = [
    { name: 'Phim', href: '#phim' },
    { name: 'Rạp', href: '#rap' },
    { name: 'Suất chiếu', href: '#suat-chieu' }
  ];

  if (userRole === 'ADMIN') {
    currentMenus = [
      { name: 'Trang Chủ', action: () => onNavigate('home') },
      { name: 'Trang Quản Trị', action: () => onNavigate('admin') }
    ];
  } else if (userRole === 'EMPLOYEE') {
    currentMenus = [
      { name: 'Trang Chủ', action: () => onNavigate('home') },
      { name: 'Trang Nhân Viên', action: () => onNavigate('employee') }
    ];
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-dark/95 backdrop-blur-md px-6 md:px-12 py-4 flex justify-between items-center border-b border-white/5 smooth-transition">
      {/* Left Section: Logo */}
      <a href="/" onClick={handleLogoClick} className="flex items-center gap-2.5 group">
        <div className="bg-brand-coral/10 p-2 rounded-xl group-hover:bg-brand-coral/20 transition-all duration-300">
          <Film className="w-6 h-6 text-brand-coral" />
        </div>
        <span className="text-xl md:text-2xl font-black tracking-tight">
          <span className="text-brand-coral">Lora</span>
          <span className="text-white"> Film</span>
        </span>
      </a>

      {/* Center Section: Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 font-medium">
        {currentMenus.map((item, idx) => {
          if (item.action) {
            return (
              <button
                key={idx}
                onClick={item.action}
                className="text-gray-400 hover:text-brand-coral transition-colors duration-300 relative py-2 group text-sm uppercase tracking-wider font-semibold focus:outline-none"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-coral transition-all duration-300 group-hover:w-full"></span>
              </button>
            );
          }
          return (
            <a
              key={idx}
              href={item.href}
              className="text-gray-400 hover:text-brand-coral transition-colors duration-300 relative py-2 group text-sm uppercase tracking-wider font-semibold"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-coral transition-all duration-300 group-hover:w-full"></span>
            </a>
          );
        })}
      </nav>

      {/* Right Section: Language & Authentication */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setLangDropdownOpen(!langDropdownOpen);
              setProfileDropdownOpen(false);
            }}
            className="text-white flex items-center gap-2 text-sm font-semibold hover:text-brand-coral transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 focus:outline-none"
          >
            <div className="flex items-center gap-1.5">
              {/* Vietnam Flag Badge */}
              <div className="w-4 h-3 flex flex-col justify-between items-center bg-red-600 rounded-[2px] relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-yellow-400 clip-star" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                </div>
              </div>
              <span className="tracking-wide text-xs">{currentLang}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Lang Dropdown */}
          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-brand-gray border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 py-1">
              <button
                onClick={() => {
                  setCurrentLang('VIE');
                  setLangDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-white hover:bg-white/5 flex items-center gap-2"
              >
                <div className="w-4 h-3 bg-red-600 rounded-[2px] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-yellow-400" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                  </div>
                </div>
                Tiếng Việt
              </button>
              <button
                onClick={() => {
                  setCurrentLang('ENG');
                  setLangDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-white hover:bg-white/5 flex items-center gap-2"
              >
                <div className="w-4 h-3 bg-blue-900 rounded-[2px] relative overflow-hidden flex flex-col justify-between">
                  <div className="w-full h-1 bg-red-600"></div>
                  <div className="w-full h-1 bg-white"></div>
                  <div className="w-full h-1 bg-blue-900"></div>
                </div>
                English
              </button>
            </div>
          )}
        </div>

        {/* Auth adaptive controls */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4 relative">
            {/* Notification Bell (Only for Customer role) */}
            {userRole === 'CUSTOMER' && (
              <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-coral rounded-full"></span>
              </button>
            )}

            {/* Profile Avatar Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="w-9 h-9 rounded-full bg-brand-coral/20 border border-brand-coral flex items-center justify-center text-brand-coral hover:bg-brand-coral/30 transition-all font-black text-sm uppercase focus:outline-none"
              >
                {user?.fullName ? user.fullName.charAt(0) : 'U'}
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-brand-gray border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 py-2">
                  <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Tài khoản</p>
                    <p className="text-sm font-bold text-white truncate">{user?.fullName}</p>
                    <p className="text-[10px] text-brand-coral font-semibold uppercase">{userRole}</p>
                  </div>

                  {userRole === 'CUSTOMER' ? (
                    <>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          alert('Chức năng hồ sơ cá nhân đang phát triển!');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-zinc-300 hover:bg-white/5 hover:text-white"
                      >
                        Hồ sơ cá nhân
                      </button>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          alert('Chức năng xem lịch sử đặt vé đang phát triển!');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-zinc-300 hover:bg-white/5 hover:text-white"
                      >
                        Lịch sử đặt vé
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAdminViewClick}
                      className="w-full text-left px-4 py-2.5 text-xs text-brand-yellow hover:bg-white/5 hover:text-white font-bold"
                    >
                      {userRole === 'ADMIN' ? 'Vào Trang Quản Trị' : 'Vào Trang Nhân Viên'}
                    </button>
                  )}

                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-950/20 hover:text-red-300 font-bold border-t border-white/5 mt-1"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => onNavigate('login')}
            className="bg-brand-coral hover:bg-opacity-90 text-white text-xs font-black py-2.5 px-5 rounded-full transition-all duration-300 shadow-lg shadow-brand-coral/20 uppercase tracking-wider"
          >
            Đăng Nhập
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 text-gray-400 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-[73px] left-0 w-full bg-brand-dark/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 md:hidden z-40 animate-in slide-in-from-top duration-300">
          {currentMenus.map((item, idx) => {
            if (item.action) {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    item.action();
                  }}
                  className="text-left text-gray-300 hover:text-brand-coral py-2 text-base font-semibold border-b border-white/5 w-full uppercase"
                >
                  {item.name}
                </button>
              );
            }
            return (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-brand-coral py-2 text-base font-semibold border-b border-white/5 uppercase"
              >
                {item.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
