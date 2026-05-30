import { memo } from 'react';

/**
 * GenreCard Component - Displays a single movie genre with hover effects
 * Features:
 * - Background image with lazy loading
 * - Genre name in top-left corner
 * - Overlay darkening on hover
 * - Description fade-in on hover
 * - Clickable with efficient CSS transitions
 */
const GenreCard = memo(function GenreCard({ genre, onSelect }) {
  if (!genre) return null;

  const handleClick = () => {
    onSelect?.(genre.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(genre.id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="relative w-full aspect-square cursor-pointer rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-brand-coral focus:ring-offset-2 focus:ring-offset-brand-dark transition-all duration-300"
      aria-label={`Browse ${genre.name} movies`}
      title={genre.description}
    >
      {/* Background Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={genre.image}
          alt={genre.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Dark Overlay - Appears/Intensifies on Hover */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-300" />

        {/* Genre Name - Always Visible in Top-Left */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10 transition-all duration-300 group-hover:opacity-0">
          <h3 className="text-xl font-black text-white drop-shadow-lg tracking-wide">
            {genre.name}
          </h3>
        </div>

        {/* Description - Fades In on Hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm text-white text-center leading-relaxed font-medium drop-shadow-md">
            {genre.description}
          </p>
        </div>

        {/* Subtle Click Indicator */}
        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-brand-coral/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse">
          <div className="w-2 h-2 rounded-full bg-brand-coral" />
        </div>
      </div>
    </button>
  );
});

export default GenreCard;
