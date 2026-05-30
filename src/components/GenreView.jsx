import { memo, useCallback } from 'react';
import { getSortedGenres } from '../data/genreData';
import GenreCard from './GenreCard';

/**
 * GenreView Component - Displays all movie genres in a responsive grid
 * Features:
 * - 5-column grid on desktop
 * - 3-column on tablet
 * - 2-column on mobile
 * - Alphabetically sorted genres
 * - Lazy loading for performance
 * - Accessibility support
 */
const GenreView = memo(function GenreView({ onSelectGenre, onBack }) {
  const genres = getSortedGenres();

  const handleGenreSelect = useCallback((genreId) => {
    onSelectGenre?.(genreId);
  }, [onSelectGenre]);

  return (
    <section className="relative px-6 md:px-12 py-16 bg-brand-dark min-h-screen">
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-coral"
            aria-label="Go back"
            title="Back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          Explore <span className="text-brand-coral">Genres</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Discover movies by genre. Click on any genre card to view the latest blockbusters and hidden gems.
        </p>
      </div>

      {/* Genres Grid - 5 columns on desktop, responsive on smaller screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {genres.map((genre) => (
          <GenreCard
            key={genre.id}
            genre={genre}
            onSelect={handleGenreSelect}
          />
        ))}
      </div>

      {/* Genre Count Info */}
      <div className="mt-12 text-center text-zinc-500 text-sm">
        <p>Showing {genres.length} genres</p>
      </div>
    </section>
  );
});

export default GenreView;
