import React from 'react';

interface TrustpilotBadgeProps {
  score?: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const TrustpilotBadge: React.FC<TrustpilotBadgeProps> = ({
  score = 4.9,
  reviewsCount = 2890,
  size = 'md',
}) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`bg-[#00b67a] flex items-center justify-center p-0.5 rounded-[2px] ${starSizes[size]}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="w-full h-full"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        ))}
      </div>
      <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
        <span className="font-bold text-[#00b67a]">{score}/5</span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-600 font-medium">
          {reviewsCount.toLocaleString('fr-FR')} avis Trustpilot
        </span>
      </div>
    </div>
  );
};
