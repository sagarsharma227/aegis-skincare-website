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
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AegisAIChatbot } from './components/AegisAIChatbot';
import { Sparkles, ArrowRight, Sun, Moon, Clock, Copy, Check } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

export function App() {
  // Scroll progress for home page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Sync memory images to github (runs once on load)
  useEffect(() => {
    const syncImages = async () => {
      try {
        const images: { id: string, dataUrl: string }[] = [];
        
        // Scan localStorage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('custom_image_')) {
            const dataUrl = localStorage.getItem(key);
            if (dataUrl && dataUrl.startsWith('data:image')) {
              const id = key.replace('custom_image_', '').replace(/^aegis_/, 'aegis-').replace(/_/, '-');
              images.push({ id, dataUrl });
            }
          }
        }
        
        // Scan sessionStorage
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && key.startsWith('custom_image_')) {
            const dataUrl = sessionStorage.getItem(key);
            if (dataUrl && dataUrl.startsWith('data:image')) {
              const id = key.replace('custom_image_', '').replace(/^aegis_/, 'aegis-').replace(/_/, '-');
              if (!images.some(img => img.id === id)) {
                images.push({ id, dataUrl });
              }
            }
          }
        }

        if (images.length > 0) {
          console.log(`Syncing ${images.length} memory images to server...`);
          const res = await fetch('/api/sync-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images })
          });
          const result = await res.json();
          console.log('Sync result:', result);
        }
      } catch (err) {
        console.error('Failed to sync memory images:', err);
      }
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
    <div className="min-h-screen bg-[#F2EFE9] text-[#1A1C1B] font-sans antialiased flex flex-col justify-between selection:bg-[#526442] selection:text-[#FAF9F7]">
      {/* Thin, Subtle Home Page Scroll Progress Bar */}
      {currentView === 'home' && (
        <div
          id="home-scroll-progress-container"
          className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-[#E2DDD5]/20"
          aria-hidden="true"
        >
          <motion.div
            id="home-scroll-progress-bar"
            style={{ scaleX }}
            className="h-full bg-[#526442] origin-left shadow-[0_0_8px_rgba(82,100,66,0.35)]"
          />
        </div>
      )}

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
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />

            {/* Deep Charcoal Brand Philosophy */}
            <BrandPhilosophy />
            
            {/* The Essentials: Starter System */}
            <StarterSystemHero
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              setCurrentView={changeView}
            />

            {/* Diagnostic Skin Quiz Section */}
            <RoutineQuiz
              onAddToCart={handleAddToCart}
              onAddMultipleToCart={handleAddMultipleToCart}
              onSelectProduct={handleSelectProduct}
              onShowToast={showToast}
              isEmbedded={true}
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
          onAddToCart={handleAddToCart}
          onAddMultipleToCart={handleAddMultipleToCart}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={handleSelectProduct}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onShowToast={showToast}
        />
      )}

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
