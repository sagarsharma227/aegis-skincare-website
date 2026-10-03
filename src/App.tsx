import React, { useState, useEffect } from 'react';
import { NavView, Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { StarterSystemHero } from './components/StarterSystemHero';
import { ProductCard } from './components/ProductCard';
import { ClinicalComparison } from './components/ClinicalComparison';
import { CustomerReviews } from './components/CustomerReviews';
import { FrequentlyAskedQuestions } from './components/FrequentlyAskedQuestions';
import { NewsletterSection } from './components/NewsletterSection';
import { RoutineQuiz } from './components/RoutineQuiz';
import { ShopView } from './components/ShopView';
import { RoutinesView } from './components/RoutinesView';
import { IngredientsView } from './components/IngredientsView';
import { ScienceView } from './components/ScienceView';
import { JournalView } from './components/JournalView';
import { AboutView } from './components/AboutView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AegisAIChatbot } from './components/AegisAIChatbot';
import { useAssetPreload } from './hooks/useAssetPreload';
import { Sparkles, ArrowRight, Sun, Moon, Clock, Copy, Check, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'motion/react';

export function App() {
  // Preload critical hero assets and product imagery for seamless flicker-free navigation
  useAssetPreload();

  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    setShowScrollTop(latest > 0.12);
  });

  // Sync memory images to server safely (runs once on load)
  useEffect(() => {
    const syncImages = async () => {
      try {
        const images: { id: string, dataUrl: string }[] = [];
        
        const scanStorage = (storage: Storage) => {
          try {
            for (let i = 0; i < storage.length; i++) {
              const key = storage.key(i);
              if (!key) continue;
              const dataUrl = storage.getItem(key);
              if (dataUrl && (dataUrl.startsWith('data:image') || dataUrl.startsWith('http'))) {
                let id = '';
                if (key.startsWith('custom_image_')) {
                  id = key.replace('custom_image_', '').replace(/^aegis_/, 'aegis-').replace(/_/g, '-');
                } else if (key.startsWith('aegis_') || key.startsWith('aegis-') || key.startsWith('art-')) {
                  id = key.replace(/_/g, '-');
                }
                if (id && !images.some(img => img.id === id)) {
                  images.push({ id, dataUrl });
                }
              }
            }
          } catch {}
        };

        scanStorage(localStorage);
        scanStorage(sessionStorage);

        if (images.length > 0) {
          const res = await fetch('/api/sync-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images })
          }).catch(() => null);

          if (res && res.ok) {
            const result = await res.json().catch(() => null);
            if (result) {
              console.log('Synchronized custom images:', images.length);
            }
          }
        }
      } catch {}
    };
    
    syncImages();
  }, []);

  // Navigation View State
  const [currentView, setCurrentView] = useState<NavView>('home');

  // Selected Product Detail State
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Recently Viewed Products State
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aegis_recently_viewed');
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        return parsed.filter(id => PRODUCTS.some(p => p.id === id));
      }
      return ['aegis-wash', 'aegis-clear'];
    } catch {
      return ['aegis-wash', 'aegis-clear'];
    }
  });

  // Cart & Wishlist State (starts empty initially)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aegis_cart');
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        // Auto-remove any cart items that no longer exist in the active catalog
        return parsed.filter(item => PRODUCTS.some(p => p.id === item.product.id));
      }
      return [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aegis_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        // Auto-remove any wishlist IDs that no longer exist in the active catalog
        return parsed.filter(id => PRODUCTS.some(p => p.id === id));
      }
      return [];
    } catch {
      return [];
    }
  });

  // Drawer / Modal Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Track product views in recently viewed list
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const updated = [productId, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('aegis_recently_viewed', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Save Cart & Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aegis_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('aegis_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  // Handle Hash Routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'arifa-naved') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const validViews: NavView[] = [
        'home',
        'shop',
        'quiz',
        'routines',
        'ingredients',
        'science',
        'journal',
        'about'
      ];
      if (validViews.includes(hash as NavView)) {
        setCurrentView(hash as NavView);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const changeView = (view: NavView) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to bag.`);
  };

  const handleAddMultipleToCart = (products: Product[]) => {
    setCartItems((prev) => {
      const next = [...prev];
      for (const product of products) {
        const existing = next.find((item) => item.product.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          next.push({ product, quantity: 1 });
        }
      }
      return next;
    });
    showToast(`Added ${products.length} routine formulas to your bag.`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed formula from saved items.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved formula to wishlist.');
        return [...prev, productId];
      }
    });
  };

  const selectedProduct = selectedProductId
    ? PRODUCTS.find((p) => p.id === selectedProductId)
    : null;

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F2EFE9] text-[#1A1C1B] font-sans antialiased flex flex-col justify-between selection:bg-[#526442] selection:text-[#FAF9F7] relative">
      {/* Mobile-Optimized Quick Scroll-to-Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="mobile-scroll-to-top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-5 sm:left-6 z-40 p-2.5 rounded-full bg-[#FAF9F7]/95 hover:bg-[#FAF9F7] text-[#1A1C1B] border border-[#E2DDD5] shadow-md backdrop-blur-md cursor-pointer flex items-center justify-center hover:scale-105 active:scale-90 transition-transform"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 text-[#526442]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Sticky Header */}
      <Header
        currentView={currentView}
        setCurrentView={changeView}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Views */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            {/* Website Intro Section */}
            <Hero
              setCurrentView={changeView}
              onAddToCart={handleAddToCart}
            />

            {/* Deep Charcoal Brand Philosophy */}
            <BrandPhilosophy />

            {/* Decorative Architectural Transition Separator */}
            <div className="relative py-4 bg-[#1A1C1B] overflow-hidden select-none" aria-hidden="true">
              <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="relative flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#526442]/60 to-transparent" />
                  <div className="absolute px-4 bg-[#1A1C1B] flex items-center gap-2.5 text-[9.5px] font-mono-spec tracking-[0.28em] text-[#8C9B86] uppercase">
                    <span className="w-1 h-1 rounded-full bg-[#526442] animate-pulse" />
                    <span>FOUNDATIONAL DAILY PROTOCOL</span>
                    <span className="w-1 h-1 rounded-full bg-[#526442] animate-pulse" />
                  </div>
                </div>
              </div>
              {/* Soft ambient transition into the Starter System warm stone arena */}
              <div className="absolute inset-x-0 -bottom-4 h-8 bg-gradient-to-b from-transparent to-[#F2EFE9]/20 pointer-events-none" />
            </div>
            
            {/* The Essentials: Starter System */}
            <StarterSystemHero
              onAddToCart={handleAddToCart}
              setCurrentView={changeView}
            />

            {/* High-Contrast Deep Charcoal Clinical Contrast Section */}
            <ClinicalComparison />

            {/* Everyday Experiences / Customer Reviews */}
            <CustomerReviews onSelectProduct={() => {}} />

            {/* FAQ: Routine Sequencing & Active Ingredients */}
            <FrequentlyAskedQuestions setCurrentView={changeView} />

            {/* Discreet, stylish newsletter subscription section above footer */}
            <NewsletterSection onSuccessToast={showToast} />
          </div>
        )}

        {currentView === 'shop' && (
          <ShopView
            onSelectProduct={() => {}}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            recentlyViewedIds={recentlyViewedIds}
          />
        )}

        {currentView === 'quiz' && (
          <RoutineQuiz
            onAddToCart={handleAddToCart}
            onAddMultipleToCart={handleAddMultipleToCart}
            onSelectProduct={handleSelectProduct}
            onShowToast={showToast}
          />
        )}

        {currentView === 'routines' && (
          <RoutinesView
            setCurrentView={changeView}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onAddMultipleToCart={handleAddMultipleToCart}
          />
        )}

        {currentView === 'ingredients' && (
          <IngredientsView
            setCurrentView={changeView}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'science' && (
          <ScienceView setCurrentView={changeView} />
        )}

        {currentView === 'journal' && (
          <JournalView
            setCurrentView={changeView}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentView === 'about' && (
          <AboutView setCurrentView={changeView} />
        )}
      </main>

      {/* Luxury Editorial Footer */}
      <Footer setCurrentView={changeView} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        setCurrentView={changeView}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
        setCurrentView={changeView}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        setCurrentView={changeView}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={handleClearCart}
      />

      {/* Global Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* AEGIS AI Skincare Guide Chatbot */}
      <AegisAIChatbot
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
        onOpenQuiz={() => changeView('quiz')}
      />
    </div>
  );
}

export default App;
