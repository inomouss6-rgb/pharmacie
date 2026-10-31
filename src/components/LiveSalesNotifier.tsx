import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, Snowflake } from 'lucide-react';

interface SaleNotification {
  name: string;
  city: string;
  product: string;
  tier: string;
  timeAgo: string;
}

const RECENT_SALES: SaleNotification[] = [
  {
    name: 'Sophie M.',
    city: 'Lyon (69)',
    product: 'Wegovy® FlexTouch®',
    tier: 'Bundle 2 Boîtes (-15%)',
    timeAgo: 'il y a 3 min'
  },
  {
    name: 'Thomas D.',
    city: 'Bordeaux (33)',
    product: 'Mounjaro® KwikPen®',
    tier: 'Bundle 5 Boîtes (-30%)',
    timeAgo: 'il y a 6 min'
  },
  {
    name: 'Aurélie & Julien',
    city: 'Nantes (44)',
    product: 'Zepbound™ Auto-Injector',
    tier: 'Bundle 2 Boîtes (-15%)',
    timeAgo: 'il y a 9 min'
  },
  {
    name: 'Claire V.',
    city: 'Paris (75)',
    product: 'Mounjaro® 12.5 mg',
    tier: 'Bundle 2 Boîtes (-15%)',
    timeAgo: 'il y a 14 min'
  }
];

export const LiveSalesNotifier: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first notice after 4 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Toggle periodically
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_SALES.length);
        setVisible(true);
      }, 1000);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  const current = RECENT_SALES[currentIndex];

  return (
    <div className="fixed bottom-24 sm:bottom-6 left-4 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
        <ShoppingBag className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 truncate">
            {current.name} ({current.city})
          </span>
          <span className="text-[10px] text-slate-400 shrink-0 ml-1">
            {current.timeAgo}
          </span>
        </div>
        <div className="text-slate-600 truncate mt-0.5">
          A commandé <strong className="text-slate-900 font-semibold">{current.product}</strong>
        </div>
        <div className="flex items-center gap-2 mt-0.5 text-[10px]">
          <span className="text-emerald-700 font-bold">{current.tier}</span>
          <span className="text-slate-300">·</span>
          <span className="text-sky-700 flex items-center gap-0.5">
            <Snowflake className="w-2.5 h-2.5" /> 2-8°C
          </span>
        </div>
      </div>
    </div>
  );
};
