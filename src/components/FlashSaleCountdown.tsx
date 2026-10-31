import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

interface FlashSaleCountdownProps {
  variant?: 'inline' | 'compact' | 'badge' | 'full';
  className?: string;
  showStockNotice?: boolean;
}

export const FlashSaleCountdown: React.FC<FlashSaleCountdownProps> = ({
  variant = 'inline',
  className = '',
  showStockNotice = false,
}) => {
  // Stable countdown stored in sessionStorage or initialized to 2h 14m 36s
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 2, minutes: 14, seconds: 36 });

  useEffect(() => {
    const STORAGE_KEY = 'vitalglp_flash_sale_end';
    let targetTime = 0;
    
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        targetTime = parseInt(stored, 10);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }

    // If no valid future time, set target to 2 hours 17 minutes 45 seconds from now
    if (!targetTime || targetTime <= Date.now()) {
      targetTime = Date.now() + (2 * 3600 + 17 * 60 + 45) * 1000;
      try {
        sessionStorage.setItem(STORAGE_KEY, targetTime.toString());
      } catch {
        // Ignore
      }
    }

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      if (diff === 0) {
        // Reset countdown for continuous urgency loop
        const newTarget = Date.now() + (1 * 3600 + 45 * 60) * 1000;
        try {
          sessionStorage.setItem(STORAGE_KEY, newTarget.toString());
        } catch {
          // Ignore
        }
        targetTime = newTarget;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTwoDigits = (num: number) => num.toString().padStart(2, '0');

  // Compact variant: ideal for sticky bar or inline right next to buttons
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold shadow-2xs select-none ${className}`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
        </span>
        <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse shrink-0" />
        <span className="font-bold text-rose-900">Offre flash expire dans :</span>
        <div className="flex items-center font-mono font-black text-rose-700 bg-white px-1.5 py-0.5 rounded border border-rose-300/80 shadow-2xs tracking-wider">
          <span>{formatTwoDigits(timeLeft.hours)}</span>
          <span className="animate-pulse mx-0.5">:</span>
          <span>{formatTwoDigits(timeLeft.minutes)}</span>
          <span className="animate-pulse mx-0.5">:</span>
          <span className="text-rose-600">{formatTwoDigits(timeLeft.seconds)}</span>
        </div>
      </div>
    );
  }

  // Badge variant: subtle & clean
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-1.5 text-xs text-rose-700 font-medium ${className}`}>
        <Flame className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
        <span>Offre flash expire dans</span>
        <span className="font-mono font-extrabold bg-rose-100 text-rose-900 px-1.5 py-0.5 rounded text-[11px]">
          {formatTwoDigits(timeLeft.hours)}h {formatTwoDigits(timeLeft.minutes)}m {formatTwoDigits(timeLeft.seconds)}s
        </span>
      </div>
    );
  }

  // Full variant: prominent urgency box directly before or next to buy buttons
  if (variant === 'full') {
    return (
      <div className={`p-3 rounded-xl bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border border-rose-200/90 shadow-xs text-slate-800 space-y-1.5 ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
              <Flame className="w-4 h-4 text-rose-600 shrink-0 fill-rose-500" />
              <span>Offre flash expire dans :</span>
            </div>
          </div>

          {/* Time digits boxes */}
          <div className="flex items-center gap-1 font-mono text-xs">
            <div className="flex flex-col items-center">
              <span className="bg-white border border-rose-300 text-rose-700 font-black px-1.5 py-0.5 rounded shadow-2xs text-xs">
                {formatTwoDigits(timeLeft.hours)}
              </span>
              <span className="text-[9px] text-slate-500 font-sans mt-0.5">h</span>
            </div>
            <span className="font-bold text-rose-500 -mt-3.5">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-white border border-rose-300 text-rose-700 font-black px-1.5 py-0.5 rounded shadow-2xs text-xs">
                {formatTwoDigits(timeLeft.minutes)}
              </span>
              <span className="text-[9px] text-slate-500 font-sans mt-0.5">min</span>
            </div>
            <span className="font-bold text-rose-500 -mt-3.5">:</span>
            <div className="flex flex-col items-center">
              <span className="bg-rose-600 border border-rose-700 text-white font-black px-1.5 py-0.5 rounded shadow-2xs text-xs animate-pulse">
                {formatTwoDigits(timeLeft.seconds)}
              </span>
              <span className="text-[9px] text-rose-600 font-sans font-bold mt-0.5">sec</span>
            </div>
          </div>
        </div>

        {showStockNotice && (
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-rose-200/60 text-slate-600">
            <span className="flex items-center gap-1 text-rose-700 font-medium">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Remise jusqu'à -30% + Livraison réfrigérée offerte dès 2 achetés
            </span>
            <span className="font-bold text-amber-700 hidden sm:inline">
              ⚡ Seulement 7 stylos restants en stock
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default Inline Variant: placed seamlessly right next to the buy button
  return (
    <div className={`flex items-center gap-2 py-1 px-3 rounded-lg bg-rose-50/90 border border-rose-200/90 text-rose-900 shadow-2xs select-none ${className}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
      </span>
      <Flame className="w-3.5 h-3.5 text-rose-600 shrink-0 fill-rose-500" />
      <span className="text-xs font-bold text-rose-900">
        Offre flash expire dans :
      </span>
      <div className="flex items-center gap-1 font-mono font-black text-xs text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-300 shadow-2xs">
        <span>{formatTwoDigits(timeLeft.hours)}h</span>
        <span className="text-rose-400">:</span>
        <span>{formatTwoDigits(timeLeft.minutes)}m</span>
        <span className="text-rose-400">:</span>
        <span className="text-rose-600">{formatTwoDigits(timeLeft.seconds)}s</span>
      </div>
    </div>
  );
};
