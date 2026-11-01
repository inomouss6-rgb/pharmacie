import React, { useState } from 'react';
import { Heart, Sparkles, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product, BundleTier } from '../types';
import { getAssetUrl, handleImageError } from '../utils/imageUrl';

interface TransformationCase {
  id: string;
  name: string;
  product: string;
  productId: 'wegovy' | 'mounjaro' | 'zepbound';
  weightLost: string;
  duration: string;
  image: string;
  twoSentenceStory: string;
}

const ELEVEN_TRANSFORMATIONS: TransformationCase[] = [
  {
    id: 'case-1',
    name: 'Sarah (-51 kg)',
    product: 'Wegovy® FlexTouch®',
    productId: 'wegovy',
    weightLost: '-51 kg',
    duration: '8 mois de cure',
    image: '/assets/aistudio/images__33__aa461373.jpeg',
    twoSentenceStory: "Pendant des années, je n'osais plus me regarder dans un miroir ni poser sur les photos de famille avec mes enfants. Aujourd'hui, je revis enfin, pleine d'énergie et fière de porter ma fille sur mes épaules sans la moindre douleur.",
  },
  {
    id: 'case-2',
    name: 'Élodie (-32 kg)',
    product: 'Mounjaro® KwikPen®',
    productId: 'mounjaro',
    weightLost: '-32 kg',
    duration: '22 semaines',
    image: '/assets/aistudio/images__37__42881ce3.jpeg',
    twoSentenceStory: "Mon fils m'a prise dans ses petits bras et a pleuré en disant : « Maman, je peux enfin faire tout le tour de toi pour te faire un gros câlin ». Cette phrase a illuminé ma vie et m'a prouvé que chaque effort en valait la peine.",
  },
  {
    id: 'case-3',
    name: 'Audrey (-56 kg)',
    product: 'Mounjaro® KwikPen®',
    productId: 'mounjaro',
    weightLost: '-56 kg',
    duration: '7 mois',
    image: '/assets/aistudio/123-lbs-gone-mounjaro-changed-my-life-v0-qt8ifyi365vh1_88f551c6.jpg',
    twoSentenceStory: "Flotter dans mes anciens vêtements n'était qu'un rêve lointain qui semblait impossible après mes deux grossesses difficiles. Mes enfants ont désormais une maman souriante qui passe ses week-ends à courir avec eux au parc au lieu de rester couchée par épuisement.",
  },
  {
    id: 'case-4',
    name: 'Julien (-38 kg)',
    product: 'Zepbound™ Auto-Injector',
    productId: 'zepbound',
    weightLost: '-38 kg',
    duration: '6 mois',
    image: '/assets/aistudio/du60f21m7a0g1_5f9a46dd.jpeg',
    twoSentenceStory: "Mon cardiologue m'avait prévenu que mon cœur ne supporterait pas dix années de plus à ce rythme alarmant. Retrouver cette silhouette athlétique a sauvé ma santé et m'a rendu la fierté d'être un père solide et présent pour mes deux garçons.",
  },
  {
    id: 'case-5',
    name: 'Martine (-47 kg)',
    product: 'Mounjaro® KwikPen®',
    productId: 'mounjaro',
    weightLost: '-47 kg',
    duration: '9 mois',
    image: '/assets/aistudio/RW-11-08-WEIGHTLOSS-Mounjaro_4c2339_708821fc.webp',
    twoSentenceStory: "À 58 ans, je pensais que le surpoids était une fatalité contre laquelle je ne pourrais plus jamais lutter. Quand mes petits-enfants m'ont vue courir pour attraper le ballon cet été, leurs éclats de rire ont été la plus belle récompense de mon existence.",
  },
  {
    id: 'case-6',
    name: 'Camille (-24 kg)',
    product: 'Mounjaro® KwikPen®',
    productId: 'mounjaro',
    weightLost: '-24 kg',
    duration: '11 semaines',
    image: '/assets/aistudio/images__32__8773c5f1.jpeg',
    twoSentenceStory: "En seulement 11 semaines, la sensation permanente d'étouffement et le bruit mental qui m'écrasaient ont totalement disparu. Mon mari me regarde à nouveau avec cette même lueur d'admiration et de tendresse que le jour de notre mariage.",
  },
  {
    id: 'case-7',
    name: 'Stéphane (-35 kg)',
    product: 'Wegovy® FlexTouch®',
    productId: 'wegovy',
    weightLost: '-35 kg',
    duration: '24 semaines',
    image: '/assets/aistudio/sb6yp5hqpn9f1_19768cd9.jpeg',
    twoSentenceStory: "L'apnée du sommeil me privait d'énergie et je passais mes journées dans un brouillard de fatigue qui pesait sur toute ma famille. Me réveiller aujourd'hui en pleine forme et pouvoir faire de longues randonnées avec mon épouse a littéralement sauvé notre couple.",
  },
  {
    id: 'case-8',
    name: 'Céline (-29 kg)',
    product: 'Zepbound™ Auto-Injector',
    productId: 'zepbound',
    weightLost: '-29 kg',
    duration: '18 semaines',
    image: '/assets/aistudio/images__28__60d7cc14.jpeg',
    twoSentenceStory: "J'avais renoncé à m'aimer et je m'effaçais peu à peu dans mon quotidien de mère débordée. Réapprendre à apprécier mon corps a redonné un élan formidable à ma féminité et à la complicité au sein de notre foyer.",
  },
  {
    id: 'case-9',
    name: 'Nathalie (-22 kg)',
    product: 'Mounjaro® KwikPen®',
    productId: 'mounjaro',
    weightLost: '-22 kg',
    duration: '82 jours',
    image: '/assets/aistudio/images__38__782c7914.jpeg',
    twoSentenceStory: "À l'approche de la cinquantaine, mon métabolisme semblait totalement bloqué malgré d'innombrables régimes restrictifs. En moins de 3 mois de traitement régulier, ma silhouette s'est métamorphosée et je n'ai plus jamais honte de me mettre en maillot de bain lors des vacances en famille.",
  },
  {
    id: 'case-10',
    name: 'David (-42 kg)',
    product: 'Wegovy® FlexTouch®',
    productId: 'wegovy',
    weightLost: '-42 kg',
    duration: '6 mois',
    image: '/assets/aistudio/unnamed__1__03d930cf.png',
    twoSentenceStory: "Gravir les escaliers de la maison était devenu un calvaire au point que je devais m'arrêter au milieu pour reprendre mon souffle. Aujourd'hui, je fais du vélo avec mes enfants sans aucune douleur articulaire et nous partageons enfin de vrais moments d'aventure.",
  },
  {
    id: 'case-11',
    name: 'Maxime (-34 kg)',
    product: 'Zepbound™ Auto-Injector',
    productId: 'zepbound',
    weightLost: '-34 kg',
    duration: '5 mois',
    image: '/assets/aistudio/unnamed_557c80a7.png',
    twoSentenceStory: "Je me cachais derrière des costumes trop larges et je n'osais pas aller vers les autres tant ma timidité et mon surpoids me pesaient. Ce voyage au Japon avec mon sac à dos a été la preuve vivante de ma renaissance, le sourire aux lèvres face à l'avenir.",
  },
];

interface BeforeAfterTrustpilotSectionProps {
  onSelectProduct: (productId: 'wegovy' | 'mounjaro' | 'zepbound') => void;
  onOpenWhatsApp: (customPrompt?: string) => void;
}

export const BeforeAfterTrustpilotSection: React.FC<BeforeAfterTrustpilotSectionProps> = ({
  onSelectProduct,
  onOpenWhatsApp,
}) => {
  const [filter, setFilter] = useState<'all' | 'wegovy' | 'mounjaro' | 'zepbound'>('all');

  const filteredCases = filter === 'all'
    ? ELEVEN_TRANSFORMATIONS
    : ELEVEN_TRANSFORMATIONS.filter((c) => c.productId === filter);

  return (
    <section id="avant-apres-trustpilot" className="py-14 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Filter tabs */}
        <div className="flex justify-center pb-2">
          <div className="inline-flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Toutes les photos (11)
            </button>
            <button
              onClick={() => setFilter('wegovy')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'wegovy'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Wegovy (3)
            </button>
            <button
              onClick={() => setFilter('mounjaro')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'mounjaro'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mounjaro (5)
            </button>
            <button
              onClick={() => setFilter('zepbound')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'zepbound'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Zepbound (3)
            </button>
          </div>
        </div>

        {/* 11 Transformations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Photo Before / After with tags */}
              <div className="relative bg-slate-100 overflow-hidden">
                <img
                  src={getAssetUrl(item.image)}
                  alt={`Avant Après ${item.name}`}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  loading="eager"
                  className="w-full h-80 object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Avant / Après
                </div>

                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                  {item.weightLost}
                </div>

                {/* Patient title strip */}
                <div className="absolute bottom-2 inset-x-2 bg-slate-950/85 backdrop-blur-xs text-white rounded-lg px-3 py-1.5 flex items-center justify-between text-xs">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-[11px] text-emerald-400 font-semibold">{item.duration}</span>
                </div>
              </div>

              {/* Emotional 2-Sentence Story (Histoire de deux phrases émouvante) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                      {item.product}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Dossier vérifié
                    </span>
                  </div>

                  {/* 2-Sentence moving story */}
                  <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-900 mb-1">
                      <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                      <span>Histoire vécue :</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      « {item.twoSentenceStory} »
                    </p>
                  </div>
                </div>

                {/* Bottom Action for this patient case */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProduct(item.productId)}
                    className="text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Commander {item.product.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenWhatsApp(`Bonjour, j'ai été très touché(e) par le témoignage de ${item.name} (${item.weightLost}). Je souhaite des conseils pour débuter avec ${item.product}.`)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    Conseil WhatsApp
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Reassurance banner below the 11 photos */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Tous les résultats photographiques sont partagés avec l'accord certifié des patients.</span>
          </div>
          <span className="text-emerald-700 font-bold">
            Rejoignez plus de 14 500 personnes transformées
          </span>
        </div>

        {/* Official Trustpilot Branding following the 11 photo stories (exact replica of Screenshot 1) */}
        <div className="pt-10 border-t border-slate-200 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-2xl font-black text-slate-900">
            {/* Trustpilot Star Icon */}
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#00b67a]">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="tracking-tight text-3xl">Trustpilot</span>
          </div>

          {/* 5 Green Square Stars */}
          <div className="flex items-center justify-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 bg-[#00b67a] flex items-center justify-center rounded-[3px] shadow-xs">
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            ))}
          </div>

          <div className="text-xs sm:text-sm text-slate-600 font-medium">
            Score <strong className="text-slate-900 font-bold">4.9 / 5</strong> basé sur <strong className="text-slate-900 font-bold">2 890+ avis réels vérifiés</strong>
          </div>
        </div>

      </div>
    </section>
  );
};
