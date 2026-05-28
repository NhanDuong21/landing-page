import { Star, Clock } from 'lucide-react';
import { movies } from '../data/mockData';

export default function MovieGrid() {
  return (
    <section id="phim" className="relative px-6 md:px-12 py-16 bg-brand-dark">
      {/* Grid Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <span className="text-brand-coral font-bold tracking-widest text-xs uppercase block mb-1">
            Lịch chiếu hôm nay
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-wider uppercase">
            FEATURED FILMS THIS WEEK
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="bg-brand-coral text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:shadow-brand-coral/25">
            Đang Chiếu
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-bold px-4 py-2 rounded-full border border-white/5">
            Sắp Chiếu
          </button>
        </div>
      </div>

      {/* Grid System */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="bg-brand-gray rounded-xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 target-shadow flex flex-col border border-white/5"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[2/3] overflow-hidden w-full bg-brand-dark/40">
              <img
                src={movie.image}
                alt={movie.title}
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full"
                loading="lazy"
              />

              {/* Top-Left: Massive semi-transparent index number */}
              <div className="absolute top-1 left-2 pointer-events-none select-none z-10 font-sans font-black text-5xl md:text-6xl text-white/30 drop-shadow-md">
                {index + 1}
              </div>

              {/* Top-Right: Rating Badge */}
              <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 bg-brand-yellow text-black text-[10px] md:text-xs font-black px-1.5 py-0.5 rounded shadow-lg">
                <Star className="w-2.5 h-2.5 fill-current" />
                {movie.rating.toFixed(1)}
              </div>

              {/* Bottom Dimmed Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Hover Action State Button */}
              <button className="bg-brand-coral hover:bg-opacity-90 text-white text-[10px] md:text-xs font-bold py-2.5 w-11/12 rounded absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg shadow-brand-coral/30">
                MUA VE / BOOK NOW
              </button>
            </div>

            {/* Card Info */}
            <div className="p-3 flex-grow flex flex-col justify-between bg-brand-gray">
              <div>
                <span className="truncate text-xs md:text-sm font-bold text-white mt-1 block group-hover:text-brand-coral transition-colors duration-300" title={movie.title}>
                  {movie.title}
                </span>
                <span className="text-[10px] md:text-xs text-gray-400 block mt-1 truncate">
                  {movie.genre}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-gray-500 mt-2 pt-2 border-t border-white/5">
                <Clock className="w-3 h-3 text-brand-coral" />
                <span>{movie.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
