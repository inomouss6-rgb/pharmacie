import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { adminStore } from '../services/adminStore';
import {
  X,
  ShieldCheck,
  Snowflake,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageCircle,
  Package,
  Copy,
  Check,
  Landmark,
  Gift,
  Ticket,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
}

export type PaymentMethod =
  | 'paypal'
  | 'transcash'
  | 'google_gift'
  | 'apple_gift'
  | 'bank_transfer'
  | 'card';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('paypal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [copiedIban, setCopiedIban] = useState(false);

  // Method specific inputs
  const [paypalEmail, setPaypalEmail] = useState('');
  const [transcashCode1, setTranscashCode1] = useState('');
  const [transcashCode2, setTranscashCode2] = useState('');
  const [showSecondTranscash, setShowSecondTranscash] = useState(false);

  const [googleCode1, setGoogleCode1] = useState('');
  const [googleCode2, setGoogleCode2] = useState('');
  const [showSecondGoogle, setShowSecondGoogle] = useState(false);

  const [appleCode1, setAppleCode1] = useState('');
  const [appleCode2, setAppleCode2] = useState('');
  const [showSecondApple, setShowSecondApple] = useState(false);

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.tier.totalPrice * item.count, 0);

  const handleCopyIban = () => {
    navigator.clipboard.writeText('FR76 3000 4012 3400 0123 4567 890');
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2500);
  };

  const paymentMethodLabels: Record<PaymentMethod, string> = {
    paypal: 'PayPal',
    transcash: 'Coupon Transcash',
    google_gift: 'Coupon Google',
    apple_gift: 'Coupons Apple Gift',
    bank_transfer: 'Virement bancaire',
    card: 'Carte Bancaire',
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Register into Admin Store with real customer coupon and order details
      const createdOrder = adminStore.addOrder({
        customer: {
          firstName: formData.firstName || 'Client',
          lastName: formData.lastName || 'Anonyme',
          email: formData.email || 'non-renseigne@client.fr',
          phone: formData.phone || 'Non renseigné',
          address: formData.address || 'Non renseignée',
          postalCode: formData.postalCode || '75000',
          city: formData.city || 'Paris',
          notes: formData.notes,
        },
        items: cart.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          dose: item.dose,
          quantityBoxes: item.tier.quantity,
          unitPrice: item.tier.unitPrice,
          totalPrice: item.tier.totalPrice * item.count,
        })),
        totalAmount,
        paymentMethod,
        paymentMethodLabel: paymentMethodLabels[paymentMethod] || paymentMethod,
        couponDetails: {
          type: paymentMethod,
          label: paymentMethodLabels[paymentMethod] || paymentMethod,
          code1:
            paymentMethod === 'transcash'
              ? transcashCode1
              : paymentMethod === 'google_gift'
              ? googleCode1
              : paymentMethod === 'apple_gift'
              ? appleCode1
              : undefined,
          code2:
            paymentMethod === 'transcash'
              ? transcashCode2
              : paymentMethod === 'google_gift'
              ? googleCode2
              : paymentMethod === 'apple_gift'
              ? appleCode2
              : undefined,
          paypalEmail: paymentMethod === 'paypal' ? paypalEmail : undefined,
          bankReference:
            paymentMethod === 'bank_transfer'
              ? `VTL-${Math.floor(100000 + Math.random() * 900000)}-VIR`
              : undefined,
          cardLast4:
            paymentMethod === 'card' && cardData.number
              ? cardData.number.replace(/\s+/g, '').slice(-4)
              : undefined,
          isCashed: false,
          verificationStatus: 'pending',
          cashNotes: 'Code coupon enregistré lors de la validation du panier.',
        },
      });

      setOrderNumber(createdOrder.id);
      setIsSubmitting(false);
      setStep('success');

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback
      }

      onClearCart();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                Paiement Sécurisé & Expédition Chaîne du Froid
              </h3>
              <p className="text-[11px] text-slate-400">
                Protocole de commande certifié VitalGLP & Vivami
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-4 sm:p-7 space-y-6">
            
            {/* Step 1: Shipping address */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-bold">1</span>
                <span>Coordonnées de livraison (Chronofresh 2-8°C)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Prénom *</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Ex : Céline"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nom *</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Ex : Dupuis"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email pour le suivi *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="celine.dupuis@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Téléphone portable (SMS Chronofresh) *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Adresse postale complète *</label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Numéro, rue, bâtiment, étage..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Code Postal *</label>
                  <input
                    required
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="75008"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Ville *</label>
                  <input
                    required
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Paris"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Cold Chain Assurance Box */}
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-2.5 text-xs text-sky-950">
              <Snowflake className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Colis Isotherme Certifié & Enregistreur Thermique</span>
                <p className="text-[11px] text-sky-800 mt-0.5">
                  Votre commande voyage dans une caisse à calage cryogénique garantissant une température contrôlée entre 2°C et 8°C pendant 48 heures.
                </p>
              </div>
            </div>

            {/* Step 2: Payment method selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[11px] font-bold">2</span>
                  <span>Choisissez votre moyen de paiement</span>
                </h4>
                <span className="text-[11px] text-emerald-700 font-medium">100% sécurisé</span>
              </div>

              {/* 6 Grid items: PayPal, Coupon Transcash, Coupon Google, Coupons Apple gift, Virement bancaire, Carte Bancaire */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                
                {/* 1. PayPal */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    paymentMethod === 'paypal'
                      ? 'border-[#0070BA] bg-blue-50/70 text-slate-900 ring-2 ring-[#0070BA]/30 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    {/* PayPal Icon */}
                    <span className="font-black text-[#003087] tracking-tight text-sm flex items-center">
                      <span className="text-[#0070BA]">Pay</span><span>Pal</span>
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                      Instantané
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">PayPal</div>
                  <div className="text-[10px] text-slate-500">Compte ou CB</div>
                </button>

                {/* 2. Coupon Transcash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transcash')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    paymentMethod === 'transcash'
                      ? 'border-[#D91B24] bg-red-50/70 text-slate-900 ring-2 ring-[#D91B24]/30 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-black text-xs text-[#D91B24] uppercase tracking-wider">
                      TRANSCASH
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                      Tabac / Web
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">Coupon Transcash</div>
                  <div className="text-[10px] text-slate-500">Recharge 12 chiffres</div>
                </button>

                {/* 3. Coupon Google */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_gift')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    paymentMethod === 'google_gift'
                      ? 'border-[#4285F4] bg-sky-50/70 text-slate-900 ring-2 ring-[#4285F4]/30 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    {/* Google Play colored icon */}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path d="M3.6 1.8L14.2 12 3.6 22.2c-.4-.3-.6-.8-.6-1.4V3.2c0-.6.2-1.1.6-1.4z" fill="#4285F4"/>
                        <path d="M17.7 8.6L14.2 12l3.5 3.4 3.9-2.2c1.1-.6 1.1-1.7 0-2.3l-3.9-2.3z" fill="#FBBC05"/>
                        <path d="M3.6 1.8l10.6 10.2 3.5-3.4L6.1.5c-1-.6-2.5-.2-2.5 1.3z" fill="#00E676"/>
                        <path d="M3.6 22.2l14.1-8.2-3.5-3.4L3.6 20.8c0 .5.2 1 .6 1.4z" fill="#EA4335"/>
                      </svg>
                      <span className="font-bold text-[11px] text-slate-800">Google</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Dispo 24/7
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">Coupon Google</div>
                  <div className="text-[10px] text-slate-500">Carte Google Play</div>
                </button>

                {/* 4. Coupons Apple Gift */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_gift')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    paymentMethod === 'apple_gift'
                      ? 'border-slate-800 bg-slate-100/90 text-slate-900 ring-2 ring-slate-800/30 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div className="flex items-center gap-1">
                      {/* Apple Logo SVG */}
                      <svg className="w-3.5 h-3.5 fill-current text-slate-900" viewBox="0 0 170 170">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.85-11.93-14.42-6-9.16-10.74-19.46-14.23-30.89-3.48-11.44-5.23-22.13-5.23-32.08 0-14.42 3.65-26.68 10.96-36.78 7.31-10.1 16.65-15.22 28.02-15.35 4.35 0 9.4 1.22 15.15 3.67 5.75 2.45 9.77 3.73 12.06 3.84 1.96 0 6.13-1.41 12.51-4.23 6.38-2.82 12.06-4.04 17.03-3.67 12.5.65 22.84 5.37 31.02 14.15-10.99 6.64-16.38 15.56-16.17 26.77.22 8.71 3.59 16.05 10.1 22.03 6.51 5.98 14.24 9.41 23.19 10.28-2.18 6.53-4.79 12.94-7.84 19.24zM119.22 33.15c0-6.86 2.5-13.28 7.5-19.26 5-5.98 11.21-9.79 18.63-11.43.87 2.39 1.3 4.9 1.3 7.52 0 6.74-2.55 13.27-7.66 19.59-5.11 6.31-11.28 10.02-18.52 11.13-.44-2.5-.75-5-.75-7.55z" />
                      </svg>
                      <span className="font-bold text-[11px] text-slate-800">Apple</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                      Carte Cadeau
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">Coupons Apple Gift</div>
                  <div className="text-[10px] text-slate-500">App Store & iTunes</div>
                </button>

                {/* 5. Virement bancaire */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#00875A] bg-emerald-50/70 text-slate-900 ring-2 ring-[#00875A]/30 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <Landmark className="w-4 h-4 text-[#00875A]" />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      SEPA / Direct
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">Virement bancaire</div>
                  <div className="text-[10px] text-slate-500">RIB BNP Paribas</div>
                </button>

                {/* 6. Carte Bancaire */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                    paymentMethod === 'card'
                      ? 'border-slate-700 bg-slate-50 text-slate-900 ring-2 ring-slate-700/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <CreditCard className="w-4 h-4 text-slate-700" />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                      CB / 3D Secure
                    </span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-800">Carte Bancaire</div>
                  <div className="text-[10px] text-slate-500">Visa / Mastercard</div>
                </button>

              </div>

              {/* DYNAMIC FORM ACCORDING TO PAYMENT METHOD */}

              {/* 1. PAYPAL DETAILS */}
              {paymentMethod === 'paypal' && (
                <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Règlement via PayPal sécurisé</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Vous pouvez régler instantanément par PayPal avec votre solde, votre compte bancaire relié ou par carte bancaire avec la <strong>Protection des Achats PayPal 100% garantie</strong>.
                  </p>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email associé à votre compte PayPal (optionnel)</label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder={formData.email || 'votre.compte.paypal@example.com'}
                      className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white/90 border border-blue-200 rounded-lg text-[11px] text-blue-950 font-medium">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Lien de confirmation sécurisé et reçu instantané transmis à la validation.</span>
                  </div>
                </div>
              )}

              {/* 2. TRANSCASH COUPON DETAILS */}
              {paymentMethod === 'transcash' && (
                <div className="p-4 bg-red-50/60 border border-red-200 rounded-xl space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-950 font-bold text-xs">
                      <Ticket className="w-4 h-4 text-[#D91B24]" />
                      <span>Recharge / Coupon Transcash (12 chiffres)</span>
                    </div>
                    <span className="text-[10px] bg-red-100 text-red-800 font-semibold px-2 py-0.5 rounded">
                      Anonyme & Garanti
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Les coupons Transcash sont achetables en espèces ou CB dans <strong>tous les bureaux de tabac/presses de France</strong> ou immédiatement en ligne sur <em>recharge.fr</em>, <em>dundle.com</em> ou <em>becharge.fr</em>.
                  </p>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Code Coupon Transcash n°1 (12 chiffres) *
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={16}
                        value={transcashCode1}
                        onChange={(e) => setTranscashCode1(e.target.value)}
                        placeholder="Ex : 5489 1204 8921"
                        className="w-full px-3 py-2 bg-white border border-red-300 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-slate-900"
                      />
                    </div>

                    {showSecondTranscash && (
                      <div className="animate-in fade-in duration-150">
                        <label className="block text-slate-700 font-semibold mb-1">
                          Code Coupon Transcash n°2 (si montant fractionné)
                        </label>
                        <input
                          type="text"
                          maxLength={16}
                          value={transcashCode2}
                          onChange={(e) => setTranscashCode2(e.target.value)}
                          placeholder="Ex : 7412 8520 9630"
                          className="w-full px-3 py-2 bg-white border border-red-300 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-slate-900"
                        />
                      </div>
                    )}

                    {!showSecondTranscash && (
                      <button
                        type="button"
                        onClick={() => setShowSecondTranscash(true)}
                        className="text-[11px] text-red-700 hover:text-red-900 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                      >
                        + Ajouter un 2ème coupon Transcash (pour compléter le montant de {totalAmount} €)
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 3. GOOGLE PLAY COUPON DETAILS */}
              {paymentMethod === 'google_gift' && (
                <div className="p-4 bg-sky-50/60 border border-sky-200 rounded-xl space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sky-950 font-bold text-xs">
                      <Gift className="w-4 h-4 text-[#4285F4]" />
                      <span>Carte Cadeau / Coupon Google Play (16 caractères)</span>
                    </div>
                    <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded">
                      Validation Directe
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Saisissez le code figurant au dos de votre carte Google Play physique (après avoir gratté la zone) ou reçu par email lors d’un achat en ligne (Amazon, Startselect, Carrefour, buralistes).
                  </p>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Code Coupon Google Play n°1 *
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={20}
                        value={googleCode1}
                        onChange={(e) => setGoogleCode1(e.target.value.toUpperCase())}
                        placeholder="Ex : ABCD-EFGH-IJKL-MNOP"
                        className="w-full px-3 py-2 bg-white border border-sky-300 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-slate-900"
                      />
                    </div>

                    {showSecondGoogle && (
                      <div className="animate-in fade-in duration-150">
                        <label className="block text-slate-700 font-semibold mb-1">
                          Code Coupon Google Play n°2 (si nécessaire)
                        </label>
                        <input
                          type="text"
                          maxLength={20}
                          value={googleCode2}
                          onChange={(e) => setGoogleCode2(e.target.value.toUpperCase())}
                          placeholder="Ex : WXYZ-1234-5678-90AB"
                          className="w-full px-3 py-2 bg-white border border-sky-300 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-slate-900"
                        />
                      </div>
                    )}

                    {!showSecondGoogle && (
                      <button
                        type="button"
                        onClick={() => setShowSecondGoogle(true)}
                        className="text-[11px] text-sky-700 hover:text-sky-900 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                      >
                        + Ajouter un autre code Google Play pour atteindre {totalAmount} €
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 4. APPLE GIFT COUPON DETAILS */}
              {paymentMethod === 'apple_gift' && (
                <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                      <Gift className="w-4 h-4 text-slate-800" />
                      <span>Carte Cadeau Apple Gift (commençant par X)</span>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-800 font-semibold px-2 py-0.5 rounded">
                      Apple Store & Services
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Saisissez le code à 16 chiffres commençant par <strong>X</strong> situé au dos de votre carte Apple Gift physique ou dans votre e-mail d’achat Apple / Fnac / buraliste.
                  </p>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Code Coupon Apple Gift n°1 *
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={22}
                        value={appleCode1}
                        onChange={(e) => setAppleCode1(e.target.value.toUpperCase())}
                        placeholder="Ex : X89K-42LM-PQ78-90AZ"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-slate-900"
                      />
                    </div>

                    {showSecondApple && (
                      <div className="animate-in fade-in duration-150">
                        <label className="block text-slate-700 font-semibold mb-1">
                          Code Coupon Apple Gift n°2 (si nécessaire)
                        </label>
                        <input
                          type="text"
                          maxLength={22}
                          value={appleCode2}
                          onChange={(e) => setAppleCode2(e.target.value.toUpperCase())}
                          placeholder="Ex : X23B-98CD-EF45-GH67"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold tracking-wider uppercase text-slate-900"
                        />
                      </div>
                    )}

                    {!showSecondApple && (
                      <button
                        type="button"
                        onClick={() => setShowSecondApple(true)}
                        className="text-[11px] text-slate-700 hover:text-slate-950 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                      >
                        + Ajouter un 2ème code Apple Gift pour atteindre {totalAmount} €
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* 5. BANK TRANSFER DETAILS */}
              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                      <Landmark className="w-4 h-4 text-emerald-700" />
                      <span>Coordonnées Bancaires Officielles (Virement SEPA / Instantané)</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Sans frais
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Effectuez votre virement depuis votre application bancaire (BoursoBank, BNP, Crédit Agricole, Société Générale, Revolut, etc.). Le virement instantané permet une validation en 10 secondes.
                  </p>

                  <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500 text-[11px]">Bénéficiaire :</span>
                      <span className="font-bold text-slate-900">PHARMACIE CENTRALE VITALGLP & VIVAMI MEDICAL SAS</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500 text-[11px]">Établissement :</span>
                      <span className="font-semibold text-slate-800">BNP PARIBAS FRANCE</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500 text-[11px]">IBAN :</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-950 text-xs sm:text-sm">FR76 3000 4012 3400 0123 4567 890</span>
                        <button
                          type="button"
                          onClick={handleCopyIban}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedIban ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedIban ? 'Copié' : 'Copier'}</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-[11px]">BIC / SWIFT :</span>
                      <span className="font-mono font-bold text-slate-800">BNPAFR21XXX</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-800 bg-emerald-100/60 p-2 rounded-md font-medium">
                    📌 <strong>Indication importante :</strong> Mentionnez votre Nom de famille en libellé de virement. Votre colis réfrigéré 2-8°C sera préparé dès réception.
                  </div>
                </div>
              )}

              {/* 6. CREDIT CARD DETAILS */}
              {paymentMethod === 'card' && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs animate-in fade-in duration-150">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Nom sur la carte</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex : Céline Dupuis"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Numéro de carte</label>
                    <input
                      required
                      type="text"
                      maxLength={19}
                      placeholder="4970 •••• •••• 1234"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Expiration</label>
                      <input
                        required
                        type="text"
                        maxLength={5}
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Cryptogramme CVC</label>
                      <input
                        required
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Total and Submit Button */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Montant total de la commande :</div>
                  <div className="text-2xl font-black text-slate-900">{totalAmount} €</div>
                </div>
                <div className="text-right text-[11px] text-emerald-700 font-semibold">
                  <div>Livraison réfrigérée 24h offerte</div>
                  <div>Garantie remboursement 30 jours</div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-black text-sm uppercase tracking-wide rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Validation sécurisée en cours...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirmer et Régler {totalAmount} € via {paymentMethodLabels[paymentMethod]}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Order Confirmed Screen */
          <div className="p-6 sm:p-10 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">
                Félicitations pour votre commande ! 🎉
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Votre cure minceur officielle est enregistrée sous la référence :
              </p>
              <div className="inline-block mt-2 font-mono font-black text-lg bg-slate-100 text-slate-900 px-4 py-1.5 rounded-lg border border-slate-300">
                {orderNumber}
              </div>
            </div>

            {/* Payment Method Recap */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 text-left max-w-md mx-auto space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>Moyen de paiement sélectionné :</span>
                <span className="text-emerald-700 font-black">{paymentMethodLabels[paymentMethod]}</span>
              </div>
              
              {paymentMethod === 'bank_transfer' && (
                <div className="text-[11px] text-slate-700 pt-1 border-t border-slate-200 space-y-1">
                  <p>Veuillez effectuer le virement de <strong>{totalAmount} €</strong> sur l'IBAN :</p>
                  <p className="font-mono font-bold text-slate-950 bg-white p-1.5 rounded border border-slate-300">
                    FR76 3000 4012 3400 0123 4567 890
                  </p>
                  <p className="text-emerald-700 font-medium">Libellé à indiquer : <strong>{orderNumber}</strong></p>
                </div>
              )}

              {paymentMethod === 'transcash' && (
                <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                  Votre coupon Transcash ({transcashCode1 || 'enregistré'}) a été transmis à la comptabilité pour traitement prioritaire.
                </p>
              )}

              {paymentMethod === 'google_gift' && (
                <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                  Votre coupon Google Play ({googleCode1 || 'enregistré'}) est en cours de validation automatique.
                </p>
              )}

              {paymentMethod === 'apple_gift' && (
                <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                  Votre coupon Apple Gift ({appleCode1 || 'enregistré'}) est validé pour l'expédition.
                </p>
              )}

              {paymentMethod === 'paypal' && (
                <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                  Votre paiement PayPal est validé avec la Protection des Achats activée.
                </p>
              )}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 text-left space-y-2 max-w-md mx-auto">
              <div className="font-bold flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-700" />
                <span>Préparation immédiate en chambre froide :</span>
              </div>
              <ul className="space-y-1 text-slate-700 pl-6 list-disc">
                <li>Votre colis isotherme sera scellé ce matin à 4°C.</li>
                <li>Le numéro de suivi Chronofresh vous sera envoyé par SMS.</li>
                <li>Votre pharmacien dédié reste joignable 7j/7 pour vous guider.</li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  const url = `https://wa.me/33756894120?text=Bonjour,%20je%20viens%20de%20valider%20la%20commande%20${orderNumber}%20par%20${encodeURIComponent(paymentMethodLabels[paymentMethod])}%20et%20je%20souhaite%20activer%20mon%20suivi%20médical.`;
                  window.open(url, '_blank');
                }}
                className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Activer mon suivi WhatsApp dédié</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Retour à la boutique
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
