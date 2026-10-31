import React, { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, BundleTier, CartItem } from './types';
import { Header } from './components/Header';
import { VivamiStyleHero } from './components/VivamiStyleHero';
import { BeforeAfterTrustpilotSection } from './components/BeforeAfterTrustpilotSection';
import { TrustpilotTicker } from './components/TrustpilotTicker';
import { BundlesSection } from './components/BundlesSection';
import { PinkReassuranceBanner } from './components/PinkReassuranceBanner';
import { ProductCardWithBundle } from './components/ProductCardWithBundle';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickBuyModal } from './components/QuickBuyModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ShopifyThemeModal } from './components/ShopifyThemeModal';
import { StickyActionBars } from './components/StickyActionBars';
import { LiveSalesNotifier } from './components/LiveSalesNotifier';
import { Sparkles, ShieldCheck, Snowflake } from 'lucide-react';

export default function App() {
  const [currentProduct, setCurrentProduct] = useState<Product>(PRODUCTS[0]); // Wegovy default like https://fr.vivami.co/perte-de-poids/wegovy
  const [cart, setCart] = useState<CartItem[]>([
    {
      productId: 'wegovy',
      productName: 'Wegovy® FlexTouch®',
      molecule: 'Sémaglutide',
      image: '/public/assets/aistudio/436_1_14ba29ab.jpeg',
      dose: '0.25 mg (Initiation)',
      tier: PRODUCTS[0].bundleTiers[1], // 2 boxes bundle (-15%)
      count: 1,
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isShopifyModalOpen, setIsShopifyModalOpen] = useState(false);
  const [whatsAppCustomText, setWhatsAppCustomText] = useState('');

  // Cart operations
  const handleAddToCart = (product: Product, dose: string, tier: BundleTier) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.dose === dose && item.tier.quantity === tier.quantity
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].count += 1;
        return next;
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          molecule: product.molecule,
          image: product.image,
          dose,
          tier,
          count: 1,
        }
      ];
    });
    setIsCartOpen(true);
  };

  const handleDirectBuy = (product: Product, dose: string, tier: BundleTier) => {
    handleAddToCart(product, dose, tier);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCount = (index: number, newCount: number) => {
    if (newCount <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index].count = newCount;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenWhatsApp = (customPrompt?: string) => {
    setWhatsAppCustomText(customPrompt || '');
    setIsWhatsAppOpen(true);
  };

  const handleSelectProduct = (productId: 'wegovy' | 'mounjaro' | 'zepbound') => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setCurrentProduct(found);
    }
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handleExploreBundles = () => {
    const el = document.getElementById('bundles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Header with Top Bar Contract & Scrolling Free Delivery Marquee */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        onSelectProduct={handleSelectProduct}
        onOpenShopifyExport={() => setIsShopifyModalOpen(true)}
      />

      {/* Bannière de Téléchargement Direct Thème Shopify 2.0 */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white border-b border-emerald-500/30 px-4 py-2.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-200">
              Fichier d'installation Shopify OS 2.0 généré : <strong className="text-emerald-400 font-bold">vitalglp-shopify-theme.zip</strong> (7,3 Mo &bull; 55 fichiers vérifiés)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/vitalglp-shopify-theme.zip"
              download="vitalglp-shopify-theme.zip"
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Télécharger le Thème ZIP</span>
            </a>
            <button
              onClick={() => setIsShopifyModalOpen(true)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all cursor-pointer border border-white/15"
            >
              Guide d'installation Shopify
            </button>
          </div>
        </div>
      </div>

      {/* 2. Vivami-Style Hero Homepage Section (as requested: https://fr.vivami.co/perte-de-poids/wegovy) */}
      <VivamiStyleHero
        products={PRODUCTS}
        currentProduct={currentProduct}
        onSelectProduct={(p) => setCurrentProduct(p)}
        onDirectBuy={handleDirectBuy}
        onAddToCart={handleAddToCart}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* 3. Au début de Trustpilot : Les 11 photos Avant / Après et histoires émouvantes de 2 phrases (Requested by User) */}
      <BeforeAfterTrustpilotSection
        onSelectProduct={handleSelectProduct}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* 4. Scrolling Trustpilot Ticker with Green Stars & Verified Customer Reviews */}
      <TrustpilotTicker />

      {/* 4. Dedicated Bundles Showcase with 1, 2, 5 Boîtes Selector */}
      <BundlesSection
        onDirectBuy={handleDirectBuy}
        onAddToCart={handleAddToCart}
      />

      {/* Reassurance Pink Banner (as requested from image IMG_20261029_201410_0b7bb124.jpg above catalogue) */}
      <PinkReassuranceBanner />

      {/* 5. Complete Product Catalogue with Detailed Purchase Cards */}
      <section id="catalogue" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Catalogue Officiel des 3 Traitements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Fiches Produits & Variantes d'Achat en Bundles
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Chaque traitement est proposé avec ses variantes (<strong>1 acheté, 2 achetés ou 5 achetés</strong>) pour s'adapter à la durée de votre cure. Consultez également les <strong>photos avant/après certifiées</strong> sous chaque fiche.
          </p>
        </div>

        {/* 3 Full Product Cards with Bundles & Before-After Sections Below each */}
        <div className="space-y-12">
          {PRODUCTS.map((product) => (
            <ProductCardWithBundle
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onDirectBuy={handleDirectBuy}
              onOpenWhatsApp={handleOpenWhatsApp}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* 9. Live Sales Social Proof Toast */}
      <LiveSalesNotifier />

      {/* 10. Sticky Bottom Action Bar with LEFT Purchase button & WhatsApp contact button */}
      <StickyActionBars
        onQuickBuy={() => setIsQuickBuyOpen(true)}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        totalCartCount={totalCartCount}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateCount={handleUpdateCount}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
      />

      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
        onConfirmBuy={handleDirectBuy}
      />

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        initialMessage={whatsAppCustomText}
      />

      <ShopifyThemeModal
        isOpen={isShopifyModalOpen}
        onClose={() => setIsShopifyModalOpen(false)}
      />
    </div>
  );
}
