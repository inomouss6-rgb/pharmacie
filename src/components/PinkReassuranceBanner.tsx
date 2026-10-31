import React from 'react';
import { ShieldCheck, Truck, Award, Lock, Zap, CheckCircle2 } from 'lucide-react';

export const PinkReassuranceBanner: React.FC = () => {
  return (
    <aside aria-label="Garanties d'achat et réassurance" className="w-full bg-[#FCE8E2] border-y border-[#f7d5cc] shadow-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5">
        {/* Desktop and Tablet: 3 columns matching screenshot IMG_20261029_201410_0b7bb124.jpg */}
        <div className="hidden sm:flex items-center justify-between text-[#1e293b]">
          {/* 1. Secure Payment */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-rose-900/80 shadow-2xs">
              <Lock className="w-4 h-4 text-[#8b3a32]" />
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-medium tracking-normal block text-[#1e293b]">
                Secure Payment
              </span>
              <span className="text-[11px] font-sans text-rose-950/70 font-medium">
                Paiement 100% Sécurisé · SSL & 3D Secure
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-rose-300/40" />

          {/* 2. Fast Delivery */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-rose-900/80 shadow-2xs">
              <Truck className="w-4 h-4 text-[#8b3a32]" />
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-medium tracking-normal block text-[#1e293b]">
                Fast Delivery
              </span>
              <span className="text-[11px] font-sans text-rose-950/70 font-medium">
                Expédition Réfrigérée 24-48h Chronofresh
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-rose-300/40" />

          {/* 3. 100% Original */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-rose-900/80 shadow-2xs">
              <Award className="w-4 h-4 text-[#8b3a32]" />
            </div>
            <div>
              <span className="font-serif text-lg md:text-xl font-medium tracking-normal block text-[#1e293b]">
                100% Original
              </span>
              <span className="text-[11px] font-sans text-rose-950/70 font-medium">
                Laboratoires Officiels Novo Nordisk & Lilly
              </span>
            </div>
          </div>
        </div>

        {/* Mobile: Exact layout from screenshot with clear touch-friendly display */}
        <div className="sm:hidden flex items-center justify-between text-[#1e293b] text-center gap-2">
          <div className="flex-1">
            <span className="font-serif text-sm font-semibold block text-[#1e293b] leading-tight">
              Secure Payment
            </span>
            <span className="text-[9px] text-rose-950/70 font-medium block">
              100% Sécurisé
            </span>
          </div>

          <span className="text-rose-400 text-xs">•</span>

          <div className="flex-1">
            <span className="font-serif text-sm font-semibold block text-[#1e293b] leading-tight">
              Fast Delivery
            </span>
            <span className="text-[9px] text-rose-950/70 font-medium block">
              24-48h Réfrigéré
            </span>
          </div>

          <span className="text-rose-400 text-xs">•</span>

          <div className="flex-1">
            <span className="font-serif text-sm font-semibold block text-[#1e293b] leading-tight">
              100% Original
            </span>
            <span className="text-[9px] text-rose-950/70 font-medium block">
              Traitements Certifiés
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
