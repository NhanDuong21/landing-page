import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import BookingSteps from './components/BookingSteps';
import Footer from './components/Footer';
import MovieDetailView from './components/MovieDetailView';
import SeatSelectionView from './components/SeatSelectionView';

function App() {
  const [currentView, setCurrentView] = useState({ name: 'home', data: null });

  // Scroll to top on view changes
  const handleViewChange = (newView) => {
    setCurrentView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-20 selection:bg-brand-coral selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Sections with State-Driven Switch Matrix */}
      <main>
        {currentView.name === 'home' && (
          <>
            {/* Cinematic Hero Banner */}
            <Hero />

            {/* Featured Films Grid */}
            <MovieGrid
              onSelectMovie={(movieId) => handleViewChange({ name: 'detail', data: { movieId } })}
              onBuyTicket={(bookingData) => handleViewChange({ name: 'seats', data: bookingData })}
            />

            {/* Horizontal Booking Workflow steps */}
            <BookingSteps />
          </>
        )}

        {currentView.name === 'detail' && (
          <MovieDetailView
            movieId={currentView.data.movieId}
            onSelectShowtime={(bookingData) => handleViewChange({ name: 'seats', data: bookingData })}
            onBack={() => handleViewChange({ name: 'home', data: null })}
          />
        )}

        {currentView.name === 'seats' && (
          <SeatSelectionView
            bookingData={currentView.data}
            onBack={() => handleViewChange({ name: 'home', data: null })}
          />
        )}
      </main>

      {/* Sleek Dark Footer */}
      <Footer />
    </div>
  );
}

export default App;
