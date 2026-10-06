import React from 'react';
import { Sparkles, Shield, Clock, PhoneCall, Headphones } from 'lucide-react';

interface VipConciergeBannerProps {
  onOpenBooking: () => void;
}

export const VipConciergeBanner: React.FC<VipConciergeBannerProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full mt-10 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#1c1b1d] via-[#201f21] to-[#1c1b1d] border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#c0c1ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left side info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#c0c1ff]/15 border border-[#c0c1ff]/30 flex items-center justify-center text-[#c0c1ff] shrink-0 shadow-[0_0_20px_rgba(192,193,255,0.2)]">
            <Headphones className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#4edea3]">
                Servicio Concierge VIP &bull; Línea Activa 24/7
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              ¿Deseas una visita privada fuera del horario habitual?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Coordinamos aperturas exclusivas de boutique a puerta cerrada, servicios de chófer privado Maybach y catering selecto para clientes distinguidos.
            </p>
          </div>
        </div>

        {/* Right side CTA actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <a
            href="tel:+34915823340"
            className="flex-1 sm:flex-initial py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#4edea3]" />
            <span>Llamar Directo</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-[#c0c1ff] hover:bg-[#8083ff] text-[#0d0096] text-xs font-bold transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Solicitar Concierge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
