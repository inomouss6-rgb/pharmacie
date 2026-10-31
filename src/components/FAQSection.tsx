import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Snowflake, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC<{ onOpenWhatsApp: () => void }> = ({ onOpenWhatsApp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Comment s’effectue la conservation et l’expédition sous chaîne du froid 2-8°C ?',
      a: 'Tous les stylos (Wegovy, Mounjaro et Zepbound) sont stockés dans notre pharmacie dans des armoires frigorifiques thermo-régulées à 4°C. Dès votre commande validée, ils sont conditionnés dans des emballages isothermes haute densité avec accumulateurs eutectiques et un témoin thermique de conformité. Ils sont expédiés via le service Chronofresh dédié en 24h chrono.'
    },
    {
      q: 'Quelle est la différence majeure entre Wegovy (Sémaglutide) et Mounjaro/Zepbound (Tirzépatide) ?',
      a: 'Wegovy contient du sémaglutide, un agoniste du seul récepteur GLP-1 (perte moyenne mesurée de -15.8%). Mounjaro et Zepbound contiennent du tirzépatide, un double agoniste qui stimule à la fois le GLP-1 et le GIP. Cette double action métabolique offre une efficacité clinique supérieure atteignant -20.9% à -22.5% de perte de masse grasse, tout en optimisant la sensibilité à l’insuline.'
    },
    {
      q: 'Pourquoi commander en bundle 2 ou 5 boîtes plutôt qu’une seule ?',
      a: 'Une cure d’optimisation métabolique efficace nécessite au minimum 8 à 16 semaines afin de stabiliser le nouveau point de consigne corporel et éviter tout effet rebond. Le bundle 2 boîtes vous fait économiser 15% immédiatement et inclut la trousse isotherme nomade. Le bundle 5 boîtes offre une remise de 30% et le kit complet avec suivi diététique VIP.'
    },
    {
      q: 'L’injection sous-cutanée hebdomadaire fait-elle mal ?',
      a: 'Non, les aiguilles fournies (32G micro-fines) mesurent moins de 4 mm de longueur. La sensation est comparable à un très léger pincement d’une fraction de seconde. Les stylos FlexTouch® et KwikPen® sont conçus pour une utilisation autonome ultra simple à domicile (cuisse, abdomen ou bras).'
    },
    {
      q: 'Comment fonctionne la garantie 30 jours Satisfait ou Remboursé ?',
      a: 'Si vous rencontrez la moindre contre-indication médicale ou si vous n’êtes pas pleinement satisfait de l’accompagnement lors du premier mois, notre service client organise le retour sécurisé et procède au remboursement intégral sous 48h sans tracasserie.'
    }
  ];

  return (
    <section id="garanties" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Transparence & Sécurité Médicale</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Foire Aux Questions & Conseils Pharmaceutiques
          </h2>
          <p className="text-sm text-slate-600">
            Tout ce que vous devez savoir pour démarrer votre cure en toute sérénité.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp direct assistance prompt */}
        <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-emerald-950 font-medium text-center sm:text-left">
            <strong>Une question sur votre situation personnelle ?</strong>
            <p className="text-emerald-800 text-[11px] mt-0.5">
              Notre pharmacienne vous répond en direct et en toute confidentialité.
            </p>
          </div>
          <button
            onClick={onOpenWhatsApp}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Poser ma question sur WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
