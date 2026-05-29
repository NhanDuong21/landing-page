import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import BookingSteps from './components/BookingSteps';
import Footer from './components/Footer';
import MovieDetailView from './components/MovieDetailView';
import SeatSelectionView from './components/SeatSelectionView';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import AdminDashboardView from './components/AdminDashboardView';
import EmployeeDashboardView from './components/EmployeeDashboardView';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppInner() {
  const [currentView, setCurrentView] = useState({ name: 'home', data: null });
  const [pendingBooking, setPendingBooking] = useState(null);
  const { userRole } = useAuth();

  // Scroll to top on view changes
  const handleViewChange = (newView) => {
    setCurrentView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Implicit Authorization Guard Checks
  if (currentView.name === 'admin' && userRole !== 'ADMIN') {
      return <div className="p-20 text-center text-red-500 font-bold">403 FORBIDDEN: Bạn không có quyền truy cập trang quản trị Admin!</div>;
  }
  if (currentView.name === 'employee' && userRole !== 'EMPLOYEE') {
      return <div className="p-20 text-center text-red-500 font-bold">403 FORBIDDEN: Bạn không có quyền truy cập trang Nhân Viên!</div>;
  }

  // Login Success Callback handler
  const handleLoginSuccess = (loggedInUser) => {
    if (pendingBooking) {
      // Restore cached seat selections and return straight to seats panel
      const restored = pendingBooking;
      setPendingBooking(null);
      handleViewChange({ name: 'seats', data: restored.bookingData });
    } else if (loggedInUser.role === 'ADMIN') {
      handleViewChange({ name: 'admin', data: null });
    } else if (loggedInUser.role === 'EMPLOYEE') {
      handleViewChange({ name: 'employee', data: null });
    } else {
      handleViewChange({ name: 'home', data: null });
    }
  };

  const isDashboardView = ['admin', 'employee'].includes(currentView.name);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-brand-coral selection:text-white">
      {/* Dynamic sticky header */}
      {!isDashboardView && <Header onNavigate={(viewName) => handleViewChange({ name: viewName, data: null })} />}

      {/* Main Content Sections with State-Driven Switch Matrix */}
      <main className={`flex-grow ${!isDashboardView ? 'pt-20' : ''}`}>
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
            onRequireLogin={(payload) => {
              setPendingBooking(payload);
              handleViewChange({ name: 'login', data: null });
            }}
          />
        )}

        {currentView.name === 'login' && (
          <LoginView
            onBack={() => {
              setPendingBooking(null);
              handleViewChange({ name: 'home', data: null });
            }}
            onRegisterLink={() => handleViewChange({ name: 'register', data: null })}
            onSuccess={handleLoginSuccess}
          />
        )}

        {currentView.name === 'register' && (
          <RegisterView
            onBack={() => handleViewChange({ name: 'home', data: null })}
            onLoginLink={() => handleViewChange({ name: 'login', data: null })}
            onSuccessRedirect={() => handleViewChange({ name: 'login', data: null })}
          />
        )}

        {currentView.name === 'admin' && (
          <AdminDashboardView onBackHome={() => handleViewChange({ name: 'home', data: null })} />
        )}

        {currentView.name === 'employee' && (
          <EmployeeDashboardView 
            onBackHome={() => handleViewChange({ name: 'home', data: null })}
            onTicketingSelect={(bookingData) => handleViewChange({ name: 'seats', data: bookingData })}
          />
        )}
      </main>

      {/* Sleek Dark Footer */}
      {!isDashboardView && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
