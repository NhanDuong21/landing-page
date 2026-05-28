import { Ticket, Armchair, CreditCard } from 'lucide-react';

export default function BookingSteps() {
  const steps = [
    {
      id: 1,
      icon: Ticket,
      title: '1. SELECT MOVIE & SESSION',
      description: 'Tìm kiếm bộ phim yêu thích của bạn và chọn suất chiếu phù hợp nhất.'
    },
    {
      id: 2,
      icon: Armchair,
      title: '2. CHOOSE SEATS',
      description: 'Lựa chọn vị trí ngồi đẹp nhất trong rạp với sơ đồ ghế ngồi trực quan.'
    },
    {
      id: 3,
      icon: CreditCard,
      title: '3. PAY SECURELY',
      description: 'Thanh toán an toàn, nhanh chóng và nhận vé điện tử ngay qua Email/SMS.'
    }
  ];

  return (
    <section id="steps" className="px-6 md:px-12 py-8 bg-brand-dark">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <span className="text-brand-coral font-bold tracking-widest text-xs uppercase block mb-1">
          Quy trình đơn giản
        </span>
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          MUA VÉ CHỈ VỚI 3 BƯỚC NHANH CHÓNG
        </h3>
      </div>

      <div className="bg-brand-gray/50 border border-white/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-coral/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-coral/10 rounded-full filter blur-3xl pointer-events-none"></div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div 
              key={step.id} 
              className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="bg-brand-coral/10 group-hover:bg-brand-coral/25 text-brand-coral p-4 rounded-2xl mb-4 transition-all duration-300 transform group-hover:scale-110">
                <Icon className="w-8 h-8" />
              </div>

              {/* Step Title */}
              <h4 className="text-brand-coral font-extrabold text-sm md:text-base tracking-wider uppercase mb-2">
                {step.title}
              </h4>

              {/* Step Description */}
              <p className="text-xs text-gray-400 leading-relaxed max-w-[240px]">
                {step.description}
              </p>

              {/* Connectors for desktop */}
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-brand-coral/30 to-transparent w-16" style={{ left: `${(index + 1) * 31}%` }}></div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
