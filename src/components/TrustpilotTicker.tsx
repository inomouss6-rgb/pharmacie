import React from 'react';
import { TRUSTPILOT_REVIEWS } from '../data/reviews';
import { CheckCircle2, Heart } from 'lucide-react';

export const TrustpilotTicker: React.FC = () => {
  // Duplicate for seamless infinite marquee loop
  const duplicatedReviews = [...TRUSTPILOT_REVIEWS, ...TRUSTPILOT_REVIEWS];

  return (
    <div className="bg-slate-900 text-white py-6 overflow-hidden border-y border-slate-800 relative">
      {/* Header bar of Trustpilot banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white tracking-wide uppercase text-xs">Trustpilot</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-[#00b67a] w-4 h-4 flex items-center justify-center rounded-[2px]">
                  <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <span className="text-slate-300 text-xs hidden sm:inline">
            Score <strong className="text-white">4.9 / 5</strong> basé sur <strong className="text-white">2 890+ avis réels</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Avis 100% Vérifiés après Expédition Chaîne du Froid</span>
        </div>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right gradient fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10" />

        <div className="animate-marquee flex gap-4 py-2">
          {duplicatedReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[320px] sm:w-[380px] shrink-0 bg-slate-800/80 border border-slate-700/80 rounded-xl p-4.5 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Stars and verified badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-[#00b67a] w-4 h-4 flex items-center justify-center rounded-[2px]">
                        <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </div>
                    ))}
                    {rev.kilosLost && (
                      <span className="ml-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                        {rev.kilosLost}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-white mb-1.5 leading-snug line-clamp-1">
                  {rev.title}
                </h4>

                {/* Content */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                  "{rev.content}"
                </p>
              </div>

              {/* Family Reaction or Quote Footer */}
              <div className="pt-2.5 border-t border-slate-700/60 mt-1">
                {rev.familyReaction && (
                  <p className="text-[11px] text-amber-300/90 italic flex items-center gap-1.5 mb-2 font-medium">
                    <Heart className="w-3 h-3 text-rose-400 shrink-0 fill-rose-400" />
                    <span>{rev.familyReaction}</span>
                  </p>
                )}
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 font-medium text-slate-200">
                    <span>{rev.author}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 text-[10px]">{rev.city}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Achat vérifié
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
