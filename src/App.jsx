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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ShieldAlert } from 'lucide-react';

function AppInner() {
  const [currentView, setCurrentView] = useState({ name: 'home', data: null });
  const [pendingBooking, setPendingBooking] = useState(null);
  const { userRole } = useAuth();

  // Scroll to top on view changes
  const handleViewChange = (newView) => {
    setCurrentView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login Success Callback handler
  const handleLoginSuccess = (loggedInUser) => {
    if (pendingBooking) {
      // Restore cached seat selections and return straight to seats panel
      const restored = pendingBooking;
      setPendingBooking(null);
      handleViewChange({ name: 'seats', data: restored.bookingData });
    } else if (['ADMIN', 'EMPLOYEE'].includes(loggedInUser.role)) {
      // Automatically redirect privileged users to the admin dashboard
      handleViewChange({ name: 'admin', data: null });
    } else {
      handleViewChange({ name: 'home', data: null });
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-20 selection:bg-brand-coral selection:text-white">
      {/* Dynamic sticky header */}
      <Header onNavigate={(viewName) => handleViewChange({ name: viewName, data: null })} />

      {/* Main Content Sections with State-Driven Switch Matrix */}
      <main>
        {/* PRIVILEGED ADMIN ROUTE GUARD CHECK */}
        {currentView.name === 'admin' && !['ADMIN', 'EMPLOYEE'].includes(userRole) ? (
          <div className="bg-zinc-950 text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
            <h1 className="text-2xl font-black uppercase tracking-wider mb-2">403 FORBIDDEN</h1>
            <p className="text-zinc-400 text-sm max-w-md mb-6 leading-relaxed">
              Bạn không có quyền truy cập trang quản trị này! Vui lòng liên hệ quản trị hệ thống hoặc sử dụng tài khoản phù hợp.
            </p>
            <button
              onClick={() => handleViewChange({ name: 'home', data: null })}
              className="bg-brand-coral hover:bg-opacity-95 text-white font-black px-6 py-3 rounded-full uppercase text-xs tracking-wider transition-all"
            >
              Quay lại Trang Chủ
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>

      {/* Sleek Dark Footer */}
      <Footer />
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
