import { Film, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-10 px-6 md:px-12 flex flex-col gap-6 md:gap-0 md:flex-row justify-between items-center text-sm text-gray-500">
      
      {/* Left Section: Logo & Copyright */}
      <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
        <a href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-coral/10 p-1.5 rounded-lg">
            <Film className="w-5 h-5 text-brand-coral" />
          </div>
          <span className="text-lg font-black tracking-tight">
            <span className="text-brand-coral">Lora</span>
            <span className="text-white"> Film</span>
          </span>
        </a>
        <span className="hidden md:inline text-gray-700">|</span>
        <span className="text-xs md:text-sm text-gray-400">
          2026 Lora Film. Movie Tickets, Your Way.
        </span>
      </div>

      {/* Center Section: Social Media Icon Row */}
      <div className="flex items-center gap-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-coral transition-all duration-300"
          aria-label="Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-coral transition-all duration-300"
          aria-label="Instagram"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-coral transition-all duration-300"
          aria-label="YouTube"
        >
          <Youtube className="w-4 h-4" />
        </a>
        {/* TikTok SVG Icon */}
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-coral transition-all duration-300"
          aria-label="TikTok"
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.78-.22-.22-.41-.47-.59-.73v6.38c.01 4.15-2.9 8.16-7.07 8.35-4.14.27-8.12-2.54-8.8-6.61-.83-4.32 2.05-8.87 6.42-9.42 1.34-.18 2.74-.03 4 .43V4.85c-1.78-.66-3.79-.5-5.38.52-2.15 1.36-3.23 4.11-2.61 6.56.5 2.22 2.23 4.14 4.47 4.58 2.65.57 5.56-.93 6.16-3.57.12-.52.17-1.06.17-1.6V.02z" />
          </svg>
        </a>
      </div>

      {/* Right Section: Built-with Micro-badge */}
      <div>
        <div className="text-xs bg-brand-gray px-3.5 py-2 rounded-xl border border-white/5 flex items-center gap-1.5 text-gray-400 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-coral"></span>
          Built by React Vite & Tailwind
        </div>
      </div>

    </footer>
  );
}
