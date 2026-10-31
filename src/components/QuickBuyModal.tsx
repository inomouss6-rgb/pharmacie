import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, BundleTier } from '../types';
import { X, Check, ArrowRight, ShieldCheck, Snowflake, Sparkles } from 'lucide-react';
import { FlashSaleCountdown } from './FlashSaleCountdown';

interface QuickBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmBuy: (product: Product, dose: string, tier: BundleTier) => void;
}

export const QuickBuyModal: React.FC<QuickBuyModalProps> = ({
  isOpen,
  onClose,
  onConfirmBuy,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<'wegovy' | 'mounjaro' | 'zepbound'>('mounjaro');
  const [selectedTierQty, setSelectedTierQty] = useState<1 | 2 | 5>(2);
  const [selectedDose, setSelectedDose] = useState<string>('2.5 mg');

  if (!isOpen) return null;

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[1];
  const currentTier = currentProduct.bundleTiers.find((t) => t.quantity === selectedTierQty) || currentProduct.bundleTiers[1];

  const handleSelectProduct = (prodId: 'wegovy' | 'mounjaro' | 'zepbound') => {
    setSelectedProductId(prodId);
    const prod = PRODUCTS.find((p) => p.id === prodId)!;
    setSelectedDose(prod.defaultDose);
  };

  const handleContinue = () => {
    onConfirmBuy(currentProduct, selectedDose, currentTier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-sm sm:text-base">
              Commande Express : Choisissez Votre Pack
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 text-xs">
          
          {/* Step 1: Select Treatment */}
          <div>
            <label className="block font-bold text-slate-900 mb-2 uppercase tracking-wide">
              1. Choisissez votre traitement GLP-1 :
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PRODUCTS.map((prod) => {
                const isSelected = selectedProductId === prod.id;
                return (
                  <button
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs truncate">{prod.name}</div>
                    <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                      {prod.clinicalTrial.stat}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Bundle Tier */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-900 uppercase tracking-wide">
                2. Choisissez la variante du bundle :
              </label>
              <span className="text-[11px] text-emerald-700 font-bold">
                Jusqu'à -30%
              </span>
            </div>

            <div className="space-y-2">
              {currentProduct.bundleTiers.map((tier) => {
                const isSelected = selectedTierQty === tier.quantity;
                return (
                  <div
                    key={tier.quantity}
                    onClick={() => setSelectedTierQty(tier.quantity)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {tier.quantity} Boîte{tier.quantity > 1 ? 's' : ''} ({tier.quantity} Mois)
                          {tier.discountPercent > 0 && (
                            <span className="ml-2 text-[10px] font-black text-rose-600 bg-rose-100 px-1.5 py-0.2 rounded">
                              -{tier.discountPercent}%
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {tier.title}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-black text-sm text-slate-900">{tier.totalPrice} €</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">{tier.unitPrice} €/boîte</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Dosage */}
          <div>
            <label className="block font-bold text-slate-900 mb-1.5 uppercase tracking-wide">
              3. Posologie :
            </label>
            <select
              value={selectedDose}
              onChange={(e) => setSelectedDose(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-semibold bg-white focus:ring-2 focus:ring-emerald-500"
            >
              {currentProduct.doses.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Price and Action */}
          <div className="pt-3 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total à payer :</span>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-800">{currentTier.totalPrice} €</span>
                {currentTier.savings > 0 && (
                  <span className="block text-[11px] font-black text-rose-600">
                    Vous économisez {currentTier.savings} €
                  </span>
                )}
              </div>
            </div>

            <FlashSaleCountdown variant="compact" className="w-full justify-between" />

            <button
              onClick={handleContinue}
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wide rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continuer vers la livraison Chronofresh</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Snowflake className="w-3.5 h-3.5 text-sky-600" /> 2-8°C Contrôlé
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Satisfait ou Remboursé 30j
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
