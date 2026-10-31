import React, { useState } from 'react';
import { Product, BundleTier } from '../types';
import { Search, ChevronLeft, ChevronRight, Check, ShieldCheck, Snowflake, X, Sparkles } from 'lucide-react';
import { FlashSaleCountdown } from './FlashSaleCountdown';

interface VivamiStyleHeroProps {
  products: Product[];
  currentProduct: Product;
  onSelectProduct: (product: Product) => void;
  onDirectBuy: (product: Product, dose: string, tier: BundleTier) => void;
  onAddToCart: (product: Product, dose: string, tier: BundleTier) => void;
  onOpenWhatsApp: (customText?: string) => void;
}

export const VivamiStyleHero: React.FC<VivamiStyleHeroProps> = ({
  products,
  currentProduct,
  onSelectProduct,
  onDirectBuy,
  onAddToCart,
  onOpenWhatsApp,
}) => {
  const [selectedDose, setSelectedDose] = useState<string>(currentProduct.defaultDose);
  const [selectedTierQty, setSelectedTierQty] = useState<1 | 2 | 5>(2);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update dose when product changes
  React.useEffect(() => {
    setSelectedDose(currentProduct.defaultDose);
  }, [currentProduct]);

  const currentTier = currentProduct.bundleTiers.find((t) => t.quantity === selectedTierQty) || currentProduct.bundleTiers[1];

  // Carousel navigation between products
  const handlePrevProduct = () => {
    const currentIndex = products.findIndex((p) => p.id === currentProduct.id);
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    onSelectProduct(products[prevIndex]);
  };

  const handleNextProduct = () => {
    const currentIndex = products.findIndex((p) => p.id === currentProduct.id);
    const nextIndex = (currentIndex + 1) % products.length;
    onSelectProduct(products[nextIndex]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;
    const found = products.find(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.molecule.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
    );
    if (found) {
      onSelectProduct(found);
    } else {
      onOpenWhatsApp(`Bonjour, je recherche "${searchQuery}". Avez-vous ce traitement ou un équivalent en stock ?`);
    }
  };

  // Logos as seen in Vivami Screenshot
  const pharmaLogos = [
    { name: 'Novo Nordisk', font: 'font-serif font-black tracking-tight text-slate-800' },
    { name: 'Lilly', font: 'italic font-serif font-bold text-slate-700 text-lg' },
    { name: 'Pfizer', font: 'font-sans font-extrabold tracking-tighter text-slate-700 border border-slate-400 rounded-full px-2 py-0.5' },
    { name: 'janssen', font: 'font-sans font-light tracking-widest text-slate-700' },
    { name: 'Roche', font: 'font-mono font-bold tracking-tight text-slate-800 border-2 border-slate-400 px-2 py-0.5' },
    { name: 'NOVARTIS', font: 'font-serif tracking-widest text-slate-700' },
    { name: 'AstraZeneca', font: 'font-sans font-bold tracking-tight text-slate-700' },
    { name: 'gsk', font: 'font-sans font-black text-slate-700 border border-slate-300 rounded-full px-1.5' },
    { name: 'MerckSerono', font: 'font-sans font-semibold tracking-tight text-slate-700' },
    { name: 'NORGINE', font: 'font-sans font-black tracking-wider text-slate-800' },
    { name: 'Takeda', font: 'font-serif italic font-bold text-slate-700' },
    { name: 'McNeil', font: 'font-sans font-extrabold italic text-slate-700' },
  ];

  return (
    <div className="bg-white">
      {/* 1. Vivami Search Bar Header Container (matching Screenshot 1) */}
      <div className="bg-[#f4f7f9] border-b border-slate-200 py-3.5 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xs rounded-xl overflow-hidden bg-white border border-slate-300">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Entrez un médicament ou une maladie (ex: Wegovy, Mounjaro, Perte de poids...)"
              className="w-full py-3 pl-4 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 bg-[#25c998] hover:bg-[#1fb386] text-white flex items-center justify-center rounded-lg transition-colors cursor-pointer"
              aria-label="Rechercher"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Breadcrumbs (matching Screenshot 2) */}
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-2 text-xs text-slate-500 flex items-center gap-2">
        <a href="#" className="hover:text-emerald-700">Accueil</a>
        <span>&gt;</span>
        <a href="#catalogue" className="hover:text-emerald-700">Perte de poids</a>
        <span>&gt;</span>
        <span className="font-bold text-slate-900 capitalize">{currentProduct.name}</span>
      </div>

      {/* 3. Product Switcher Tabs (Wegovy, Mounjaro, Zepbound) */}
      <div className="max-w-3xl mx-auto px-4 pt-1 pb-4">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {products.map((prod) => {
            const isActive = prod.id === currentProduct.id;
            return (
              <button
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className={`py-2 px-4 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{prod.name.split(' ')[0]}</span>
                <span className={`text-[10px] font-normal ${isActive ? 'text-emerald-300' : 'text-slate-400'}`}>
                  ({prod.molecule.split(' ')[0]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Vivami Centered Product Presentation Card (matching Screenshot 2) */}
      <div className="max-w-xl mx-auto px-4 pb-10">
        <div className="text-center space-y-4">
          
          {/* Centered Image Showcase with Navigation Chevrons */}
          <div className="relative bg-white py-6 flex items-center justify-center min-h-[260px] group">
            {/* Prev Arrow */}
            <button
              onClick={handlePrevProduct}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Traitement précédent"
            >
              <ChevronLeft className="w-8 h-8 stroke-[1.5]" />
            </button>

            {/* Product Image */}
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              referrerPolicy="no-referrer"
              className="max-h-[220px] w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            />

            {/* Next Arrow */}
            <button
              onClick={handleNextProduct}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Traitement suivant"
            >
              <ChevronRight className="w-8 h-8 stroke-[1.5]" />
            </button>
          </div>


          {/* Product Title & Molecule (exact styling from screenshot 2) */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {currentProduct.id === 'wegovy' ? 'Wegovy' : currentProduct.id === 'mounjaro' ? 'Mounjaro' : 'Zepbound'}
            </h1>
            <p className="text-sm font-medium text-slate-500 mt-1 capitalize">
              {currentProduct.id === 'wegovy' ? 'Semaglutide' : 'Tirzepatide'}
            </p>
          </div>

          {/* Dosage & Description Card (matching Screenshot 2) */}
          <div className="bg-[#fcfdfd] border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-1 text-left space-y-4">
            
            {/* Header info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  {currentProduct.id === 'wegovy' ? 'Wegovy' : currentProduct.id === 'mounjaro' ? 'Mounjaro' : 'Zepbound'} {selectedDose.split(' ')[0]}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {currentProduct.clinicalTrial.stat}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {currentProduct.name}, solution injectable FlexTouch en stylo prérempli pour injection sous-cutanée hebdomadaire.
              </p>
            </div>

            {/* Dosage Selector Pills */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Dosage du traitement :
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {currentProduct.doses.map((dose) => {
                  const isDoseSelected = selectedDose === dose;
                  return (
                    <button
                      key={dose}
                      onClick={() => setSelectedDose(dose)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        isDoseSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-600 shadow-2xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate block">{dose.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BUNDLE VARIANTS SELECTOR (1 acheté, 2 achetés [-15%], 5 achetés [-30%]) */}
            <div className="space-y-2 pt-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>Variante du Pack Bundle :</span>
                <span className="text-emerald-700 font-extrabold text-xs">
                  Livraison gratuite dès 2 achetés
                </span>
              </label>

              <div className="space-y-2">
                {currentProduct.bundleTiers.map((tier) => {
                  const isTierSelected = selectedTierQty === tier.quantity;
                  return (
                    <button
                      key={tier.quantity}
                      onClick={() => setSelectedTierQty(tier.quantity)}
                      className={`w-full py-3.5 px-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                        isTierSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/20 scale-[1.01]'
                          : 'border-slate-200 bg-[#f8f9fa] hover:bg-white hover:border-emerald-300 hover:scale-[1.012] hover:shadow-md text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isTierSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isTierSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <div>
                          <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                            {tier.quantity} Stylo{tier.quantity > 1 ? 's' : ''} - {tier.totalPrice},00 €
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {tier.quantity === 1 ? 'Cure Découverte 1 Mois' : tier.quantity === 2 ? 'Cure 2 Mois · Le plus populaire' : 'Pack Transformation 5 Mois'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        {tier.discountPercent > 0 ? (
                          <span className="text-[11px] font-black text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                            -{tier.discountPercent}%
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-semibold">Standard</span>
                        )}
                        <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                          {tier.unitPrice} € / stylo
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shipping note (matching Screenshot 2: "+ Livraison 24-48h") */}
            <div className="text-center pt-1 text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <Snowflake className="w-3.5 h-3.5 text-sky-500" />
              <span>
                + Livraison réfrigérée 24-48h{' '}
                <strong className="text-emerald-700">
                  {selectedTierQty >= 2 ? '(OFFERTE)' : '(19,90 €)'}
                </strong>
              </span>
            </div>

            {/* Flash Sale Urgency Countdown right next to the buy button */}
            <FlashSaleCountdown variant="full" showStockNotice={true} />

            {/* Vivami Mint-Teal COMMANDER Button (exact replica from screenshot 2) */}
            <button
              onClick={() => onDirectBuy(currentProduct, selectedDose, currentTier)}
              className="w-full py-4 px-6 bg-[#25c998] hover:bg-[#1fb386] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 uppercase cursor-pointer"
            >
              <span>COMMANDER</span>
            </button>

            {/* Secondary actions */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <button
                onClick={() => onAddToCart(currentProduct, selectedDose, currentTier)}
                className="text-slate-600 hover:text-slate-900 font-semibold underline underline-offset-2 cursor-pointer"
              >
                + Ajouter au panier d'abord
              </button>

              <button
                onClick={() => onOpenWhatsApp(`Bonjour, je souhaite des conseils pour commander ${currentProduct.name} en pack ${selectedTierQty} boîte(s).`)}
                className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 cursor-pointer"
              >
                Commander par WhatsApp
              </button>
            </div>

            {/* Accepted payment methods badges */}
            <div className="pt-2 text-center space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Moyens de paiement sécurisés
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold border border-blue-200">PayPal</span>
                <span className="px-2 py-0.5 rounded bg-red-50 text-red-800 font-semibold border border-red-200">Coupon Transcash</span>
                <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-semibold border border-sky-200">Coupon Google</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold border border-slate-300">Apple Gift</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">Virement bancaire</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 5. Pharmaceutical Brand Partners & Trustpilot Grid (matching Screenshot 1) */}
      <div className="border-t border-slate-200 bg-slate-50 py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Section subtitle */}
          <div className="text-center space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Laboratoires Partenaires Agréés
            </span>
            <p className="text-xs text-slate-500">
              Distribution exclusive sous contrôle de conformité ANSM & EMA
            </p>
          </div>

          {/* Pharma logos grid as shown in screenshot 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center justify-items-center opacity-85">
            {pharmaLogos.map((brand, i) => (
              <div
                key={i}
                className="h-12 flex items-center justify-center p-2 text-center text-slate-600 hover:text-slate-950 transition-colors"
                title={brand.name}
              >
                <span className={`text-sm sm:text-base ${brand.font}`}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>


    </div>
  );
};
