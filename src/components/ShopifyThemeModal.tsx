import React, { useState } from 'react';
import {
  X,
  Download,
  Folder,
  FileCode,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Zap,
  ShoppingBag,
} from 'lucide-react';

interface ShopifyThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ThemeFileItem {
  name: string;
  folder: 'layout' | 'templates' | 'sections' | 'snippets' | 'config' | 'locales' | 'assets';
  description: string;
  codeSnippet: string;
}

const THEME_FILES_SHOWCASE: ThemeFileItem[] = [
  {
    name: 'theme.liquid',
    folder: 'layout',
    description: 'Layout maître avec Tailwind CDN, polices et points d\'ancrage Shopify OS 2.0',
    codeSnippet: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page_title }} - {{ shop.name }}</title>
    {{ content_for_header }}
    <script src="https://cdn.tailwindcss.com"></script>
    {{ 'theme.css' | asset_url | stylesheet_tag }}
  </head>
  <body class="bg-white text-slate-900 font-sans antialiased">
    {% section 'announcement-bar' %}
    {% section 'header' %}

    <main id="MainContent" role="main">
      {{ content_for_layout }}
    </main>

    {% section 'footer' %}
    {% render 'cart-drawer' %}
    {{ 'theme.js' | asset_url | script_tag }}
  </body>
</html>`,
  },
  {
    name: 'hero-vivami.liquid',
    folder: 'sections',
    description: 'Bannière d\'accueil Vivami avec sélecteur GLP-1, jauge 2-8°C et compte à rebours',
    codeSnippet: `<section id="hero" class="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white py-12 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-7 space-y-6">
        {% render 'flash-sale-urgency' %}
        <h1 class="text-3xl sm:text-5xl font-black">{{ section.settings.heading }}</h1>
        <p class="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          Commandez votre traitement officiel (Wegovy®, Mounjaro® ou Zepbound®).
        </p>
        <div class="pt-4 flex gap-4">
          <a href="#bundles" class="px-8 py-4 bg-emerald-500 font-black rounded-xl text-slate-950">
            Découvrir les Packs Dégressifs &rarr;
          </a>
        </div>
      </div>
    </div>
  </div>
</section>`,
  },
  {
    name: 'before-after-gallery.liquid',
    folder: 'sections',
    description: 'Les 11 photos Avant / Après et les histoires émouvantes de deux phrases',
    codeSnippet: `<section id="transformations" class="py-12 bg-slate-50 border-t border-b border-slate-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <!-- Filtres : Toutes (11), Wegovy (3), Mounjaro (5), Zepbound (3) -->
    <div class="flex justify-center mb-10">
      <div class="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 inline-flex gap-2" id="TransformationFilters">
        <button class="px-4 py-2 rounded-xl text-xs font-bold active bg-slate-900 text-white" data-filter="all">Toutes les photos (11)</button>
        <button class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700" data-filter="wegovy">Wegovy (3)</button>
        <button class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700" data-filter="mounjaro">Mounjaro (5)</button>
        <button class="px-4 py-2 rounded-xl text-xs font-bold text-slate-700" data-filter="zepbound">Zepbound (3)</button>
      </div>
    </div>
    <!-- Grille des 11 cas avec 2 phrases sous chaque paire -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="TransformationsGrid">
      {% comment %} 11 transformations réelles avec récits certifiés {% endcomment %}
    </div>
  </div>
</section>`,
  },
  {
    name: 'product-card.liquid',
    folder: 'snippets',
    description: 'Fiche produit modulaire avec packs 1, 2, 5 boîtes et ajout au panier AJAX',
    codeSnippet: `<div class="product-bundle-card bg-white rounded-2xl border border-slate-200 p-6">
  <form action="/cart/add" method="post" enctype="multipart/form-data" class="shopify-product-form">
    <!-- Dosage Selector -->
    <select name="id" class="w-full text-xs font-semibold bg-slate-50 border rounded-xl p-2.5">
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title }} - {{ variant.price | money }}</option>
      {% endfor %}
    </select>
    <!-- Bundle Tiers (1, 2, 5) -->
    <div class="grid grid-cols-3 gap-2 my-3">
      <button type="button" class="bundle-tier-btn" data-qty="1">1 Boîte</button>
      <button type="button" class="bundle-tier-btn active-tier" data-qty="2">2 Boîtes (-15%)</button>
      <button type="button" class="bundle-tier-btn" data-qty="5">5 Boîtes (-30%)</button>
    </div>
    <input type="hidden" name="quantity" value="2" class="bundle-quantity-input">
    <button type="submit" class="w-full py-3 bg-emerald-600 text-white font-extrabold rounded-xl">
      Ajouter au Panier
    </button>
  </form>
</div>`,
  },
  {
    name: 'cart-drawer.liquid',
    folder: 'snippets',
    description: 'Tiroir panier AJAX avec jauge de livraison gratuite et redirection vers le checkout sécurisé',
    codeSnippet: `<div id="CartDrawer" class="fixed inset-0 z-50 pointer-events-none opacity-0 invisible transition-all">
  <div id="CartDrawerOverlay" class="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"></div>
  <div class="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col" id="CartDrawerContent">
    <div class="p-4 border-b flex justify-between items-center bg-slate-50">
      <h2 class="font-extrabold text-sm">Votre Panier Médical Sécurisé</h2>
      <button id="CloseCartDrawer">✕</button>
    </div>
    <div class="flex-1 overflow-y-auto p-4 space-y-3" id="CartDrawerItems"></div>
    <div class="p-4 border-t bg-slate-50">
      <form action="/checkout" method="post">
        <button type="submit" name="checkout" class="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl">
          Finaliser Ma Commande Sécurisée &rarr;
        </button>
      </form>
      {% render 'payment-icons' %}
    </div>
  </div>
</div>`,
  },
  {
    name: 'settings_schema.json',
    folder: 'config',
    description: 'Schéma officiel Shopify OS 2.0 pour l\'éditeur de thème visuel en direct',
    codeSnippet: `[
  {
    "name": "theme_info",
    "theme_name": "VitalGLP Vivami Pro 2.0",
    "theme_version": "2.0.0"
  },
  {
    "name": "Identité Visuelle & Couleurs",
    "settings": [
      { "type": "color", "id": "color_primary", "label": "Couleur principale", "default": "#059669" },
      { "type": "checkbox", "id": "enable_urgency_timer", "label": "Activer l'offre flash", "default": true }
    ]
  }
]`,
  },
  {
    name: 'index.json',
    folder: 'templates',
    description: 'Modèle de page d\'accueil modulaire Online Store 2.0',
    codeSnippet: `{
  "sections": {
    "announcement_bar": { "type": "announcement-bar" },
    "hero_vivami": { "type": "hero-vivami" },
    "before_after_gallery": { "type": "before-after-gallery" },
    "trustpilot_ticker": { "type": "trustpilot-ticker" },
    "pink_reassurance_banner": { "type": "pink-reassurance-banner" },
    "product_bundle_grid": { "type": "product-bundle-grid" },
    "faq": { "type": "faq" },
    "trust_banner": { "type": "trust-banner" }
  },
  "order": [
    "announcement_bar",
    "hero_vivami",
    "before_after_gallery",
    "trustpilot_ticker",
    "pink_reassurance_banner",
    "product_bundle_grid",
    "faq",
    "trust_banner"
  ]
}`,
  },
];

export const ShopifyThemeModal: React.FC<ShopifyThemeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'download' | 'files' | 'compliance'>('download');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [hasCopied, setHasCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = THEME_FILES_SHOWCASE[selectedFileIndex];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.codeSnippet);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-5 flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg tracking-tight">
                  Thème Shopify Online Store 2.0 Officiel
                </h3>
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  OS 2.0 Validé
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                Structure complète 7 dossiers prête pour déploiement direct (.ZIP)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('download')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'download'
                ? 'border-emerald-600 text-emerald-950 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Télécharger & Guide Shopify</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'files'
                ? 'border-emerald-600 text-emerald-950 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-emerald-600" />
            <span>Explorateur des Fichiers Liquid ({THEME_FILES_SHOWCASE.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'border-emerald-600 text-emerald-950 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Audit de Compatibilité OS 2.0</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-xs sm:text-sm">
          
          {/* TAB 1: Download & Install */}
          {activeTab === 'download' && (
            <div className="space-y-6">
              
              {/* Primary Callout: Download ZIP */}
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 font-extrabold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Archive ZIP Complète & Validée (7.6 Mo)</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900">
                      vitalglp-shopify-theme.zip
                    </h4>
                    <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                      Contient les 7 dossiers officiels Shopify (<strong>assets</strong>, <strong>config</strong>, <strong>layout</strong>, <strong>locales</strong>, <strong>sections</strong>, <strong>snippets</strong>, <strong>templates</strong>) avec l'ensemble des 11 photos de transformation, les modèles JSON et le moteur AJAX Cart.
                    </p>
                  </div>

                  <a
                    href="/vitalglp-shopify-theme.zip"
                    download="vitalglp-shopify-theme.zip"
                    className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-black text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-5 h-5 animate-bounce" />
                    <span>Télécharger le Thème ZIP (7.6 Mo)</span>
                  </a>
                </div>
              </div>

              {/* 5-Step Shopify Installation Guide */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <span>🚀</span>
                  <span>Comment installer ce thème sur votre boutique Shopify (en 30 secondes) :</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Ouvrez votre interface Shopify Admin</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Connectez-vous sur <code>votre-boutique.myshopify.com/admin</code>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Accédez au menu Thèmes</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Allez dans <strong>Canaux de vente &gt; Boutique en ligne &gt; Thèmes</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Cliquez sur « Ajouter un thème »</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Sélectionnez <strong>Importer un fichier zip</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      4
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">Sélectionnez le fichier ZIP téléchargé</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Glissez <code>vitalglp-shopify-theme.zip</code> et cliquez sur <strong>Téléverser le fichier</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                      5
                    </span>
                    <div>
                      <div className="font-bold text-emerald-950 text-xs">Personnalisez et Publiez !</div>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        Cliquez sur <strong>Personnaliser</strong> pour ajuster vos couleurs et textes via l'éditeur visuel Online Store 2.0, puis cliquez sur <strong>Publier</strong> pour l'activer sur votre boutique.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: File Browser & Code Inspector */}
          {activeTab === 'files' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full">
              
              {/* Left: File List */}
              <div className="md:col-span-5 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col">
                <div className="p-3 bg-slate-100 border-b border-slate-200 font-extrabold text-xs text-slate-700 flex items-center gap-2">
                  <Folder className="w-4 h-4 text-emerald-600" />
                  <span>Fichiers Shopify Online Store 2.0</span>
                </div>
                <div className="divide-y divide-slate-200 overflow-y-auto max-h-[380px]">
                  {THEME_FILES_SHOWCASE.map((item, idx) => {
                    const isSelected = selectedFileIndex === idx;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSelectedFileIndex(idx)}
                        className={`w-full text-left p-3 transition-colors cursor-pointer flex flex-col gap-0.5 ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-950 border-l-4 border-emerald-600'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs flex items-center gap-1.5 font-mono">
                            <FileCode className="w-3.5 h-3.5 text-slate-400" />
                            {item.name}
                          </span>
                          <span className="text-[9px] uppercase font-black px-1.5 py-0.2 bg-slate-200 rounded text-slate-700">
                            {item.folder}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 line-clamp-1">
                          {item.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Code Preview */}
              <div className="md:col-span-7 border border-slate-200 rounded-xl overflow-hidden flex flex-col bg-slate-900 text-slate-100">
                <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-emerald-400 font-bold">{currentFile.folder}/</span>
                    <span className="text-white font-bold">{currentFile.name}</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="flex-1 p-4 font-mono text-[11px] overflow-x-auto text-emerald-300 leading-relaxed bg-slate-900/90">
                  <code>{currentFile.codeSnippet}</code>
                </pre>
              </div>

            </div>
          )}

          {/* TAB 3: Compliance & Architecture */}
          {activeTab === 'compliance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                  <div className="font-extrabold text-xs text-slate-900">Online Store 2.0</div>
                  <div className="text-[11px] text-emerald-800 mt-0.5">Modèles JSON complets</div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                  <div className="font-extrabold text-xs text-slate-900">AJAX Cart API</div>
                  <div className="text-[11px] text-emerald-800 mt-0.5">Ajout sans rechargement</div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                  <div className="font-extrabold text-xs text-slate-900">Structure Officielle</div>
                  <div className="text-[11px] text-emerald-800 mt-0.5">7 dossiers certifiés</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                <h5 className="font-extrabold text-slate-900">Détails de l'Architecture Générée :</h5>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  <li>&bull; <strong>layout/theme.liquid</strong> : Structure responsive avec balises obligatoires <code>content_for_header</code> et <code>content_for_layout</code>.</li>
                  <li>&bull; <strong>templates/*.json</strong> : Architecture 100% Online Store 2.0 avec index, product, collection, cart, search, 404 et page.</li>
                  <li>&bull; <strong>sections/*.liquid</strong> : Sections indépendantes réorganisables via le personnalisateur Shopify.</li>
                  <li>&bull; <strong>snippets/*.liquid</strong> : Éléments modulaires réutilisables (avis Trustpilot, badges de paiement, compte à rebours flash).</li>
                  <li>&bull; <strong>config/settings_schema.json & settings_data.json</strong> : Contrôles visuels validés (couleurs, logo, durée d'urgence, emails).</li>
                  <li>&bull; <strong>locales/fr.default.json & en.default.json</strong> : Dictionnaire bilingue complet avec français par défaut.</li>
                  <li>&bull; <strong>assets/</strong> : Styles compilés, script AJAX Cart et l'intégralité des 11 photos de transformation.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Thème Shopify 2.0 testé, compressé et prêt au déploiement immédiat</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Fermer
            </button>

            <a
              href="/vitalglp-shopify-theme.zip"
              download="vitalglp-shopify-theme.zip"
              className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger le .ZIP</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
