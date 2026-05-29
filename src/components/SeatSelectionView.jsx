import { useState, useMemo } from 'react';
import { ArrowLeft, CheckCircle, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const SEAT_PRICES = {
  standard: 80000,
  vip: 110000,
  couple: 220000
};

export default function SeatSelectionView({ bookingData, onBack, onRequireLogin }) {
  const { isAuthenticated } = useAuth();
  // Support restoring selected seats after dynamic redirection authentication
  const [selectedSeats, setSelectedSeats] = useState(bookingData.selectedSeats || []);
  const [toastMessage, setToastMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { movieTitle, date, cinema, time, format } = bookingData;

  // Determine occupied seats based on a deterministic hash so they are stable per showtime
  const occupiedSeats = useMemo(() => {
    const occupied = new Set();
    const hashSeed = (cinema + time + date).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    ROWS.forEach((row) => {
      const seatCount = row === 'J' ? 6 : 12;
      for (let col = 1; col <= seatCount; col++) {
        const label = `${row}${col}`;
        // Pseudo-random assignment using math hash (approx 15-20% occupied)
        const val = (row.charCodeAt(0) * 11 + col * 17 + hashSeed) % 6;
        if (val === 0) {
          occupied.add(label);
        }
      }
    });
    return occupied;
  }, [cinema, time, date]);

  // Handle seat click
  const handleSeatClick = (label) => {
    if (occupiedSeats.has(label)) return;

    if (selectedSeats.includes(label)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== label));
      setToastMessage('');
    } else {
      if (selectedSeats.length >= 8) {
        showToast('Bạn chỉ được chọn tối đa 8 ghế cho mỗi giao dịch!');
        return;
      }
      setSelectedSeats([...selectedSeats, label]);
      setToastMessage('');
    }
  };

  // Helper to show custom warning toasts
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const getSeatType = (row) => {
    if (row === 'J') return 'couple';
    if (['F', 'G', 'H', 'I'].includes(row)) return 'vip';
    return 'standard';
  };

  const totalAmount = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => {
      const row = seat.charAt(0);
      const type = getSeatType(row);
      return sum + SEAT_PRICES[type];
    }, 0);
  }, [selectedSeats]);

  // Format currency in VND
  const formatCurrency = (val) => {
    return val.toLocaleString('vi-VN') + 'đ';
  };

  const handleCheckoutSubmit = () => {
    if (selectedSeats.length === 0) return;

    if (!isAuthenticated) {
      // Trigger login redirect and cache selections
      if (onRequireLogin) {
        onRequireLogin({
          bookingData: {
            ...bookingData,
            selectedSeats // attach current selected seats state
          }
        });
      }
      return;
    }

    setShowSuccessModal(true);
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-10 px-6 md:px-12 flex flex-col justify-between">
      {/* Top Breadcrumb Header Strip */}
      <div className="max-w-6xl w-full mx-auto mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-brand-coral transition-colors mb-4 text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] bg-brand-coral/10 text-brand-coral border border-brand-coral/20 px-2 py-0.5 rounded font-black uppercase tracking-wider text-xs mr-2">
              {format}
            </span>
            <h1 className="text-xl font-black text-white inline-block">{movieTitle}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-zinc-400">
            <div>
              <span className="text-zinc-600 font-bold mr-1">Rạp:</span>
              <span className="text-zinc-200 font-semibold">{cinema}</span>
            </div>
            <div>
              <span className="text-zinc-600 font-bold mr-1">Suất chiếu:</span>
              <span className="text-brand-coral font-black">{time}</span>
            </div>
            <div>
              <span className="text-zinc-600 font-bold mr-1">Ngày:</span>
              <span className="text-zinc-200 font-semibold">{date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen & Matrix Container */}
      <div className="flex-grow max-w-6xl w-full mx-auto flex flex-col justify-center my-6 relative">
        {/* Toast Warning Popup */}
        {toastMessage && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce border border-red-500 text-sm">
            <Info className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* The Silver Screen Curve */}
        <div className="w-full max-w-lg mx-auto mb-16 text-center">
          <div className="h-1.5 bg-gradient-to-r from-transparent via-brand-coral to-transparent shadow-[0_0_20px_rgba(216,129,116,0.9)] rounded-full mb-2"></div>
          <span className="text-zinc-500 text-[10px] md:text-xs tracking-[0.4em] font-black uppercase">MÀN HÌNH CHÍNH / MAIN SCREEN</span>
        </div>

        {/* Architectural Seating Grid */}
        <div className="w-full overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="min-w-[620px] max-w-2xl mx-auto px-4">
            <div className="space-y-3">
              {ROWS.map((row) => {
                const isCoupleRow = row === 'J';
                const seatCount = isCoupleRow ? 6 : 12;

                return (
                  <div key={row} className="flex items-center gap-3">
                    {/* Row Label Left */}
                    <span className="w-4 text-center font-black text-xs text-zinc-500">{row}</span>

                    {/* Seats Row Grid */}
                    <div className="flex-grow grid grid-cols-12 gap-2">
                      {Array.from({ length: seatCount }).map((_, idx) => {
                        const colNumber = idx + 1;
                        const label = `${row}${colNumber}`;
                        const isOccupied = occupiedSeats.has(label);
                        const isSelected = selectedSeats.includes(label);
                        
                        let seatClass;
                        let textLabel = label;

                        if (isOccupied) {
                          seatClass = 'bg-zinc-900 border border-zinc-800 text-zinc-600 line-through opacity-40 cursor-not-allowed pointer-events-none';
                        } else if (isSelected) {
                          seatClass = 'bg-emerald-500 border-emerald-400 text-black font-extrabold shadow-lg shadow-emerald-500/20';
                        } else {
                          // Type styling
                          if (isCoupleRow) {
                            seatClass = 'bg-rose-600/20 border border-rose-500/80 hover:bg-rose-500/40 text-rose-300';
                          } else if (['F', 'G', 'H', 'I'].includes(row)) {
                            seatClass = 'bg-amber-600/20 border border-amber-500/80 hover:bg-amber-500/40 text-amber-300';
                          } else {
                            seatClass = 'bg-zinc-800 border border-zinc-700 hover:border-amber-500 text-zinc-400';
                          }
                        }

                        // Couple seat occupies double width span
                        const colSpan = isCoupleRow ? 'col-span-2' : 'col-span-1';

                        if (isCoupleRow) {
                          textLabel = `J${colNumber * 2 - 1}-J${colNumber * 2}`;
                        }

                        return (
                          <button
                            key={label}
                            disabled={isOccupied}
                            onClick={() => handleSeatClick(label)}
                            className={`${colSpan} aspect-square md:aspect-auto md:h-10 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-semibold tracking-tighter transition-all duration-200 select-none ${seatClass}`}
                            aria-label={`Select seat ${textLabel}`}
                          >
                            {textLabel}
                          </button>
                        );
                      })}
                    </div>

                    {/* Row Label Right */}
                    <span className="w-4 text-center font-black text-xs text-zinc-500">{row}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend Map */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-xs md:text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zinc-800 border border-zinc-700"></div>
            <span>Ghế thường (80k)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-600/20 border border-amber-500"></div>
            <span>Ghế VIP (110k)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-5 rounded bg-rose-600/20 border border-rose-500"></div>
            <span>Ghế Đôi (220k)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-500 border border-emerald-400"></div>
            <span>Đang chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-zinc-900 border border-zinc-800 line-through opacity-40 flex items-center justify-center text-[8px]">X</div>
            <span>Đã đặt</span>
          </div>
        </div>
      </div>

      {/* Bottom Subtotal Checkout Panel */}
      <div className="max-w-6xl w-full mx-auto mt-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-auto text-center lg:text-left">
            <span className="text-zinc-500 text-xs font-black uppercase tracking-wider block mb-1">GHẾ ĐÃ CHỌN</span>
            <div className="text-white text-lg font-black min-h-[28px] max-w-xl truncate">
              {selectedSeats.length > 0 ? (
                selectedSeats.map(seat => {
                  const row = seat.charAt(0);
                  if (row === 'J') {
                    const col = parseInt(seat.substring(1));
                    return `J${col * 2 - 1}-J${col * 2}`;
                  }
                  return seat;
                }).join(', ')
              ) : (
                <span className="text-zinc-600 italic">Vui lòng chọn ghế từ sơ đồ</span>
              )}
            </div>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-6 shrink-0 justify-center">
            <div className="text-center sm:text-right shrink-0">
              <span className="text-zinc-500 text-xs font-black uppercase tracking-wider block mb-1">TỔNG TIỀN</span>
              <span className="text-2xl md:text-3xl font-black text-brand-coral">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={handleCheckoutSubmit}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-wider shadow-lg transition-all duration-300 transform ${
                selectedSeats.length > 0
                  ? 'bg-brand-coral hover:bg-opacity-90 text-white cursor-pointer hover:scale-105 shadow-brand-coral/20'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
              }`}
            >
              Đặt Vé Ngay
            </button>
          </div>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden animate-in zoom-in duration-300">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-coral/10 rounded-full filter blur-3xl pointer-events-none"></div>

            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            
            <h3 className="text-2xl font-black text-white uppercase tracking-wide mb-2">ĐẶT VÉ THÀNH CÔNG</h3>
            <p className="text-zinc-400 text-sm mb-6">
              Cảm ơn bạn đã lựa chọn Lora Film. Dưới đây là thông tin vé của bạn:
            </p>

            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 text-left space-y-2.5 text-sm mb-6">
              <div>
                <span className="text-zinc-500">Phim:</span>
                <span className="float-right text-white font-extrabold">{movieTitle}</span>
              </div>
              <div>
                <span className="text-zinc-500">Định dạng:</span>
                <span className="float-right text-brand-yellow font-extrabold">{format}</span>
              </div>
              <div>
                <span className="text-zinc-500">Rạp:</span>
                <span className="float-right text-zinc-200 font-semibold">{cinema}</span>
              </div>
              <div>
                <span className="text-zinc-500">Suất chiếu:</span>
                <span className="float-right text-white font-extrabold">{time} | {date}</span>
              </div>
              <div>
                <span className="text-zinc-500">Ghế chọn:</span>
                <span className="float-right text-emerald-400 font-extrabold">
                  {selectedSeats.map(seat => {
                    const row = seat.charAt(0);
                    if (row === 'J') {
                      const col = parseInt(seat.substring(1));
                      return `J${col * 2 - 1}-J${col * 2}`;
                    }
                    return seat;
                  }).join(', ')}
                </span>
              </div>
              <div className="border-t border-zinc-800/80 pt-2.5 mt-2.5">
                <span className="text-zinc-500 font-bold">Tổng thanh toán:</span>
                <span className="float-right text-brand-coral font-black text-base">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                onBack(); // Go back home
              }}
              className="w-full bg-brand-coral hover:bg-opacity-95 text-white font-black py-4 rounded-xl shadow-lg transition-colors duration-300 uppercase tracking-wider text-xs"
            >
              Quay lại Trang Chủ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
