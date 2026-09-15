import React, { useState } from 'react';
import { MessageSquare, X, Send, Shield, Sparkles } from 'lucide-react';

interface WhatsAppButtonProps {
  activeCarSummary?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ activeCarSummary }) => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '221778600000'; // Dakar, Senegal (+221)

  const defaultMessage = activeCarSummary
    ? `Bonjour Almadies Prestige Motors, je souhaiterais obtenir des informations confidentielles et convenir d'une visite privée pour le véhicule suivant : ${activeCarSummary}.`
    : `Bonjour Almadies Prestige Motors, je souhaiterais échanger avec un conseiller pour une visite privée du showroom aux Almadies.`;

  const [customMsg, setCustomMsg] = useState('');

  const handleSend = () => {
    const textToSend = customMsg.trim() || defaultMessage;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-40">
      {/* Popover Chat Card */}
      {isOpen && (
        <div
          id="whatsapp-concierge-popover"
          className="mb-3 w-[320px] sm:w-[360px] bg-[#12141a] border border-[#272b38] shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#212430] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-[#1e232e] border border-[#c8a46b] flex items-center justify-center text-[#c8a46b]">
                <MessageSquare className="w-4 h-4 text-[#4ade80]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#4ade80] ring-2 ring-[#12141a]" />
              </div>
              <div>
                <span className="font-serif-luxury text-sm text-[#f5f2eb] block leading-tight">
                  Conciergerie Privée
                </span>
                <span className="text-[10px] uppercase font-sans-clean tracking-wider text-[#4ade80]">
                  En ligne • Les Almadies
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8e8779] hover:text-white transition-colors p-1"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Prompt / Context */}
          <div className="p-3 bg-[#0d0f14] border border-[#1e222d] text-xs font-sans-clean text-[#a8a294] space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#c8a46b] font-medium block">
              Liaison Sécurisée Directe
            </span>
            <p className="leading-relaxed">
              {activeCarSummary ? (
                <>
                  Modèle ciblé : <strong className="text-white">{activeCarSummary}</strong>
                </>
              ) : (
                'Posez vos questions techniques, demandez un dossier complet ou réservez votre créneau privé.'
              )}
            </p>
          </div>

          {/* Custom message input */}
          <div className="space-y-2">
            <textarea
              id="whatsapp-custom-message-input"
              rows={2}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder={defaultMessage}
              className="w-full p-2.5 bg-[#0a0c10] border border-[#232734] text-xs text-[#eee9df] placeholder-[#6b6557] focus:border-[#c8a46b] focus:outline-none resize-none"
            />
            <button
              id="whatsapp-submit-action-btn"
              onClick={handleSend}
              className="w-full py-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ouvrir dans WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-whatsapp-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 px-4 py-3 bg-[#13151b]/95 hover:bg-[#1a1d25] border border-[#c8a46b]/60 hover:border-[#c8a46b] text-[#f2ede4] shadow-2xl backdrop-blur-md transition-all duration-300 cursor-pointer"
        aria-label="Contacter la conciergerie sur WhatsApp"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-[#1a3a26] border border-[#2a7a4a] flex items-center justify-center text-[#4ade80]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4ade80] ring-2 ring-[#13151b] animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4ade80] ring-2 ring-[#13151b]" />
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="font-serif-luxury text-xs text-[#f2ede4] group-hover:text-[#e6cb9d] transition-colors">
            Concierge Almadies
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#a1998b]">
            WhatsApp Disponible
          </span>
        </div>
      </button>
    </div>
  );
};
