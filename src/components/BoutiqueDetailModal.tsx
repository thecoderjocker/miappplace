import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Sparkles,
  Navigation,
  Share2,
  Heart,
  CheckCircle2,
  Clock,
  Layers,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Boutique } from '../types/boutique';

interface BoutiqueDetailModalProps {
  boutique: Boutique | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBookAppointment: (boutique: Boutique) => void;
  onRequestDirections: (boutique: Boutique) => void;
  onShare: (boutique: Boutique) => void;
}

export const BoutiqueDetailModal: React.FC<BoutiqueDetailModalProps> = ({
  boutique,
  onClose,
  isFavorite,
  onToggleFavorite,
  onBookAppointment,
  onRequestDirections,
  onShare,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!boutique) return null;

  const currentImage = boutique.gallery[activeImageIdx] || boutique.image;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#18181b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-auto text-[#e5e1e4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(boutique.id)}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
            title={isFavorite ? 'Quitar de favoritas' : 'Añadir a favoritas'}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
            />
          </button>
          <button
            onClick={() => onShare(boutique)}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
            title="Compartir"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-md cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
          {/* Left Column: Visual Gallery & Specs */}
          <div className="w-full md:w-1/2 bg-[#131315] p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div>
              {/* Main Photo */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#201f21] border border-white/5 shadow-inner">
                <img
                  src={currentImage}
                  alt={boutique.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#4edea3]">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span>{boutique.stateText}</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {boutique.gallery.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
                  {boutique.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        activeImageIdx === i
                          ? 'border-[#c0c1ff] shadow-[0_0_12px_rgba(192,193,255,0.4)] scale-105'
                          : 'border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${boutique.name} foto ${i + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Architectural Specs */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-[#1c1b1d] border border-white/5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    Superficie
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {boutique.sqm} m² de exhibición
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    Arquitectura
                  </span>
                  <p className="text-xs font-semibold text-zinc-200 mt-0.5 truncate" title={boutique.architect}>
                    {boutique.architect}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    Stock Disponible
                  </span>
                  <p className="text-sm font-bold text-[#4edea3] mt-0.5 flex items-center gap-1">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    +{boutique.stockCount.toLocaleString()} ítems
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                    Afluencia en Vivo
                  </span>
                  <p className="text-xs font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {boutique.occupancy.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Operator Card Mini */}
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                  style={{ backgroundColor: boutique.operator.avatarBg }}
                >
                  {boutique.operator.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {boutique.operator.name}
                    <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                  </h4>
                  <span className="text-[10px] text-zinc-400">
                    Equipo de dirección • {boutique.operator.badgeText}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Details, Services, Schedule & Booking */}
          <div className="w-full md:w-1/2 p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Header Title */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c0c1ff]/15 border border-[#c0c1ff]/30 text-[#c0c1ff] text-[10px] font-bold uppercase tracking-wider">
                    {boutique.categoryLabel}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {boutique.city}, {boutique.country}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1">
                  {boutique.name}
                </h2>
                <p className="text-xs text-[#c7c4d7] mt-1.5 leading-relaxed">
                  {boutique.description}
                </p>
              </div>

              {/* Address & Quick Contact */}
              <div className="p-3.5 rounded-2xl bg-[#201f21] border border-white/5 space-y-2 text-xs">
                <div className="flex items-start gap-2 text-zinc-300">
                  <MapPin className="w-4 h-4 text-[#c0c1ff] shrink-0 mt-0.5" />
                  <span>{boutique.address}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-zinc-400">
                  <a
                    href={`tel:${boutique.phone}`}
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#4edea3]" />
                    <span>{boutique.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${boutique.conciergeWhatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white flex items-center gap-1 text-[#4edea3] font-semibold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp VIP</span>
                  </a>
                </div>
              </div>

              {/* Operating Hours Table */}
              <div className="p-3.5 rounded-2xl bg-[#201f21] border border-white/5">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                  <span className="text-xs font-bold uppercase text-zinc-300 tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#c0c1ff]" />
                    Horario de Atención Oficial
                  </span>
                  <span className="text-[11px] text-zinc-400">Hora local</span>
                </div>
                <table className="w-full text-xs">
                  <tbody>
                    {boutique.schedule.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx < boutique.schedule.length - 1 ? 'border-b border-white/5' : ''}
                      >
                        <td className="py-1 text-zinc-300">{item.days}</td>
                        <td
                          className={`py-1 text-right tabular-nums ${
                            item.isSpecial
                              ? 'font-medium text-amber-400'
                              : 'font-semibold text-white'
                          }`}
                        >
                          {item.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Exclusive Services */}
              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                  Servicios Exclusivos en Tienda
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {boutique.services.map((srv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3] shrink-0" />
                      <span className="truncate">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => onBookAppointment(boutique)}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#c0c1ff] hover:bg-[#8083ff] text-[#0d0096] font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(192,193,255,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Agendar Cita Privada</span>
              </button>

              <button
                onClick={() => onRequestDirections(boutique)}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#27272a] hover:bg-[#323238] border border-white/10 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Navigation className="w-4 h-4 text-[#4edea3]" />
                <span>Cómo Llegar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
