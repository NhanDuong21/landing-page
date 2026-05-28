import { useState } from 'react';
import { Film, ChevronDown, User, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('VIE');

  const menuItems = [
    { name: 'Phim', href: '#phim' },
    { name: 'Rap', href: '#rap' },
    { name: 'Suat chieu', href: '#suat-chieu' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-dark/90 backdrop-blur-md px-6 md:px-12 py-4 flex justify-between items-center border-b border-white/5 smooth-transition">
      {/* Left Section: Logo */}
      <a href="/" className="flex items-center gap-2.5 group">
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
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-400 hover:text-brand-coral transition-colors duration-300 relative py-2 group text-sm uppercase tracking-wider"
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-coral transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      {/* Right Section: Language & Profile */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="text-white flex items-center gap-2 text-sm font-semibold hover:text-brand-coral transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5"
          >
            <div className="flex items-center gap-1.5">
              {/* Vietnam Flag Badge */}
              <div className="w-4 h-3 flex flex-col justify-between items-center bg-red-600 rounded-[2px] relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-yellow-400 clip-star" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                </div>
              </div>
              <span className="tracking-wide">{currentLang}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
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

        {/* User Profile */}
        <button className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-brand-coral/20 text-white hover:text-brand-coral transition-all duration-300" aria-label="User Profile">
          <User className="w-5 h-5" />
        </button>

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
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 hover:text-brand-coral py-2 text-base font-semibold border-b border-white/5"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
