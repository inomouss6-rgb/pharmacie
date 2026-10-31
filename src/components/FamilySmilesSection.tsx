import React, { useState } from 'react';
import { Heart, Smile, Sparkles, MessageCircle, ShieldCheck, Star } from 'lucide-react';

interface FamilySmilesSectionProps {
  onOpenWhatsApp: (prompt?: string) => void;
  onExploreBundles: () => void;
}

export const FamilySmilesSection: React.FC<FamilySmilesSectionProps> = ({
  onOpenWhatsApp,
  onExploreBundles,
}) => {
  const [userGoal, setUserGoal] = useState<string>('');

  const familyStories = [
    {
      title: '« Retrouver le plaisir simple de courir avec mes deux enfants »',
      author: 'Famille Mercier (Stéphanie, 37 ans & ses enfants Lucas et Zoé)',
      loss: '-31 kg avec Wegovy',
      story: 'Pendant des années, j’évitais le parc car j’avais trop mal aux genoux et j’étais à bout de souffle en 2 minutes. Aujourd’hui, c’est moi qui propose les balades à vélo. Quand ma fille m’a dit : « Maman, tu es tellement plus joyeuse maintenant ! », j’ai su que c’était la plus belle décision de ma vie.',
      tag: 'Énergie & Vitalité Retrouvées'
    },
    {
      title: '« Mon fils peut enfin faire le tour de ma taille dans ses bras »',
      author: 'Famille Belkacem (Thomas, 42 ans, son épouse et leur fils)',
      loss: '-36 kg avec Mounjaro',
      story: 'J’avais développé une hypertension inquiétante. Le traitement combiné à un rééquilibrage m’a fait perdre 36 kg. Le jour où mon fils m’a serré fort en me disant qu’il arrivait à toucher ses deux mains autour de mon dos, toute la famille a versé une larme. Nous sommes repartis en vacances à la montagne cet été avec un bonheur immense.',
      tag: 'Santé Cardiovasculaire & Fierté'
    },
    {
      title: '« Nous nous sommes remis à faire des projets de couple et de voyages »',
      author: 'Nathalie & Marc (51 et 54 ans)',
      loss: '-48 kg en couple',
      story: 'Le poids nous enfermait à la maison. Avec Zepbound et l’accompagnement de la pharmacie, nous avons réappris à manger sereinement. On sourit sur chaque photo, on ne se cache plus. Nos enfants nous disent qu’on a rajeuni de 10 ans !',
      tag: 'Complicité & Rajeunissement'
    }
  ];

  const handleStartConversation = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = userGoal.trim()
      ? `Bonjour, mon objectif personnel et familial est : "${userGoal}". Quels conseils et bundle (Wegovy, Mounjaro ou Zepbound) me recommandez-vous pour démarrer sereinement ?`
      : 'Bonjour, je souhaite échanger avec un pharmacien au sujet de ma perte de poids et des solutions GLP-1 adaptées.';
    onOpenWhatsApp(prompt);
  };

  return (
    <section id="temoignages-familles" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Des Vies Métamorphosées</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Des sourires retrouvés en famille après chaque cure
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Perdre du poids avec un traitement GLP-1 n’est pas qu’une affaire de chiffres sur la balance. C’est avant tout retrouver le souffle, la joie de vivre et partager des moments précieux avec les êtres qu’on aime.
          </p>
        </div>

        {/* 3 Family Emotional Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {familyStories.map((fam, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 ease-out group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                    {fam.tag}
                  </span>
                  <div className="flex items-center gap-0.5 text-emerald-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {fam.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{fam.story}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 mt-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{fam.author}</div>
                  <div className="text-[11px] text-emerald-700 font-extrabold">{fam.loss}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <Smile className="w-4 h-4 text-rose-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conversation Starter Callout (Pousse à la conversation WhatsApp) */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-700/70 border border-emerald-500/50 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300 fill-emerald-300" />
              <span>Discussion confidentielle avec nos professionnels de santé</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Et vous, quel est le moment de bonheur que vous avez hâte de revivre avec vos proches ?
            </h3>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Dites-nous ce qui compte le plus pour vous (jouer avec vos enfants, retrouver confiance en vacances, améliorer votre bilan de santé). Nous vous répondons immédiatement avec un plan de cure personnalisé.
            </p>

            <form onSubmit={handleStartConversation} className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <input
                type="text"
                value={userGoal}
                onChange={(e) => setUserGoal(e.target.value)}
                placeholder="Ex : Pouvoir faire du sport avec mes enfants et perdre 20 kg..."
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Engager la conversation sur WhatsApp</span>
              </button>
            </form>
          </div>

          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />
        </div>

      </div>
    </section>
  );
};
