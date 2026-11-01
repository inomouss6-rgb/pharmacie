import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, BundleTier } from '../types';
import { Check, ShieldCheck, Zap, Sparkles, Snowflake, ArrowRight } from 'lucide-react';
import { FlashSaleCountdown } from './FlashSaleCountdown';
import { getAssetUrl, handleImageError } from '../utils/imageUrl';

interface BundlesSectionProps {
  onDirectBuy: (product: Product, dose: string, tier: BundleTier) => void;
  onAddToCart: (product: Product, dose: string, tier: BundleTier) => void;
}

export const BundlesSection: React.FC<BundlesSectionProps> = ({
  onDirectBuy,
  onAddToCart,
}) => {
  const [selectedQtyFilter, setSelectedQtyFilter] = useState<1 | 2 | 5>(2);

  return (
    <section id="bundles" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tarifs Dégressifs Exclusifs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Choisissez votre Pack Bundle & Économisez jusqu'à -30%
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Comparez nos 3 traitements phares pour la quantité de votre choix. Tous les packs dès 2 boîtes incluent la livraison express réfrigérée gratuite et le suivi médical.
          </p>

          {/* Interactive Tier Switcher */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-800 rounded-xl border border-slate-700">
              <button
                onClick={() => setSelectedQtyFilter(1)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedQtyFilter === 1
                    ? 'bg-white text-slate-900 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1 Boîte (1 Mois)
              </button>
              <button
                onClick={() => setSelectedQtyFilter(2)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer relative ${
                  selectedQtyFilter === 2
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>2 Boîtes (-15%)</span>
                <span className="hidden sm:inline-block ml-1.5 text-[10px] bg-slate-900 text-emerald-300 px-1.5 py-0.2 rounded uppercase">
                  Top Choix
                </span>
              </button>
              <button
                onClick={() => setSelectedQtyFilter(5)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedQtyFilter === 5
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                5 Boîtes (-30% Max)
              </button>
            </div>
          </div>
        </div>

        {/* 3 Product Cards comparison for the selected tier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRODUCTS.map((prod) => {
            const tier = prod.bundleTiers.find((t) => t.quantity === selectedQtyFilter) || prod.bundleTiers[0];
            const isHighlighted = prod.id === 'mounjaro';

            return (
              <div
                key={prod.id}
                className={`rounded-2xl flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.025] hover:shadow-2xl relative group ${
                  isHighlighted
                    ? 'bg-slate-800/95 border-2 border-emerald-400 shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/20 p-6'
                    : 'bg-slate-800/60 border border-slate-700 p-6 hover:border-emerald-400/80 hover:shadow-slate-950/60'
                }`}
              >
                {/* Highlight Tag */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[11px] font-black uppercase px-3.5 py-1 rounded-full shadow-md tracking-wider">
                    Efficacité Clinique N°1
                  </div>
                )}

                <div className="space-y-4">
                  {/* Top info */}
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">{prod.brand}</span>
                      <h3 className="text-lg font-black text-white">{prod.name}</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {prod.clinicalTrial.stat}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="h-36 rounded-xl bg-slate-900/80 flex items-center justify-center p-3 overflow-hidden border border-slate-700/60">
                    <img
                      src={getAssetUrl(prod.image)}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      loading="lazy"
                      className="max-h-full object-contain drop-shadow"
                    />
                  </div>

                  {/* Price Block */}
                  <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700 text-center">
                    <div className="text-xs text-slate-400 uppercase font-bold">
                      Pack {tier.quantity} Boîte{tier.quantity > 1 ? 's' : ''} ({tier.quantity} Mois)
                    </div>
                    <div className="flex items-baseline justify-center gap-2 mt-1">
                      <span className="text-3xl font-black text-white">{tier.totalPrice} €</span>
                      {tier.originalTotalPrice > tier.totalPrice && (
                        <span className="text-sm text-slate-500 line-through">
                          {tier.originalTotalPrice} €
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-emerald-400 font-bold mt-0.5">
                      Soit {tier.unitPrice} € / boîte
                    </div>
                    {tier.savings > 0 && (
                      <div className="text-[11px] font-extrabold text-rose-400 mt-1">
                        Vous économisez {tier.savings} € immédiatement
                      </div>
                    )}
                  </div>

                  {/* Perks list */}
                  <ul className="space-y-2 text-xs text-slate-300">
                    {tier.perks.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Button with Flash Sale Countdown */}
                <div className="pt-5 mt-6 border-t border-slate-700/80 space-y-2">
                  <FlashSaleCountdown variant="compact" className="w-full justify-between" />

                  <button
                    onClick={() => onDirectBuy(prod, prod.defaultDose, tier)}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                      isHighlighted
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        : 'bg-white hover:bg-slate-100 text-slate-900'
                    }`}
                  >
                    <span>Commander ce Bundle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
                    <Snowflake className="w-3 h-3 text-sky-400" />
                    <span>Expédié sous 24h à 2-8°C</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Global reassurance guarantees strip */}
        <div className="mt-12 bg-slate-800/80 border border-slate-700 rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-emerald-400 font-extrabold text-sm sm:text-base">100% Officiel</div>
            <div className="text-slate-400 text-xs">Direct laboratoires Lilly & Novo</div>
          </div>
          <div className="space-y-1">
            <div className="text-emerald-400 font-extrabold text-sm sm:text-base">Chronofresh 2-8°C</div>
            <div className="text-slate-400 text-xs">Chaîne du froid certifiée en 24h</div>
          </div>
          <div className="space-y-1">
            <div className="text-emerald-400 font-extrabold text-sm sm:text-base">Remboursement 30J</div>
            <div className="text-slate-400 text-xs">Garantie satisfaction totale</div>
          </div>
          <div className="space-y-1">
            <div className="text-emerald-400 font-extrabold text-sm sm:text-base">Support WhatsApp</div>
            <div className="text-slate-400 text-xs">Conseils médicaux en 5 min</div>
          </div>
        </div>

      </div>
    </section>
  );
};
