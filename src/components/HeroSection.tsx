import React from 'react';
import { TrustpilotBadge } from './TrustpilotBadge';
import { ShieldCheck, Snowflake, Sparkles, MessageCircle, ArrowRight, Zap, Check } from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/imageUrl';

interface HeroSectionProps {
  onExploreBundles: () => void;
  onOpenWhatsApp: () => void;
  onSelectProduct: (productId: 'wegovy' | 'mounjaro' | 'zepbound') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreBundles,
  onOpenWhatsApp,
  onSelectProduct,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 pt-8 pb-14 border-b border-slate-200">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Trustpilot live badge and stock alert */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
            <TrustpilotBadge score={4.9} reviewsCount={2890} size="sm" />
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Stock officiel certifié Eli Lilly & Novo Nordisk en direct
          </div>
        </div>

        {/* Main 2-Column Hero layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Compelling copy that drives action */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Retrouvez votre silhouette et{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                le sourire en famille
              </span>{' '}
              grâce aux traitements GLP-1 de référence.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Accédez aux innovations médicales majeures <strong className="text-slate-900 font-semibold">Wegovy®</strong>, <strong className="text-slate-900 font-semibold">Mounjaro®</strong> et <strong className="text-slate-900 font-semibold">Zepbound™</strong>. Offres exclusives en <strong className="text-emerald-700 font-semibold">bundles 1, 2 ou 5 boîtes jusqu’à -30%</strong> avec expédition réfrigérée 24h à température contrôlée.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-medium text-slate-700 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span>Résultats cliniques prouvés : <strong>-15% à -22% de poids</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span>Expédition express <strong>Chronofresh 2-8°C</strong> garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span>Accompagnement <strong>médical WhatsApp 7j/7</strong> inclus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span>Garantie <strong>Satisfait ou Remboursé 30 jours</strong></span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onExploreBundles}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>Commander un Bundle (-30%)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Conseil & Commande WhatsApp</span>
              </button>
            </div>

            {/* Urgency ticker */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-xs text-amber-900">
              <Zap className="w-4 h-4 text-amber-600 shrink-0 fill-amber-500" />
              <span>
                <strong>Forte demande aujourd’hui :</strong> Expédition sous 24h garantie pour toute commande validée avant 16h00.
              </span>
            </div>

          </div>

          {/* Right Column: Visual Showcase of the 3 Products + User's Uploaded transformation preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Nos 3 Traitements Vedettes
                </div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Stock Garanti
                </div>
              </div>

              {/* Product 1: Wegovy */}
              <div
                onClick={() => onSelectProduct('wegovy')}
                className="group p-3 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/40 transition-all cursor-pointer flex items-center gap-3.5"
              >
                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
                  <img
                    src={getAssetUrl('/assets/aistudio/436_1_14ba29ab.jpeg')}
                    alt="Wegovy 1mg FlexTouch"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm truncate">Wegovy® FlexTouch®</h3>
                    <span className="text-xs font-bold text-sky-700">Dès 202€/boîte</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Sémaglutide · Perte moyenne -15.8%</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-emerald-600 font-semibold">
                    <span>Bundle 1, 2 ou 5 boîtes</span>
                    <span>·</span>
                    <span className="text-slate-400">Novo Nordisk</span>
                  </div>
                </div>
              </div>

              {/* Product 2: Mounjaro */}
              <div
                onClick={() => onSelectProduct('mounjaro')}
                className="group p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all cursor-pointer flex items-center gap-3.5"
              >
                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
                  <img
                    src={getAssetUrl('/assets/aistudio/Mounjaro-KwikPen-Display_a0f5e31b.png')}
                    alt="Mounjaro KwikPen"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    loading="lazy"
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm truncate">Mounjaro® KwikPen®</h3>
                    <span className="text-xs font-bold text-indigo-700">Dès 223€/boîte</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Tirzépatide GIP + GLP-1 · Double Action</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-emerald-600 font-semibold">
                    <span>Perte clinique record -22.5%</span>
                    <span>·</span>
                    <span className="text-slate-400">Eli Lilly</span>
                  </div>
                </div>
              </div>

              {/* Product 3: Zepbound */}
              <div
                onClick={() => onSelectProduct('zepbound')}
                className="group p-3 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-all cursor-pointer flex items-center gap-3.5"
              >
                <div className="w-16 h-16 rounded-lg bg-teal-50 overflow-hidden shrink-0 flex items-center justify-center border border-teal-200 text-teal-700">
                  <div className="text-center font-black leading-tight text-xs">
                    ZEP
                    <br />
                    <span className="text-[10px] text-teal-600 font-semibold">LILLY</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm truncate">Zepbound™ Auto-Injector</h3>
                    <span className="text-xs font-bold text-teal-700">Dès 230€/boîte</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Tirzépatide Pure Minceur · Formule 2026</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-emerald-600 font-semibold">
                    <span>Mono-clic sécurisé</span>
                    <span>·</span>
                    <span className="text-slate-400">Économie -30%</span>
                  </div>
                </div>
              </div>

              {/* Real before/after preview banner */}
              <div className="bg-slate-900 text-white rounded-xl p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                    <img
                      src={getAssetUrl('/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg')}
                      alt="Témoignage réel"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Kelsey & 1 450+ patients</span>
                      <span className="text-emerald-400 font-black">-57 kg</span>
                    </div>
                    <p className="text-[11px] text-slate-300">« Une vie de famille totalement retrouvée »</p>
                  </div>
                </div>
                <a
                  href="#avant-apres"
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 whitespace-nowrap"
                >
                  Voir les photos
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
