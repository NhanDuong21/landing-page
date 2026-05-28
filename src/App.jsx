import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import BookingSteps from './components/BookingSteps';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-brand-dark min-h-screen text-white pt-20 selection:bg-brand-coral selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main>
        {/* Cinematic Hero Banner */}
        <Hero />

        {/* Featured Films Grid */}
        <MovieGrid />

        {/* Horizontal Booking Workflow steps */}
        <BookingSteps />
      </main>

      {/* Sleek Dark Footer */}
      <Footer />
    </div>
  );
}

export default App;
