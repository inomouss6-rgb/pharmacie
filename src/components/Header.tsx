import React from 'react';
import { ShoppingBag, ShieldCheck, PhoneCall, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenWhatsApp: () => void;
  onSelectProduct: (productId: 'wegovy' | 'mounjaro' | 'zepbound') => void;
  onOpenShopifyExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  onOpenWhatsApp,
  onSelectProduct,
  onOpenShopifyExport,
}) => {
  const totalCartCount = cart.reduce((sum, item) => sum + (item.tier.quantity * item.count), 0);

  return (
    <>
      {/* Top continuous scrolling marquee announcement bar (Bande défilante à l'entête) */}
      <div className="bg-emerald-800 text-white text-xs font-semibold py-2 overflow-hidden border-b border-emerald-900/60 shadow-inner relative select-none">
        <div className="relative w-full overflow-hidden">
          {/* Subtle gradient edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-emerald-800 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-emerald-800 to-transparent z-10" />

          <div className="animate-header-marquee flex items-center gap-8 whitespace-nowrap">
            {[...Array(2)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                <div className="flex items-center gap-2 text-white">
                  <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow-2xs">
                    OFFRE DU JOUR
                  </span>
                  <span className="font-extrabold tracking-wide text-amber-200">
                    🚚 LIVRAISON GRATUITE OFFERTE POUR 2 ACHETÉS
                  </span>
                  <span className="text-emerald-300 font-normal">(Économie immédiate de 19,90 €)</span>
                </div>

                <span className="text-emerald-400/80 font-bold">✦</span>

                <div className="flex items-center gap-1.5 text-emerald-100">
                  <span className="text-base">❄️</span>
                  <span>Expédition Chronofresh sous chaîne du froid 2-8°C garantie sous 24h</span>
                </div>

                <span className="text-emerald-400/80 font-bold">✦</span>

                <div className="flex items-center gap-1.5 text-amber-200 font-bold">
                  <span className="text-base">🎁</span>
                  <span>Pochette isotherme nomade thermo-isolée offerte dès 2 boîtes</span>
                </div>

                <span className="text-emerald-400/80 font-bold">✦</span>

                <div className="flex items-center gap-1.5 text-white">
                  <span className="text-base">⚡</span>
                  <span>Packs Bundles : Jusqu'à <strong>-30% de remise</strong> sur votre cure complète</span>
                </div>

                <span className="text-emerald-400/80 font-bold">✦</span>

                <div className="flex items-center gap-1.5 text-emerald-100">
                  <span className="text-base">🛡️</span>
                  <span>Traitements officiels scellés Novo Nordisk & Eli Lilly</span>
                </div>

                <span className="text-emerald-400/80 font-bold">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30">
              <span className="font-extrabold text-lg tracking-tighter">V+</span>
            </div>
            <div>
              <span className="text-slate-900 group-hover:text-emerald-700 transition-colors">VitalGLP</span>
              <span className="text-emerald-600 font-semibold ml-1 text-sm block -mt-1 tracking-normal font-sans">
                Pharmacie Officielle
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#catalogue"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
            >
              Nos Traitements
            </a>
            <a
              href="#bundles"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 font-semibold text-emerald-800"
            >
              Offres Bundles (-30%)
            </a>
            <a
              href="#avant-apres-trustpilot"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
            >
              Photos Avant / Après
            </a>
            <a
              href="#avant-apres-trustpilot"
              className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0"
            >
              Avis Trustpilot
            </a>
          </nav>

          {/* Zone 3: 1 primary action + Cart affordance */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Shopify OS 2.0 Theme Downloader & Inspector Button */}
            {onOpenShopifyExport && (
              <button
                onClick={onOpenShopifyExport}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-2xs transition-all whitespace-nowrap shrink-0 cursor-pointer border border-amber-500/30"
                title="Exporter et télécharger le thème Shopify 2.0"
              >
                <span className="text-sm">🛍️</span>
                <span>Thème Shopify 2.0</span>
                <span className="bg-slate-900 text-amber-300 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                  ZIP
                </span>
              </button>
            )}

            {/* WhatsApp consultation quick button */}
            <button
              onClick={onOpenWhatsApp}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Conseil médical WhatsApp direct"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Conseil WhatsApp</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-700 rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Mon Panier</span>
              {totalCartCount > 0 && (
                <span className="bg-emerald-500 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center -mr-1">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
