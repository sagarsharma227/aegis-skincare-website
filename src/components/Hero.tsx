import React, { useState, useRef } from 'react';
import { NavView, Product } from '../types';
import { HeroCanvas } from './HeroCanvas';
import { ArrowRight, Sparkles, ShieldCheck, Star, Check, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useImageStore } from '../hooks/useImageStore';
import { AegisImage } from './AegisImage';

interface HeroProps {
  setCurrentView: (view: NavView) => void;
  onSelectProduct?: (productId: string) => void;
  onAddToCart?: (product: Product, quantity?: number) => void;
}

const showcaseContainerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.09,
      delayChildren: 0.12
    }
  }
};

const showcaseItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const Hero: React.FC<HeroProps> = ({ setCurrentView, onSelectProduct, onAddToCart }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const afterProduct = PRODUCTS.find((p) => p.id === 'aegis-after') || PRODUCTS.find((p) => p.name.includes('AFTER')) || PRODUCTS[0];
  const [isAdded, setIsAdded] = useState(false);

  // Parallax scroll effect for hero depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  const displayedProduct = afterProduct;
  const { image: storedHeroImage } = useImageStore(displayedProduct.id, displayedProduct.image);
  const heroImage = storedHeroImage || '/aegis-after.jpg';

  const handleQuickAdd = () => {
    if (onAddToCart) {
      onAddToCart(displayedProduct, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2400);
    }
  };

  return (
    <section ref={sectionRef} id="aegis-hero" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[#E2DDD5]">
      {/* Background Interactive WebGL/Canvas Particle Mesh */}
      <HeroCanvas />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Clinical Philosophy & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Subtle Clinical Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] text-[11px] font-mono-spec tracking-[0.2em] uppercase text-[#526442]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#526442] animate-pulse" />
              <span>PHYSIOLOGICAL PRECISION DERMATOLOGY FOR MEN</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1A1C1B] font-normal leading-[1.08] tracking-tight"
              >
                Your skin isn't complicated. <br className="hidden sm:inline" />
                <span className="italic text-[#526442]">Your skincare shouldn't be.</span>
              </motion.h1>
              <p className="font-sans text-base sm:text-lg text-[#5E645F] max-w-2xl font-light leading-relaxed">
                Science-backed formulas designed around your skin, your concerns, and your everyday routine.
              </p>
            </div>

            {/* Core Proof Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="p-3.5 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1 hover:border-[#526442] hover:shadow-xs transition-colors"
              >
                <span className="text-[10px] font-mono-spec text-[#526442] uppercase tracking-wider block font-bold">
                  ABSORPTION
                </span>
                <p className="text-xs text-[#1A1C1B] font-serif-editorial font-medium">
                  Rapid Penetration
                </p>
                <p className="text-[11px] text-[#5E645F] leading-tight">
                  No greasy film or heavy beard residue.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="p-3.5 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1 hover:border-[#526442] hover:shadow-xs transition-colors"
              >
                <span className="text-[10px] font-mono-spec text-[#526442] uppercase tracking-wider block font-bold">
                  TRANSPARENCY
                </span>
                <p className="text-xs text-[#1A1C1B] font-serif-editorial font-medium">
                  100% INCI Disclosure
                </p>
                <p className="text-[11px] text-[#5E645F] leading-tight">
                  Exact percentage disclosures on every carton.
                </p>
              </motion.div>
            </div>

            {/* Primary Calls to Action */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              
              <button
                id="hero-quiz-cta"
                onClick={() => {
                  setCurrentView('quiz');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-[4px] bg-[#1A1C1B] hover:bg-[#3E453D] text-[#FAF9F7] font-mono-spec text-xs uppercase tracking-widest font-semibold transition-all shadow-sm flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>TAKE THE 60-SECOND SKIN ASSESSMENT</span>
              </button>
              <button
                id="hero-shop-all-cta"
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-[4px] bg-transparent hover:bg-[#F2EFE9] text-[#1A1C1B] border border-[#E2DDD5] hover:border-[#1A1C1B] font-mono-spec text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SHOP PRODUCTS &rarr;</span>
              </button>

            </motion.div>
          </motion.div>

          {/* Right Campaign Interactive Hero Formulation Spotlight - AEGIS AFTER with Staggered Viewport Entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={showcaseContainerVariants}
            className="lg:col-span-5"
          >
            <div className="relative group">
              {/* Architectural Surface Frame */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-7 space-y-4 shadow-sm hover:shadow-md hover:border-[#526442]/60 transition-colors"
              >
                
                {/* Header with Star Rating and Inventory Context Badge */}
                <motion.div variants={showcaseItemVariants} className="flex items-center justify-between text-[11px] font-mono-spec pb-3 border-b border-[#E2DDD5]">
                  <div className="flex items-center gap-1.5 text-[#526442] font-bold tracking-wider uppercase">
                    <Star className="w-3.5 h-3.5 fill-[#526442]" />
                    <span>5.0 (312 CLINICAL REVIEWS)</span>
                  </div>
                  
                  {/* Subtle Inventory Context Badge */}
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#EFE9DF] text-[#7A5826] border border-[#D5C7B2] text-[9.5px] font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A87B32] animate-pulse" />
                      Hero Formula
                    </span>
                  </div>
                </motion.div>

                {/* Product Image Area with Subtle Parallax Effect */}
                <motion.div 
                  variants={showcaseItemVariants}
                  id="hero-featured-product"
                  className="aspect-4/3 bg-[#EAE5DD] rounded-[3px] overflow-hidden flex items-center justify-center border border-[#E2DDD5] relative group/img"
                >
                  <AegisImage
                    src={heroImage}
                    alt={displayedProduct.name}
                    priority={true}
                    containerClassName="w-full h-full"
                    className="scale-105"
                    fallbackSrc="https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80"
                  />
                </motion.div>

                {/* Product Copy and Pricing */}
                <motion.div variants={showcaseItemVariants} className="space-y-1.5 text-left">
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono-spec uppercase text-[#526442] font-bold block tracking-wider">
                        POST-SHAVE SOOTHING & RAZOR HEAT RELIEF
                      </span>
                      <h3 className="font-serif-editorial text-xl font-medium text-[#1A1C1B]">
                        {displayedProduct.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1.5">
                        {displayedProduct.originalPrice && (
                          <span className="text-xs font-mono-spec text-[#7A8279] line-through">
                            ₹{displayedProduct.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="font-mono-spec font-bold text-[#1A1C1B] text-base">
                          ₹{displayedProduct.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono-spec text-[#526442] font-bold block">
                        −92% RAZOR BURN IN 60 SEC
                      </span>
                    </div>
                  </div>

                  <div className="text-[10.5px] font-mono-spec text-[#526442] font-medium bg-[#F2EFE9]/60 px-2 py-1 rounded-[2px]">
                    Actives: 1.0% Bisabolol · 3.0% Panthenol · Centella · Allantoin
                  </div>
                  
                  <p className="text-xs text-[#5E645F] leading-relaxed line-clamp-2">
                    100% alcohol-free soothing serum that instantly extinguishes razor burn, seals microscopic nicks, and eliminates post-shave redness with zero sting.
                  </p>
                </motion.div>

                {/* Single Add to Bag Action Button */}
                <motion.div variants={showcaseItemVariants} className="pt-1">
                  <motion.button 
                    id="hero-quick-add-btn"
                    whileTap={{ scale: 0.98 }}
                    onClick={handleQuickAdd}
                    className={`w-full py-3.5 rounded-[3px] font-mono-spec text-xs uppercase tracking-wider font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                      isAdded 
                        ? 'bg-[#1A1C1B] text-[#FAF9F7]' 
                        : 'bg-[#526442] hover:bg-[#3E453D] text-[#FAF9F7]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#8C9B86]" />
                        <span>ADDED {displayedProduct.name} TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#F2EFE9]" />
                        <span>ADD TO BAG · ₹{displayedProduct.price.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Floating Architectural Badge */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-2 bg-[#1A1C1B] text-[#FAF9F7] px-3.5 py-1.5 rounded-[2px] text-[10px] font-mono-spec shadow-md border border-[#3E453D]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C9B86]" />
                <span>CLINICAL EFFICACY · DERMATOLOGIST FORMULATED</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
