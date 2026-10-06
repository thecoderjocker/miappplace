import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Send,
  QrCode
} from 'lucide-react';
import { Boutique } from '../types/boutique';

interface ShareModalProps {
  boutique: Boutique | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ boutique, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!boutique) return null;

  const currentUrl = window.location.href.split('?')[0] + `?boutique=${boutique.id}`;
  const shareText = `Descubre ${boutique.name} (${boutique.city}) en la Red Global de Boutiques Exclusivas: ${currentUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsapp = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Visita ${boutique.name} en ${boutique.city}`
  )}&url=${encodeURIComponent(currentUrl)}`;
  const shareEmail = `mailto:?subject=${encodeURIComponent(
    `Invitación a ${boutique.name} - ${boutique.city}`
  )}&body=${encodeURIComponent(shareText)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-6 my-auto text-[#e5e1e4]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#c0c1ff]/20 border border-[#c0c1ff]/30 flex items-center justify-center text-[#c0c1ff]">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Compartir Boutique
            </h2>
            <p className="text-xs text-zinc-400">
              Envía la ubicación e información exclusiva
            </p>
          </div>
        </div>

        {/* Boutique preview item */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#201f21] border border-white/5 mb-4">
          <img
            src={boutique.image}
            alt={boutique.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-xl object-cover"
          />
          <div className="flex-1 truncate">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
              {boutique.name}
            </h4>
            <p className="text-[11px] text-zinc-400 truncate">
              {boutique.niche} • {boutique.city}
            </p>
          </div>
        </div>

        {/* Copy Link field */}
        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Enlace Directo
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-[#201f21] border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 select-all focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 ${
                copied
                  ? 'bg-[#064e3b] text-[#34d399] border border-[#059669]'
                  : 'bg-[#c0c1ff] text-[#0d0096] hover:bg-[#8083ff]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Share Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <a
            href={shareWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-200 flex flex-col items-center justify-center gap-1 text-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#4edea3]" />
            <span className="font-semibold">WhatsApp</span>
          </a>

          <a
            href={shareTwitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-200 flex flex-col items-center justify-center gap-1 text-xs transition-colors"
          >
            <Send className="w-4 h-4 text-[#7bd0ff]" />
            <span className="font-semibold">X / Twitter</span>
          </a>

          <a
            href={shareEmail}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-200 flex flex-col items-center justify-center gap-1 text-xs transition-colors"
          >
            <Mail className="w-4 h-4 text-[#c0c1ff]" />
            <span className="font-semibold">Correo</span>
          </a>
        </div>
      </div>
    </div>
  );
};
