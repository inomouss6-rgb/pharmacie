import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'wegovy',
    name: 'Wegovy® FlexTouch®',
    brand: 'Novo Nordisk',
    molecule: 'Sémaglutide (1 injection sous-cutanée / semaine)',
    tagline: 'Le traitement de référence mondial pour la gestion du poids',
    shortDesc: 'Stylo prérempli pour une action ciblée sur la satiété et la régulation métabolique sans frustration.',
    fullDesc: 'Wegovy® (sémaglutide) reproduit l’action de l’hormone naturelle GLP-1 pour ralentir la vidange gastrique et communiquer directement avec les centres cérébraux de l’appétit. Résultat : une réduction spontanée des portions alimentaires et une fonte graisseuse continue et durable.',
    rating: 4.9,
    reviewCount: 1420,
    doses: ['0.25 mg (Initiation)', '0.5 mg (Progression)', '1.0 mg (Maintien)', '1.7 mg (Intensif)', '2.4 mg (Dose Maximale)'],
    defaultDose: '1.0 mg (Maintien)',
    image: '/assets/aistudio/436_1_14ba29ab.jpeg',
    colorTheme: {
      primary: '#0284c7', // Sky / Cyan
      light: '#e0f2fe',
      accent: '#0369a1',
      border: '#bae6fd',
    },
    features: [
      'Injection quasi-indolore avec aiguilles micro-fines 32G',
      'Effet coupe-faim dès les premières 48 heures',
      'Contrôle des fringales nocturnes et pulsions sucrées',
      'Stylo prêt à l’emploi 4 doses (1 mois de traitement complet)'
    ],
    stockLeft: 7,
    clinicalTrial: {
      stat: '-15.8%',
      label: 'de perte de poids moyenne mesurée lors des essais cliniques STEP-1',
      source: 'Étude clinique STEP (New England Journal of Medicine)',
    },
    bundleTiers: [
      {
        quantity: 1,
        title: 'Cure Découverte (1 Stylo / 1 Mois)',
        discountPercent: 0,
        unitPrice: 289,
        originalUnitPrice: 289,
        totalPrice: 289,
        originalTotalPrice: 289,
        savings: 0,
        perks: [
          '1 Stylo Wegovy® (4 doses hebdomadaires)',
          '4 aiguilles stériles micro-fines fournies',
          'Guide nutritionnel & protocole d’injection PDF',
          'Expédition réfrigérée certifiée 2-8°C'
        ]
      },
      {
        quantity: 2,
        title: 'Cure Recommandée (2 Stylos / 2 Mois)',
        badge: 'LE PLUS POPULAIRE - 68% DES COMMANDES',
        popular: true,
        discountPercent: 15,
        unitPrice: 245,
        originalUnitPrice: 289,
        totalPrice: 490,
        originalTotalPrice: 578,
        savings: 88,
        perks: [
          '2 Stylos Wegovy® (8 doses - 2 mois de cure)',
          '8 aiguilles stériles + lingettes désinfectantes',
          'Pochette isotherme de voyage offerte (Valeur 29€)',
          'Suivi WhatsApp prioritaire avec notre pharmacien',
          'Livraison express réfrigérée Chronofresh OFFERTE'
        ]
      },
      {
        quantity: 5,
        title: 'Pack Transformation Totale (5 Stylos / 5 Mois)',
        badge: 'MEILLEURE ÉCONOMIE -30% & PACK COMPLET',
        bestValue: true,
        discountPercent: 30,
        unitPrice: 202,
        originalUnitPrice: 289,
        totalPrice: 1010,
        originalTotalPrice: 1445,
        savings: 435,
        perks: [
          '5 Stylos Wegovy® (20 doses - transformation complète)',
          'Pack complet 25 aiguilles stériles de rechange',
          'Kit isotherme réfrigéré haute performance nomade',
          'Consultation de suivi diététique personnalisée',
          'Garantie satisfait ou remboursé 30 jours',
          'Expédition prioritaire VIP garantie 24h'
        ]
      }
    ],
    beforeAfterList: [
      {
        id: 'ba-kelsey',
        name: 'Kelsey D.',
        age: 33,
        city: 'Nantes',
        duration: '7 mois de cure',
        weightLost: '-57 kg',
        initialWeight: '118 kg',
        finalWeight: '61 kg',
        waistLost: '-38 cm',
        beforeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        afterImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        compositeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        quote: "« Je revis littéralement. Pour la première fois depuis 10 ans, j'ai accompagné mes enfants à vélo sans devoir m'asseoir après 5 minutes. »",
        familyStory: "Mes deux filles me disaient souvent 'Maman est toujours fatiguée'. Aujourd'hui, je cours avec elles au parc, mon mari me regarde avec des yeux brillants comme au premier jour. C'est plus qu'une perte de poids, c'est une renaissance familiale.",
        verifiedMedical: true
      },
      {
        id: 'ba-sophie',
        name: 'Sophie L.',
        age: 41,
        city: 'Lyon',
        duration: '16 semaines',
        weightLost: '-24 kg',
        initialWeight: '89 kg',
        finalWeight: '65 kg',
        waistLost: '-21 cm',
        beforeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        afterImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        quote: "« Wegovy a mis fin au bruit mental permanent lié à la nourriture. Les repas en famille sont redevenus un moment de pur plaisir sans compulsion. »",
        familyStory: "À table, je ne suis plus obsédée par me resservir trois fois. Mon conjoint a même commencé à manger plus sainement avec moi. Nos dimanches sont désormais remplis de randonnées avec les enfants !",
        verifiedMedical: true
      }
    ]
  },
  {
    id: 'mounjaro',
    name: 'Mounjaro® KwikPen®',
    brand: 'Eli Lilly',
    molecule: 'Tirzépatide (Double agoniste GLP-1 + GIP)',
    tagline: 'La technologie révolutionnaire à double action métabolique',
    shortDesc: 'Stylo multi-doses breveté KwikPen agissant simultanément sur deux récepteurs hormonaux clés.',
    fullDesc: 'Mounjaro® est le premier traitement de sa catégorie combinant les récepteurs GIP et GLP-1. Cette double synergie optimise la sensibilité à l’insuline, active le déstockage des graisses profondes et coupe nette l’appétence pour les glucides et graisses saturées.',
    rating: 4.95,
    reviewCount: 1890,
    doses: ['2.5 mg (Départ)', '5.0 mg (Élévation)', '7.5 mg (Intermédiaire)', '10 mg (Cible)', '12.5 mg (Avancé)', '15 mg (Puissance Maximale)'],
    defaultDose: '12.5 mg (Avancé)',
    image: '/assets/aistudio/Mounjaro-KwikPen-Display_a0f5e31b.png',
    colorTheme: {
      primary: '#4338ca', // Indigo / Purple
      light: '#e0e7ff',
      accent: '#3730a3',
      border: '#c7d2fe',
    },
    features: [
      'Innovation KwikPen 4 doses à dosage millimétré avec fenêtre visible',
      'Double action GLP-1 + GIP : déstockage lipidique accéléré',
      'Effet stabilisateur sur la glycémie et l’énergie journalière',
      'Efficacité clinique record supérieure aux mono-agonistes'
    ],
    stockLeft: 4,
    clinicalTrial: {
      stat: '-22.5%',
      label: 'de réduction pondérale chez les patients ayant suivi le protocole complet SURMOUNT',
      source: 'Étude SURMOUNT-1 (Eli Lilly / New England Journal of Medicine)',
    },
    bundleTiers: [
      {
        quantity: 1,
        title: 'Cure Découverte (1 KwikPen / 1 Mois)',
        discountPercent: 0,
        unitPrice: 319,
        originalUnitPrice: 319,
        totalPrice: 319,
        originalTotalPrice: 319,
        savings: 0,
        perks: [
          '1 Stylo Mounjaro® KwikPen® officiel Lilly',
          '4 aiguilles stériles à biseau ultrafin',
          'Guide d’amorçage KwikPen illustré en français',
          'Emballage thermo-isolé classe médicale 2-8°C'
        ]
      },
      {
        quantity: 2,
        title: 'Cure Recommandée (2 KwikPens / 2 Mois)',
        badge: 'LE PLUS DEMANDÉ - MEILLEUR RAPPORT EFFICACITÉ',
        popular: true,
        discountPercent: 15,
        unitPrice: 271,
        originalUnitPrice: 319,
        totalPrice: 542,
        originalTotalPrice: 638,
        savings: 96,
        perks: [
          '2 Stylos Mounjaro® KwikPen® (8 semaines)',
          'Boîte de 10 aiguilles stériles spéciales KwikPen',
          'Étui de transport isotherme rigide (Valeur 35€)',
          'Accompagnement WhatsApp médical 7j/7 dédié',
          'Expédition sécurisée Chronofresh 24h OFFERTE'
        ]
      },
      {
        quantity: 5,
        title: 'Pack Métamorphose Totale (5 KwikPens / 5 Mois)',
        badge: 'ÉCONOMIE MAXIMALE -30% & CURE OPTIMALE',
        bestValue: true,
        discountPercent: 30,
        unitPrice: 223,
        originalUnitPrice: 319,
        totalPrice: 1115,
        originalTotalPrice: 1595,
        savings: 480,
        perks: [
          '5 Stylos Mounjaro® KwikPen® (20 semaines)',
          'Réserve complète de 30 aiguilles stériles',
          'Glacière électronique USB de transport offerte (Valeur 79€)',
          'Consultations diététiques mensuelles en visio/WhatsApp',
          'Garantie Satisfait ou Remboursé sous 30 jours',
          'Traitement VIP prioritaire expédié le jour même'
        ]
      }
    ],
    beforeAfterList: [
      {
        id: 'ba-thomas',
        name: 'Thomas & Élodie B.',
        age: 38,
        city: 'Bordeaux',
        duration: '5 mois de cure',
        weightLost: '-36 kg',
        initialWeight: '112 kg',
        finalWeight: '76 kg',
        waistLost: '-29 cm',
        beforeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        afterImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        compositeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        quote: "« Mounjaro a été un tournant radical. Non seulement j'ai perdu 36 kg, mais ma tension artérielle est revenue à la normale. »",
        familyStory: "Mon fils de 7 ans m'a pris dans ses bras et a réussi à faire le tour complet avec ses petits bras en criant 'Papa, je peux te serrer tout entier !'. J'en ai pleuré de joie avec ma femme. Nous avons retrouvé notre complicité de jeunes mariés.",
        verifiedMedical: true
      },
      {
        id: 'ba-marc',
        name: 'Marc R.',
        age: 52,
        city: 'Strasbourg',
        duration: '18 semaines',
        weightLost: '-27 kg',
        initialWeight: '104 kg',
        finalWeight: '77 kg',
        waistLost: '-24 cm',
        beforeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        afterImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        quote: "« Douleurs articulaires disparues, énergie décuplée. Mes collègues et mes proches n'en revenaient pas lors de nos vacances d'été. »",
        familyStory: "Toute la famille sourit à nouveau lors des réunions. Je peux enfin jouer au foot dans le jardin avec mes petits-enfants sans être épuisé.",
        verifiedMedical: true
      }
    ]
  },
  {
    id: 'zepbound',
    name: 'Zepbound™ Auto-Injector',
    brand: 'Eli Lilly',
    molecule: 'Tirzépatide Spécifique Perte de Poids Clinique',
    tagline: 'La formulation Lilly nouvelle génération dédiée exclusivement à la perte de masse grasse',
    shortDesc: 'Dispositif auto-injecteur mono-dose à déclenchement automatique pour une simplicité absolue.',
    fullDesc: 'Zepbound™ est la désignation officielle d’Eli Lilly pour le tirzépatide dans l’indication stricte du surpoids et de l’obésité. Agissant comme un régulateur hormonal puissant du comportement alimentaire, il permet de réinitialiser le point de consigne pondéral du métabolisme.',
    rating: 4.98,
    reviewCount: 1650,
    doses: ['2.5 mg / 0.5 mL', '5.0 mg / 0.5 mL', '7.5 mg / 0.5 mL', '10 mg / 0.5 mL', '12.5 mg / 0.5 mL', '15 mg / 0.5 mL'],
    defaultDose: '5.0 mg / 0.5 mL',
    // Using a clear graphic presentation matching Lilly Zepbound branding
    image: '/assets/aistudio/Mounjaro-KwikPen-Display_a0f5e31b.png', // high resolution display asset
    colorTheme: {
      primary: '#0d9488', // Teal / Emerald
      light: '#ccfbf1',
      accent: '#0f766e',
      border: '#99f6e4',
    },
    features: [
      'Aiguille cachée et protégée avec injection en 1 clic sans manipulation',
      'Ciblage spécifique du tissu adipeux viscéral',
      'Préservation maximale de la masse musculaire maigre',
      'Tolérance digestive optimisée grâce à la cinétique progressive'
    ],
    stockLeft: 5,
    clinicalTrial: {
      stat: '-20.9% à -25.3%',
      label: 'de perte de masse corporelle mesurée à 72 semaines dans les programmes SURMOUNT-3',
      source: 'Journal of the American Medical Association (JAMA)',
    },
    bundleTiers: [
      {
        quantity: 1,
        title: 'Cure Découverte (1 Boîte / 4 Auto-injecteurs)',
        discountPercent: 0,
        unitPrice: 329,
        originalUnitPrice: 329,
        totalPrice: 329,
        originalTotalPrice: 329,
        savings: 0,
        perks: [
          '1 Boîte Zepbound™ (4 injecteurs prêts à l’emploi)',
          'Aucune aiguille à fixer, système mono-clic 100% sécurisé',
          'Carnet de bord mensuel de pesée et de mensurations',
          'Transport express réfrigéré contrôlé'
        ]
      },
      {
        quantity: 2,
        title: 'Cure Recommandée (2 Boîtes / 8 Auto-injecteurs)',
        badge: 'CURE CONSEILLÉE PAR NOS MÉDECINS PARTENAIRES',
        popular: true,
        discountPercent: 15,
        unitPrice: 279,
        originalUnitPrice: 329,
        totalPrice: 558,
        originalTotalPrice: 658,
        savings: 100,
        perks: [
          '2 Boîtes Zepbound™ (8 semaines complètes)',
          'Pochette isotherme voyage offerte (Maintien 12h à 4°C)',
          'Accès direct WhatsApp à l’équipe médicale',
          'Guide des repas riches en protéines spécial Zepbound',
          'Livraison réfrigérée 24h Chronofresh OFFERTE'
        ]
      },
      {
        quantity: 5,
        title: 'Pack Réussite Garantie (5 Boîtes / 20 Auto-injecteurs)',
        badge: 'REMISE RECORD -30% & RÉSULTATS GARANTIS',
        bestValue: true,
        discountPercent: 30,
        unitPrice: 230,
        originalUnitPrice: 329,
        totalPrice: 1150,
        originalTotalPrice: 1645,
        savings: 495,
        perks: [
          '5 Boîtes Zepbound™ (20 semaines de traitement)',
          'Thermos médical connecté avec indicateur de température (Valeur 89€)',
          'Coaching nutritionnel hebdomadaire personnalisé via WhatsApp',
          'Garantie Satisfait ou Remboursé intégral 30 jours',
          'Livraison prioritaire avec créneau horaire sur mesure'
        ]
      }
    ],
    beforeAfterList: [
      {
        id: 'ba-stephanie',
        name: 'Stéphanie & Julien M.',
        age: 36,
        city: 'Toulouse',
        duration: '22 semaines',
        weightLost: '-31 kg',
        initialWeight: '96 kg',
        finalWeight: '65 kg',
        waistLost: '-26 cm',
        beforeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        afterImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        compositeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        quote: "« Après 3 grossesses, je pensais ne plus jamais retrouver mon corps. Zepbound a fonctionné là où tous les régimes stricts avaient échoué. »",
        familyStory: "Notre photo de famille sur la plage l'été dernier est magnifique. Pour la première fois depuis 12 ans, je ne me cache plus derrière les enfants sur les photos de vacances ! Nous sommes tellement plus heureux au quotidien.",
        verifiedMedical: true
      },
      {
        id: 'ba-david',
        name: 'David P.',
        age: 46,
        city: 'Lille',
        duration: '6 mois',
        weightLost: '-42 kg',
        initialWeight: '124 kg',
        finalWeight: '82 kg',
        waistLost: '-34 cm',
        beforeImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        afterImg: '/assets/aistudio/Screenshot_2026-10-29-04-23-05-488_com.android.chrome_bd20d3af.jpg',
        quote: "« J'ai perdu 42 kg sans jamais souffrir de la faim. L'injection hebdomadaire est tellement facile avec l'auto-injecteur. »",
        familyStory: "Je peux porter mes enfants sur mes épaules pendant des heures au zoo. Ma femme me dit qu'elle a l'impression d'avoir un nouveau mari plein de vie.",
        verifiedMedical: true
      }
    ]
  }
];
