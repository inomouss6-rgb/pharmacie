import React, { useState } from 'react';
import { Product, BundleTier } from '../types';
import { TrustpilotBadge } from './TrustpilotBadge';
import { FlashSaleCountdown } from './FlashSaleCountdown';
import {
  Check,
  ShieldCheck,
  Snowflake,
  ShoppingBag,
  Zap,
  ArrowRight,
  Flame,
  Heart,
  ChevronDown,
  Sparkles,
  Clock,
  Award
} from 'lucide-react';

interface ProductCardWithBundleProps {
  product: Product;
  onAddToCart: (product: Product, dose: string, tier: BundleTier) => void;
  onDirectBuy: (product: Product, dose: string, tier: BundleTier) => void;
  onOpenWhatsApp?: (customText?: string) => void;
}

export const ProductCardWithBundle: React.FC<ProductCardWithBundleProps> = ({
  product,
  onAddToCart,
  onDirectBuy,
  onOpenWhatsApp,
}) => {
  const [selectedDose, setSelectedDose] = useState<string>(product.defaultDose);
  // Default to the most popular 2-boxes bundle (highest conversion!)
  const [selectedTierQty, setSelectedTierQty] = useState<1 | 2 | 5>(2);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const currentTier = product.bundleTiers.find((t) => t.quantity === selectedTierQty) || product.bundleTiers[1];

  const handleAddToCart = () => {
    onAddToCart(product, selectedDose, currentTier);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    onDirectBuy(product, selectedDose, currentTier);
  };

  return (
    <div
      id={product.id}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.008] overflow-hidden mb-16 scroll-mt-24 group/card"
    >
      {/* Top Banner Alert for High Demand */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between text-xs font-medium gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-emerald-400">Authenticité Officielle :</span>
          <span>{product.brand} · Lot scellé et certifié</span>
        </div>
        <div className="flex items-center gap-2 text-amber-300">
          <Flame className="w-3.5 h-3.5 fill-amber-300" />
          <span>Forte affluence : Plus que <strong>{product.stockLeft} packs</strong> alloués pour aujourd’hui</span>
        </div>
      </div>

      {/* Main Product Card Grid */}
      <div className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Product Image & Clinical Proof */}
        <div className="lg:col-span-5 space-y-5">
          <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6 flex items-center justify-center min-h-[300px] sm:min-h-[360px] overflow-hidden group">
            
            {/* Discount Stamp on Product Image */}
            {currentTier.discountPercent > 0 && (
              <div className="absolute top-4 left-4 z-10 bg-rose-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>-{currentTier.discountPercent}% Immédiat</span>
              </div>
            )}

            {/* Cold Chain Badge */}
            <div className="absolute top-4 right-4 z-10 bg-sky-900/90 backdrop-blur-xs text-sky-100 text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5 text-sky-300" />
              <span>2°C - 8°C Contrôlé</span>
            </div>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[280px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
            />

            {/* Bottom Clinical Highlight */}
            <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-2.5 text-center shadow-xs">
              <span className="text-xs font-extrabold text-emerald-700 mr-1.5">
                {product.clinicalTrial.stat}
              </span>
              <span className="text-[11px] text-slate-600">
                {product.clinicalTrial.label}
              </span>
            </div>
          </div>

          {/* Key Product Points */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Points forts thérapeutiques :
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Title, Dosage, Bundles Selector & Push to Purchase */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header & Badges */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {product.brand} · {product.molecule}
              </div>
              <TrustpilotBadge score={product.rating} reviewsCount={product.reviewCount} size="sm" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {product.name}
            </h2>
            <p className="text-sm font-medium text-emerald-700 mt-1">
              {product.tagline}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {product.shortDesc}
            </p>
          </div>

          {/* Dosage Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">
                1. Choisissez votre dosage recommandé :
              </label>
              <button
                onClick={() => onOpenWhatsApp?.("Bonjour, je souhaite un conseil médical sur la dose initiale à choisir.")}
                className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
              >
                <span>Hésitation sur la dose ? Demander au pharmacien</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.doses.map((dose) => {
                const isSelected = selectedDose === dose;
                return (
                  <button
                    key={dose}
                    onClick={() => setSelectedDose(dose)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{dose}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BUNDLE SELECTOR TIERS: 1, 2, 5 Boîtes */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <span>2. Sélectionnez votre Bundle Minceur</span>
                <span className="text-emerald-600 font-bold">(Économisez jusqu'à -30%)</span>
              </label>
              <span className="text-[11px] font-semibold text-slate-500">
                Pochette thermo-isolée offerte dès 2 boîtes
              </span>
            </div>

            <div className="space-y-2.5">
              {product.bundleTiers.map((tier) => {
                const isSelected = selectedTierQty === tier.quantity;

                return (
                  <div
                    key={tier.quantity}
                    onClick={() => setSelectedTierQty(tier.quantity)}
                    className={`relative rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20 scale-[1.01]'
                        : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50 hover:scale-[1.012] hover:shadow-md'
                    }`}
                  >
                    {/* Badge for Popular or Best Value */}
                    {tier.badge && (
                      <div
                        className={`absolute -top-2.5 right-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${
                          tier.bestValue
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {tier.badge}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Left: Radio + Title + Perks */}
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-600'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">
                              {tier.quantity} Boîte{tier.quantity > 1 ? 's' : ''} ({tier.quantity} Mois de Cure)
                            </span>
                            {tier.discountPercent > 0 && (
                              <span className="text-xs font-black text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded">
                                -{tier.discountPercent}%
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {tier.title}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">
                            {tier.perks.slice(0, 2).map((perk, i) => (
                              <span key={i} className="flex items-center gap-1 font-medium text-emerald-800">
                                <Check className="w-3 h-3 text-emerald-600" />
                                {perk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Savings */}
                      <div className="sm:text-right pl-7 sm:pl-0">
                        <div className="flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0">
                          <div className="text-lg font-black text-slate-900">
                            {tier.totalPrice} €
                          </div>
                          {tier.originalTotalPrice > tier.totalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                              {tier.originalTotalPrice} €
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-semibold text-emerald-700">
                          Soit {tier.unitPrice} € / boîte
                        </div>
                        {tier.savings > 0 && (
                          <div className="text-[11px] font-black text-rose-600">
                            Vous économisez {tier.savings} €
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Box with Conversion Reassurance */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200/90 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">
                Récapitulatif sélection :
              </span>
              <span className="font-extrabold text-emerald-800 text-sm">
                {currentTier.quantity}x {product.name} ({selectedDose}) = {currentTier.totalPrice} €
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-700 pt-1 border-t border-emerald-200/60">
              <div className="flex items-center gap-1.5 font-medium">
                <Snowflake className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Chaîne du froid 2-8°C</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Garantie 30j Remboursé</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium col-span-2 sm:col-span-1">
                <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Expédition garantie 24h</span>
              </div>
            </div>

            {/* Flash Sale Urgency Countdown right next to buy buttons */}
            <FlashSaleCountdown variant="compact" className="w-full justify-between" />

            {/* Action Buttons: Pushing Directly to Conversion! */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
              
              {/* Left Action: Direct Buy button */}
              <button
                onClick={handleBuyNow}
                className="sm:col-span-7 py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
              >
                <span>Acheter maintenant ({currentTier.totalPrice} €)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className={`sm:col-span-5 py-3.5 px-4 font-bold rounded-xl border transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer ${
                  addedAnimation
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                    : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>{addedAnimation ? 'Ajouté au panier !' : 'Ajouter au Panier'}</span>
              </button>

            </div>

            {/* Payment methods accepted */}
            <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Paiement sécurisé : PayPal · Coupon Transcash · Google · Apple Gift · Virement · CB</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
