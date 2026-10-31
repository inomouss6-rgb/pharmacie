import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, CheckCheck, Clock } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  initialMessage = '',
}) => {
  const [message, setMessage] = useState<string>(initialMessage || '');

  if (!isOpen) return null;

  const quickPrompts = [
    'Quelle dose choisir pour débuter ?',
    'Avez-vous du stock disponible pour livraison 24h ?',
    'Quelle est la différence entre Wegovy et Mounjaro ?',
    'Je souhaite commander un bundle 2 boîtes en direct',
  ];

  const handleSendToWhatsApp = (textToSend: string) => {
    const finalMsg = encodeURIComponent(textToSend || message || 'Bonjour, je souhaite des conseils pour commander un bundle GLP-1.');
    // Simulated or direct WhatsApp deep link (using generic international customer support number or prompt)
    const whatsappUrl = `https://wa.me/33756894120?text=${finalMsg}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-[#efeae2] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-300 flex flex-col h-[520px] animate-in fade-in zoom-in-95 duration-200">
        
        {/* WhatsApp Green Header */}
        <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold border border-white">
                <span className="text-sm">Dr</span>
              </div>
              <span className="w-3 h-3 bg-emerald-400 border-2 border-[#075e54] rounded-full absolute bottom-0 right-0" />
            </div>

            <div>
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>Dr. Catherine Laurent</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <div className="text-[11px] text-emerald-100/90 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Pharmacienne conseil · En ligne (réponse &lt; 3 min)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          
          {/* Security and privacy notice */}
          <div className="bg-[#fff3c4] border border-[#ffe082] text-amber-900 text-[10px] p-2 rounded-lg text-center mx-auto max-w-xs shadow-2xs">
            🔒 Échange médical crypté de bout en bout · Respect du secret médical
          </div>

          {/* Doctor incoming message */}
          <div className="flex items-start gap-2 max-w-[85%]">
            <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-2xs space-y-1.5 border border-slate-200">
              <p className="font-semibold text-slate-900">
                Bonjour et bienvenue sur la pharmacie VitalGLP ! 👋
              </p>
              <p className="text-slate-700">
                Je suis à votre disposition pour vous orienter sur le choix de votre molécule (<strong>Wegovy, Mounjaro ou Zepbound</strong>), la posologie d'initiation et les modalités de livraison sous chaîne du froid 2-8°C.
              </p>
              <div className="text-[10px] text-slate-400 text-right flex items-center justify-end gap-1">
                <span>12:45</span>
                <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
              </div>
            </div>
          </div>

          {/* Quick choices pills */}
          <div className="space-y-1.5 pt-2">
            <div className="text-[10px] font-bold text-slate-500 uppercase px-1">
              Questions fréquentes en 1 clic :
            </div>
            <div className="flex flex-col gap-1.5">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setMessage(prompt);
                    handleSendToWhatsApp(prompt);
                  }}
                  className="bg-white hover:bg-emerald-50 text-slate-800 text-left p-2 rounded-lg border border-slate-200 text-xs transition-colors flex items-center justify-between shadow-2xs cursor-pointer"
                >
                  <span>{prompt}</span>
                  <Send className="w-3 h-3 text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Input box */}
        <div className="p-3 bg-[#f0f2f5] border-t border-slate-300 flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendToWhatsApp(message);
            }}
            placeholder="Écrivez votre message WhatsApp..."
            className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-600"
          />

          <button
            onClick={() => handleSendToWhatsApp(message)}
            className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#075e54] text-white flex items-center justify-center transition-colors shadow-xs shrink-0 cursor-pointer"
            aria-label="Envoyer sur WhatsApp"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
