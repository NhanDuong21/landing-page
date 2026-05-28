import { Search, Play, Calendar, MapPin } from 'lucide-react';

export default function Hero() {
  // Thay thế link này bằng link clip trailer phim của bạn nếu có
  const videoSource = 'src/assets/hero-video.mp4';

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 overflow-hidden bg-brand-dark">
      
      {/* Background Video Implementation */}
<div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover scale-105 opacity-75 transition-all duration-700" // Tăng opacity lên 75% để video sáng rõ hơn, bỏ filter blur gốc
    src={videoSource}
  />
</div>

{/* Lớp phủ Gradient mỏng và trong suốt hơn để giữ độ sáng cho video */}
<div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-brand-dark/40 z-10 backdrop-blur-[1px]"></div>

      {/* Main Left Content Area */}
      <div className="relative z-20 max-w-4xl mt-auto mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
        <span className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-full font-extrabold uppercase tracking-widest inline-flex items-center gap-1.5 mb-4 shadow-lg shadow-red-600/30">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          HOT | PHIM HOT TRONG THANG
        </span>

        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight uppercase mb-2 leading-none">
          KHAM PHA THE GIOI <br />
          <span className="text-gradient">PHIM CUA BAN</span>
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
          <span className="text-2xl md:text-3xl font-black text-brand-coral tracking-widest uppercase">
            LORA FILM
          </span>
          <span className="hidden sm:inline text-gray-500">|</span>
          <span className="text-sm md:text-base text-gray-400 font-medium italic tracking-wider">
            "MOVIE TICKETS, YOUR WAY"
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => {
              const element = document.getElementById('phim');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 bg-brand-coral text-white font-bold px-8 py-4 rounded-full hover:bg-opacity-95 hover:shadow-brand-coral/25 shadow-lg transition-all transform hover:scale-105 duration-300"
          >
            <Play className="w-5 h-5 fill-current text-white" />
            DAT VE NGAY
          </button>
          
          <button 
            onClick={() => {
              const element = document.getElementById('steps');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-6 py-4 rounded-full transition-all duration-300"
          >
            Tìm hiểu thêm
          </button>
        </div>
      </div>

      {/* Interactive Search Bar Overlay in the hero base */}
      <div className="relative z-20 w-full max-w-4xl mx-auto mt-6">
        <div className="bg-brand-gray/40 backdrop-blur-xl border border-brand-coral/30 hover:border-brand-coral/60 rounded-2xl md:rounded-full p-2 md:p-3 shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <Search className="w-5 h-5 text-brand-coral shrink-0" />
              <input 
                type="text" 
                placeholder="Tim phim, rap, hoac thanh pho..." 
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-sm md:text-base"
              />
            </div>

            {/* Quick selectors */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <MapPin className="w-4 h-4 text-brand-coral shrink-0" />
              <select className="bg-transparent text-gray-300 outline-none text-sm cursor-pointer pr-4 appearance-none" aria-label="Select Location">
                <option value="all" className="bg-brand-gray">Toàn quốc</option>
                <option value="hcm" className="bg-brand-gray">Hồ Chí Minh</option>
                <option value="hn" className="bg-brand-gray">Hà Nội</option>
                <option value="dn" className="bg-brand-gray">Đà Nẵng</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-3 px-4 py-2">
              <Calendar className="w-4 h-4 text-brand-coral shrink-0" />
              <select className="bg-transparent text-gray-300 outline-none text-sm cursor-pointer pr-4 appearance-none" aria-label="Select Date">
                <option value="today" className="bg-brand-gray">Hôm nay</option>
                <option value="tomorrow" className="bg-brand-gray">Ngày mai</option>
                <option value="weekend" className="bg-brand-gray">Cuối tuần</option>
              </select>
            </div>

            {/* Search Action Button */}
            <button className="bg-brand-coral hover:bg-opacity-95 text-white font-bold px-6 py-3 rounded-xl md:rounded-full transition-all text-sm shrink-0 uppercase tracking-wider">
              Tìm kiếm
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}