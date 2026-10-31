import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#222222] text-slate-300 py-12 text-xs border-t border-zinc-800 pb-32 sm:pb-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-8 text-center flex flex-col items-center">
        
        {/* 1. Email contact pill */}
        <div>
          <a
            href="mailto:contact-fr@vivami.co"
            className="inline-flex items-center gap-3 text-white hover:text-emerald-300 transition-colors text-base sm:text-lg font-light tracking-wide group"
          >
            {/* Boxed envelope icon */}
            <span className="w-8 h-6 border-[1.5px] border-white/90 rounded-[3px] flex items-center justify-center p-0.5 group-hover:border-emerald-300">
              <svg
                className="w-5 h-4 text-white group-hover:text-emerald-300 transition-colors"
                viewBox="0 0 24 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="22" height="16" x="1" y="1" rx="2" />
                <path d="m2 2 10 7.5L22 2" />
              </svg>
            </span>
            <span className="font-normal">contact-fr@vivami.co</span>
          </a>
        </div>

        {/* 2. Trustpilot Branding Block */}
        <div className="space-y-3.5 flex flex-col items-center">
          {/* Trustpilot logo with iconic 2-tone star */}
          <div className="flex items-center gap-2.5 justify-center">
            <svg
              className="w-8 h-8 sm:w-9 sm:h-9"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="22,2 27.9,14.6 42,16.5 32,26.2 34.4,40.1 22,33.5 9.6,40.1 12,26.2 2,16.5 16.1,14.6"
                fill="#00B67A"
              />
              <polygon
                points="22,33.5 34.4,40.1 32,26.2 22,21.5"
                fill="#005128"
                opacity="0.8"
              />
            </svg>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Trustpilot
            </span>
          </div>

          {/* 5 Green Rating Star Squares */}
          <div className="flex items-center gap-1 sm:gap-1.5 justify-center">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#00B67A] flex items-center justify-center rounded-[2px] shadow-sm"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white"
                  viewBox="0 0 24 24"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            ))}
          </div>

          {/* "Excellent" Headline */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-0.5">
            Excellent
          </h3>

          {/* Trust Score & Customer Count */}
          <p className="text-sm sm:text-base text-zinc-100 font-normal">
            Score de confiance{' '}
            <span className="text-[#00B67A] font-bold underline underline-offset-4 decoration-2">
              4,6
            </span>{' '}
            | 7426 clients
          </p>
        </div>

        {/* 3. Payment Methods Row with requested methods */}
        <div className="space-y-3 pt-2 w-full">
          <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
            Moyens de paiement sécurisés acceptés
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-lg mx-auto">
            {/* PayPal */}
            <div className="h-8 px-3 bg-white rounded-md flex items-center justify-center shadow-xs">
              <span className="font-black text-[#003087] text-sm tracking-tight flex items-center">
                <span className="text-[#0070BA]">Pay</span><span>Pal</span>
              </span>
            </div>

            {/* Coupon Transcash */}
            <div className="h-8 px-2.5 bg-[#1a1a1a] border border-red-500/40 rounded-md flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D91B24]"></span>
              <span className="font-black text-[10px] text-white tracking-wider">
                TRANSCASH
              </span>
              <span className="text-[8px] bg-[#D91B24] text-white font-bold px-1 py-0.2 rounded">
                Coupon
              </span>
            </div>

            {/* Coupon Google */}
            <div className="h-8 px-2.5 bg-white rounded-md flex items-center gap-1.5 shadow-xs">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3.6 1.8L14.2 12 3.6 22.2c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4z" fill="#4285F4"/>
                <path d="M17.7 8.6L14.2 12l3.5 3.4 3.9-2.2c1.1-.6 1.1-1.7 0-2.3l-3.9-2.3z" fill="#FBBC05"/>
                <path d="M3.6 1.8l10.6 10.2 3.5-3.4L6.1.5c-1-.6-2.5-.2-2.5 1.3z" fill="#00E676"/>
                <path d="M3.6 22.2l14.1-8.2-3.5-3.4L3.6 20.8c0 .5.2 1 .6 1.4z" fill="#EA4335"/>
              </svg>
              <span className="font-bold text-[10px] text-slate-800 leading-tight">
                Google <span className="font-normal text-slate-500">Play</span>
              </span>
            </div>

            {/* Coupons Apple Gift */}
            <div className="h-8 px-2.5 bg-white rounded-md flex items-center gap-1.5 shadow-xs">
              <svg className="w-3.5 h-3.5 fill-current text-slate-900 shrink-0" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.85-11.93-14.42-6-9.16-10.74-19.46-14.23-30.89-3.48-11.44-5.23-22.13-5.23-32.08 0-14.42 3.65-26.68 10.96-36.78 7.31-10.1 16.65-15.22 28.02-15.35 4.35 0 9.4 1.22 15.15 3.67 5.75 2.45 9.77 3.73 12.06 3.84 1.96 0 6.13-1.41 12.51-4.23 6.38-2.82 12.06-4.04 17.03-3.67 12.5.65 22.84 5.37 31.02 14.15-10.99 6.64-16.38 15.56-16.17 26.77.22 8.71 3.59 16.05 10.1 22.03 6.51 5.98 14.24 9.41 23.19 10.28-2.18 6.53-4.79 12.94-7.84 19.24zM119.22 33.15c0-6.86 2.5-13.28 7.5-19.26 5-5.98 11.21-9.79 18.63-11.43.87 2.39 1.3 4.9 1.3 7.52 0 6.74-2.55 13.27-7.66 19.59-5.11 6.31-11.28 10.02-18.52 11.13-.44-2.5-.75-5-.75-7.55z" />
              </svg>
              <span className="font-bold text-[10px] text-slate-800">
                Apple <span className="font-normal text-slate-500">Gift</span>
              </span>
            </div>

            {/* Virement bancaire */}
            <div className="h-8 px-2.5 bg-emerald-950/80 border border-emerald-600/40 rounded-md flex items-center gap-1.5 shadow-xs">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Virement SEPA
              </span>
            </div>

            {/* VISA */}
            <div className="h-8 px-2 bg-white rounded-md flex items-center justify-center shadow-xs">
              <svg className="h-4 w-auto" viewBox="0 0 64 20" fill="none">
                <path d="M25.3 19.3L28.6 1.1h5.3l-3.3 18.2h-5.3zM47.7 1.6c-1.1-.4-2.8-.8-4.9-.8-5.4 0-9.2 2.7-9.2 6.6 0 2.9 2.7 4.5 4.8 5.5 2.1 1 2.8 1.7 2.8 2.6 0 1.4-1.8 2.1-3.4 2.1-2.3 0-3.5-.3-5.4-1.1l-.8-.4-.8 4.7c1.4.6 3.9 1.1 6.5 1.1 6.1 0 10.1-2.9 10.1-7 0-2.3-1.5-4.1-4.7-5.5-2-.9-3.2-1.6-3.2-2.5 0-.9 1-1.8 3.1-1.8 1.7 0 3 .3 3.9.7l.5.2.6-4.4zM62.5 1.1h-4.1c-1.3 0-2.2.4-2.8 1.6L47.5 19.3h5.6l1.1-3h6.9l.6 3h4.9L62.5 1.1zm-6.8 11.2l2.2-5.7 1.3 5.7h-3.5zM19.4 1.1L14.2 14.5 13.6 11.4c-1-3.2-4.1-6.7-7.6-8.5l4.9 16.4h5.6l8.3-18.2h-5.4z" fill="#00579F"/>
                <path d="M9.8 1.1H.9L0 1.7c7 1.7 11.6 5.8 13.6 10.9L11.8 2.7C11.5 1.5 10.8 1.1 9.8 1.1z" fill="#FAA61A"/>
              </svg>
            </div>

            {/* MASTERCARD */}
            <div className="h-8 px-2 bg-white rounded-md flex items-center justify-center gap-1 shadow-xs">
              <div className="flex items-center -space-x-1.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] mix-blend-multiply opacity-95" />
              </div>
              <span className="text-[9px] font-bold text-slate-800">
                Mastercard
              </span>
            </div>
          </div>
        </div>

        {/* 4. Official Logistics Shipping Notice */}
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto text-center px-4 font-normal">
          Toutes les commandes effectuées sur notre site sont expédiées par un service de logistique désigné par le patient en deux jours ouvrés.
        </p>

        {/* 5. Minimal footer legal disclaimer & copyright */}
        <div className="w-full pt-8 border-t border-zinc-800/80 text-[11px] text-zinc-500 space-y-2">
          <p>
            VitalGLP Pharmacie & Vivami Services Médicaux. Les traitements Wegovy®, Mounjaro® et Zepbound™ sont des médicaments délivrés selon la réglementation en vigueur.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-500">
            <span>Mentions légales</span>
            <span>•</span>
            <span>Politique de confidentialité</span>
            <span>•</span>
            <span>Conditions Générales de Vente</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
