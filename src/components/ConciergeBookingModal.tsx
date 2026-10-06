import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Users,
  ShieldCheck,
  Building2,
  Ticket
} from 'lucide-react';
import { Boutique } from '../types/boutique';
import { BOUTIQUES_DATA } from '../data/boutiques';

interface ConciergeBookingModalProps {
  initialBoutique?: Boutique | null;
  onClose: () => void;
}

const SERVICES_LIST = [
  'Cita con Personal Stylist Exclusivo',
  'Salón Privado VIP & Champagne Tasting',
  'Atelier de Sastrería & Ajuste en Vivo',
  'Presentación Privada de Nueva Colección',
  'Tour Arquitectónico & Curaduría de Diseño'
];

const TIME_SLOTS = [
  '11:00 AM',
  '12:30 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '07:30 PM'
];

const ADVISORS = [
  { name: 'Charles Silva', role: 'Head Stylist & Curator', boutique: 'Chic Boutique' },
  { name: 'Elena Rostova', role: 'Senior Luxury Advisor', boutique: 'Aura Alpine' },
  { name: 'Matteo Bernardi', role: 'Maison High Jewelry Specialist', boutique: 'Palazzo Salamanca' },
  { name: 'Sofía Montiel', role: 'Sustainable Prêt-à-Porter Lead', boutique: 'Studio Boutique Santa Fe' }
];

export const ConciergeBookingModal: React.FC<ConciergeBookingModalProps> = ({
  initialBoutique,
  onClose
}) => {
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string>(
    initialBoutique?.id || BOUTIQUES_DATA[0].id
  );
  const [selectedService, setSelectedService] = useState<string>(SERVICES_LIST[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-10');
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[2]);
  const [selectedAdvisor, setSelectedAdvisor] = useState<string>(ADVISORS[0].name);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingCode, setBookingCode] = useState<string>('');

  const selectedBoutique =
    BOUTIQUES_DATA.find((b) => b.id === selectedBoutiqueId) || BOUTIQUES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    // Generate VIP booking code
    const randomCode =
      'VIP-' + Math.floor(100000 + Math.random() * 900000).toString();
    setBookingCode(randomCode);
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#18181b] border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-7 my-auto text-[#e5e1e4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Confirmation Pass Screen */
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-[#064e3b]/80 border border-[#059669] flex items-center justify-center mx-auto text-[#34d399] shadow-[0_0_24px_rgba(5,150,105,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#4edea3]">
                CITA CONFIRMADA EXITOSAMENTE
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                Pase de Concierge VIP Generado
              </h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                Hemos enviado tu confirmación y credencial digital a{' '}
                <b className="text-zinc-200">{email}</b>. Tu anfitrión privado te recibirá en la entrada de la boutique.
              </p>
            </div>

            {/* Visual VIP Ticket */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#201f21] border border-white/10 text-left max-w-lg mx-auto shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-[#c0c1ff]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {selectedBoutique.name}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#c0c1ff] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {bookingCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 font-semibold">
                    Titular VIP
                  </span>
                  <p className="font-bold text-white mt-0.5">{fullName}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 font-semibold">
                    Experiencia
                  </span>
                  <p className="font-bold text-[#4edea3] mt-0.5 truncate">
                    {selectedService}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 font-semibold">
                    Fecha &amp; Horario
                  </span>
                  <p className="font-bold text-white mt-0.5">
                    {selectedDate} • {selectedTime}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-zinc-400 font-semibold">
                    Asesor Asignado
                  </span>
                  <p className="font-bold text-zinc-200 mt-0.5">
                    {selectedAdvisor}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Invitados: {guestCount} persona(s)</span>
                <span className="text-[#4edea3] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Acceso Preferencial
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-[#c0c1ff] hover:bg-[#8083ff] text-[#0d0096] font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Cerrar y Volver a Boutiques
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#c0c1ff]/20 border border-[#c0c1ff]/30 flex items-center justify-center text-[#c0c1ff]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  Agendar Cita Privada &amp; Concierge VIP
                </h2>
                <p className="text-xs text-zinc-400">
                  Atención exclusiva personalizada en salones privados
                </p>
              </div>
            </div>

            {/* Boutique Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Boutique o Sucursal Deseada
              </label>
              <select
                value={selectedBoutiqueId}
                onChange={(e) => setSelectedBoutiqueId(e.target.value)}
                className="w-full bg-[#201f21] border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c0c1ff] cursor-pointer"
              >
                {BOUTIQUES_DATA.map((b) => (
                  <option key={b.id} value={b.id} className="bg-[#18181b] text-white">
                    {b.name} ({b.city}, {b.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Tipo de Experiencia
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES_LIST.map((srv) => {
                  const isSelected = selectedService === srv;
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => setSelectedService(srv)}
                      className={`text-left p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#c0c1ff]/15 border-[#c0c1ff] text-[#c0c1ff] shadow-[0_0_12px_rgba(192,193,255,0.2)]'
                          : 'bg-[#201f21] border-white/5 text-zinc-300 hover:border-white/15'
                      }`}
                    >
                      {srv}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date, Time & Guests Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Fecha
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#201f21] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c0c1ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Horario
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-[#201f21] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c0c1ff] cursor-pointer"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t} className="bg-[#18181b]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Acompañantes
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-[#201f21] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c0c1ff] cursor-pointer"
                >
                  <option value={1} className="bg-[#18181b]">Solo yo (1 persona)</option>
                  <option value={2} className="bg-[#18181b]">2 personas (Con acompañante)</option>
                  <option value={3} className="bg-[#18181b]">3 personas (Grupo privado)</option>
                  <option value={4} className="bg-[#18181b]">4 personas (Delegación VIP)</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Isabella de la Torre"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#201f21] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c0c1ff] placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="isabella@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#201f21] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c0c1ff] placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                WhatsApp de Contacto Directo
              </label>
              <input
                type="tel"
                placeholder="+57 300 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#201f21] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c0c1ff] placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#c0c1ff] hover:bg-[#8083ff] text-[#0d0096] font-bold text-sm transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Confirmar Cita VIP &amp; Recibir Pase</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
