import React from 'react';
import { ShoppingCart, Zap } from 'lucide-react';
import { FlashSaleCountdown } from './FlashSaleCountdown';

interface StickyActionBarsProps {
  onQuickBuy: () => void;
  onOpenWhatsApp?: () => void;
  totalCartCount: number;
}

export const StickyActionBars: React.FC<StickyActionBarsProps> = ({
  onQuickBuy,
  totalCartCount,
}) => {
  return (
    <>
      {/* Sticky Action Bar for conversion: LEFT purchase button and reassurance */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-3 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-4">
          
          {/* LEFT: Purchase Button + Flash Sale Countdown right next to it */}
          <div className="flex items-center gap-2.5 flex-1 sm:flex-initial">
            <button
              onClick={onQuickBuy}
              className="flex-1 sm:flex-initial sm:min-w-[240px] py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Acheter maintenant</span>
              <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-1.5 py-0.5 rounded font-black">
                -30%
              </span>
            </button>

            {/* Visual Flash Sale Countdown right beside the buy button */}
            <div className="hidden xs:flex sm:flex">
              <FlashSaleCountdown variant="compact" />
            </div>
          </div>

          {/* Reassurance */}
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Zap className="w-3.5 h-3.5 fill-emerald-600" />
              Expédition aujourd'hui garantie
            </span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline text-slate-500">Chaîne du froid 2-8°C certifiée Chronofresh</span>
          </div>

        </div>
      </div>
    </>
  );
};
