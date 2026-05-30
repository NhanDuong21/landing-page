import { useState, useMemo, memo } from 'react';
import { Star, Clock } from 'lucide-react';
import { MOVIES } from '../data/mockData';
import { getGenreById } from '../data/genreData';
import TrailerModal from './TrailerModal';

/**
 * FilteredMoviesView Component - Displays movies filtered by a selected genre
 * Features:
 * - 5-column grid on desktop
 * - Responsive grid on tablets and mobile
 * - Sorted by popularity/rating
 * - Lazy loading for images
 * - Trailer modal support
 * - Accessibility support
 */
const FilteredMoviesView = memo(function FilteredMoviesView({ 
  genreId, 
  onSelectMovie, 
  onBuyTicket, 
  onBack 
}) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeTrailerId, setActiveTrailerId] = useState(null);

  const genre = getGenreById(genreId);

  // Filter movies by genre and sort by rating (popularity)
  const filteredMovies = useMemo(() => {
    if (!genreId) return [];
    
    return MOVIES
      .filter((movie) => {
        // Only show currently showing movies for genre filtering
        if (movie.status !== 'NOW_SHOWING') return false;
        const genreIds = movie.genreIds || [];
        return genreIds.includes(genreId);
      })
      .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating (popularity)
      .slice(0, visibleCount);
  }, [genreId, visibleCount]);

  const displayedMovies = filteredMovies;

  const handleBuyTicketClick = (e, movie) => {
    e.stopPropagation();
    const defaultShowtime = {
      movieId: movie.id,
      movieTitle: movie.title,
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      fullDate: new Date().toLocaleDateString('vi-VN'),
      cinema: 'Lora Nguyen Du',
      time: '19:30',
      format: '2D DIGITAL'
    };
    onBuyTicket?.(defaultShowtime);
  };

  const handleTrailerClick = (e, trailerId) => {
    e.stopPropagation();
    setActiveTrailerId(trailerId);
  };

  if (!genre) {
    return (
      <section className="relative px-6 md:px-12 py-16 bg-brand-dark min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg">Genre not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 md:px-12 py-16 bg-brand-dark min-h-screen">
      {/* Trailer Modal */}
      {activeTrailerId && (
        <TrailerModal
          trailerId={activeTrailerId}
          onClose={() => setActiveTrailerId(null)}
        />
      )}

      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-coral"
            aria-label="Go back"
            title="Back to genres"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          {genre.name} <span className="text-brand-coral">Movies</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          {displayedMovies.length > 0
            ? `Showing ${displayedMovies.length} ${genre.name} movies, sorted by popularity`
            : `No ${genre.name} movies available yet`}
        </p>
      </div>

      {/* Movies Grid - 5 columns on desktop, responsive on smaller screens */}
      {displayedMovies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            {displayedMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => onSelectMovie?.(movie.id)}
                className="bg-brand-gray rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-2 flex flex-col border border-white/5 shadow-2xl"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[2/3] overflow-hidden w-full bg-zinc-900 rounded-xl shadow-lg">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80';
                    }}
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-brand-coral/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg z-10">
                    <Star className="w-3.5 h-3.5 fill-white text-white" />
                    <span className="text-xs font-bold text-white">{movie.rating.toFixed(1)}</span>
                  </div>

                  {/* Age Rating Badge */}
                  {movie.ageRating && (
                    <div className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-brand-coral z-10">
                      {movie.ageRating}
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black via-black/80 to-transparent p-4 space-y-2 z-20">
                    <button
                      onClick={(e) => handleBuyTicketClick(e, movie)}
                      className="w-full bg-brand-coral hover:bg-brand-coral/90 text-white font-bold py-2 rounded-lg transition-colors text-sm"
                    >
                      Buy Ticket
                    </button>
                    {movie.trailerId && (
                      <button
                        onClick={(e) => handleTrailerClick(e, movie.trailerId)}
                        className="w-full border border-brand-coral text-brand-coral hover:bg-brand-coral/10 font-bold py-2 rounded-lg transition-colors text-sm"
                      >
                        Watch Trailer
                      </button>
                    )}
                  </div>
                </div>

                {/* Movie Info */}
                <div className="flex-grow p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-2 mb-2">
                      {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{movie.duration}</span>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2">{movie.genre}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < MOVIES.length && displayedMovies.length >= visibleCount && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="px-8 py-3 bg-brand-coral hover:bg-brand-coral/90 text-white font-bold rounded-lg transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-400 text-lg">
            No movies available in this genre yet. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
});

export default FilteredMoviesView;
