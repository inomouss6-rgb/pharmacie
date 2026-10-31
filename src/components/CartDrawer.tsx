import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShieldCheck, Snowflake, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateCount: (index: number, newCount: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateCount,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.tier.totalPrice * item.count, 0);
  const totalSavings = cart.reduce((sum, item) => sum + item.tier.savings * item.count, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-2xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            <h2 className="font-extrabold text-base text-slate-900">
              Votre Panier Minceur ({cart.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Cold Shipping Progress Bar */}
        <div className="bg-emerald-50 border-b border-emerald-100 p-3 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Snowflake className="w-4 h-4 text-sky-600" />
            <span>Livraison Chronofresh 2-8°C OFFERTE</span>
          </div>
          <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
            Économie 19.90 €
          </span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm">Votre panier est actuellement vide</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Sélectionnez un pack bundle 1, 2 ou 5 boîtes de Wegovy, Mounjaro ou Zepbound pour débuter votre cure.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 cursor-pointer"
              >
                Découvrir les offres bundles
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.productId}-${item.dose}-${item.tier.quantity}-${index}`}
                className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.productName}
                      referrerPolicy="no-referrer"
                      className="max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                        title="Supprimer l'article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-semibold text-emerald-700">
                      Pack {item.tier.quantity} boîte{item.tier.quantity > 1 ? 's' : ''} ({item.dose})
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2 py-0.5 bg-slate-50">
                        <button
                          onClick={() => onUpdateCount(index, item.count - 1)}
                          className="text-slate-600 hover:text-slate-900 p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-900">{item.count}</span>
                        <button
                          onClick={() => onUpdateCount(index, item.count + 1)}
                          className="text-slate-600 hover:text-slate-900 p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-black text-sm text-slate-900">
                          {item.tier.totalPrice * item.count} €
                        </div>
                        {item.tier.savings > 0 && (
                          <div className="text-[10px] text-rose-600 font-bold">
                            -{item.tier.savings * item.count} € économisés
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Free gift reminder badge */}
                <div className="text-[10px] bg-slate-50 rounded p-1.5 text-slate-600 flex items-center justify-between">
                  <span>🎁 Inclus : Pochette isotherme & Kit aiguilles</span>
                  <span className="text-emerald-700 font-semibold">Offert</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total des bundles</span>
                <span className="font-semibold">{totalAmount} €</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Remise bundle immédiate</span>
                  <span>-{totalSavings} €</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Expédition Chronofresh 2-8°C (24h)</span>
                <span className="text-emerald-700 font-bold">GRATUITE</span>
              </div>
              <div className="flex justify-between text-slate-900 text-base font-black pt-2 border-t border-slate-200">
                <span>Total à régler</span>
                <span className="text-emerald-800">{totalAmount} €</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer"
            >
              <span>Valider la commande ({totalAmount} €)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-1.5 font-medium text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paiement 100% sécurisé & garanti</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                PayPal · Coupon Transcash · Google Play · Apple Gift · Virement · CB
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
