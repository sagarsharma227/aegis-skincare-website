import React, { useState, useRef } from 'react';
import { Product, NavView } from '../types';
import { PRODUCTS } from '../data/products';
import { useImageStore } from '../hooks/useImageStore';
import { AegisImage } from './AegisImage';
import {
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Check,
  ShieldCheck,
  Clock,
  Droplets,
  Star,
  CheckCircle2,
  Layers,
  ShoppingBag,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

interface StarterSystemHeroProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  setCurrentView: (view: NavView) => void;
}

// Subcomponent for each of the 3 individual system steps
const SynchronizedStepCard: React.FC<{
  item: {
    step: string;
    role: string;
    product: Product;
    volume: string;
    time: string;
    highlight: string;
    benefit: string;
    finish: string;
  };
  onAddToCart: (product: Product, quantity?: number) => void;
}> = ({ item, onAddToCart }) => {
  const { image } = useImageStore(item.product.id, item.product.image);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] p-3.5 flex flex-col justify-between text-left shadow-xs transition-colors duration-300 hover:border-[#526442]/70 hover:shadow-md group/card select-none"
    >
      <div>
        <div className="aspect-square bg-[#EAE5DD] rounded-[2px] overflow-hidden relative mb-3 border border-[#E2DDD5]/60 group-hover/card:border-[#526442]/40 transition-colors duration-300">
          <AegisImage
            src={image}
            alt={item.product.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
            fallbackSrc={`/${item.product.id}.jpg`}
          />
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#1A1C1B]/90 text-[#FAF9F7] text-[9px] font-mono-spec font-bold rounded-[2px] z-20">
            STEP {item.step}
          </div>
        </div>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between text-[10px] font-mono-spec text-[#526442] font-bold">
            <span>{item.role}</span>
            <span className="text-[#5E645F]">{item.time}</span>
          </div>
          <h4 className="text-xs sm:text-sm font-serif-editorial text-[#1A1C1B] font-medium leading-tight group-hover/card:text-[#526442] transition-colors">
            {item.product.name}
          </h4>
          <p className="text-[10px] font-mono-spec text-[#5E645F] line-clamp-1">
            {item.highlight}
          </p>
          <p className="text-[10.5px] text-[#5E645F] line-clamp-2 leading-relaxed">
            {item.benefit}
          </p>
        </div>
      </div>

      <button
        onClick={() => onAddToCart(item.product, 1)}
        className="w-full mt-2 py-1.5 px-2 bg-[#F2EFE9] hover:bg-[#526442] text-[#1A1C1B] hover:text-[#FAF9F7] border border-[#E2DDD5] hover:border-[#526442] text-[10px] font-mono-spec uppercase font-bold tracking-wider rounded-[2px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <ShoppingBag className="w-3 h-3" />
        <span>Add · ₹{item.product.price.toLocaleString('en-IN')}</span>
      </button>
    </motion.div>
  );
};

export const StarterSystemHero: React.FC<StarterSystemHeroProps> = ({
  onAddToCart,
  setCurrentView
}) => {
  const starterBundle = PRODUCTS.find((p) => p.id === 'aegis-starter-bundle') || PRODUCTS[0];
  const washProduct = PRODUCTS.find((p) => p.id === 'aegis-wash') || PRODUCTS[0];
  const hydraProduct = PRODUCTS.find((p) => p.id === 'aegis-hydra') || PRODUCTS[1];
  const shieldProduct = PRODUCTS.find((p) => p.id === 'aegis-shield') || PRODUCTS[2];

  const systemItems = [
    {
      step: '01',
      role: 'CLEANSE',
      product: washProduct,
      volume: '150 ml',
      time: '30s',
      highlight: '15% Apple Amino Acids + 0.5% BHA',
      benefit: 'Preserves pH 5.5 barrier without post-wash tightness',
      finish: 'Clean, supple, non-stripping'
    },
    {
      step: '02',
      role: 'REPAIR',
      product: hydraProduct,
      volume: '50 ml',
      time: '30s',
      highlight: '2% Hyaluronic + 3% Niacinamide',
      benefit: 'Weightless oil-free hydration with mid-day oil balance',
      finish: 'Instant cooling burst, zero residue'
    },
    {
      step: '03',
      role: 'DEFEND',
      product: shieldProduct,
      volume: '50 ml',
      time: '30s',
      highlight: 'SPF 50+ PA++++ + 1% Ectoin',
      benefit: '100% invisible photoprotection even in thick beard stubble',
      finish: 'Natural matte, zero white cast'
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [activeRoutine, setActiveRoutine] = useState<'am' | 'pm'>('am');
  const [isAdded, setIsAdded] = useState(false);

  // Subtle Y-axis parallax for Starter System Hero image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const bannerParallaxY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const { image: storedBundleImg } = useImageStore(
    starterBundle.id,
    starterBundle.image
  );
  const bundleImg = storedBundleImg || '/aegis-starter-bundle.jpg';

  const handleAddBundle = () => {
    onAddToCart(starterBundle, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="hero-starter-system-section"
      className="relative py-20 lg:py-28 bg-[#F2EFE9] border-b border-[#E2DDD5] overflow-hidden text-left"
    >
      {/* Background architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E2DDD5]">
          <div className="space-y-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] text-[#526442] text-[10px] font-mono-spec tracking-[0.2em] uppercase font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#526442]" />
              <span>THE ESSENTIALS · THE STARTER SYSTEM</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif-editorial font-normal text-[#1A1C1B] leading-[1.1] tracking-tight"
            >
              The Starter System.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-[#5E645F] leading-relaxed max-w-2xl"
            >
              Three synergistic formulations. Under 3 minutes daily. Zero confusion. Engineered as the
              definitive hero kit for men’s skin — balancing sebum, accelerating post-shave barrier
              recovery, and delivering 100% transparent SPF 50 photoprotection.
            </motion.p>
          </div>

          {/* Quick Credibility Specs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 text-[11px] font-mono-spec"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] text-[#1A1C1B] shadow-xs cursor-default">
              <div className="flex text-[#526442]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="font-semibold">5.0 / 5.0</span>
              <span className="text-[#5E645F]">(528 reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-[#526442] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#526442] animate-pulse" />
              <span>IN STOCK · 60-DAY SUPPLY · SAVE ₹298</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Interactive Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Unified 3-Piece Clinical Suite Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dynamic Stage Display */}
            <div className="relative bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-8 shadow-xs overflow-hidden">
              {/* Top Banner Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD5] text-[11px] font-mono-spec">
                <div className="flex items-center gap-2 text-[#526442] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#526442]" />
                  <span>UNIFIED 3-PIECE CLINICAL SUITE</span>
                </div>
                <span className="text-[#5E645F] tracking-wider uppercase font-semibold">
                  60–75 DAY SUPPLY
                </span>
              </div>

              {/* Central Visual Showcase */}
              <div className="space-y-6 pt-5">
                {/* Primary Showcase Banner */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-16/9 sm:aspect-21/9 bg-[#EAE5DD] rounded-[3px] overflow-hidden border border-[#E2DDD5] shadow-xs group/bundle hover:border-[#526442]/60 transition-colors"
                >
                  <motion.div style={{ y: bannerParallaxY }} className="w-full h-full">
                    <AegisImage
                      src={bundleImg}
                      alt="The Starter System"
                      priority={true}
                      containerClassName="w-full h-full"
                      className="scale-105 object-cover transition-transform duration-700 ease-out group-hover/bundle:scale-110"
                      fallbackSrc="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80"
                    >
                      {/* Bottom Info Bar */}
                      <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none flex items-end justify-between z-20">
                        <div>
                          <span className="text-[10px] font-mono-spec font-bold tracking-[0.15em] text-[#E2DDD5] uppercase block">
                            THE HERO KIT
                          </span>
                          <span className="text-sm font-serif-editorial text-[#FAF9F7]">
                            {starterBundle.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-spec text-white/90 hidden sm:inline uppercase">
                          Complete 3-Step Protocol · ₹1,899 (Save ₹298)
                        </span>
                      </div>
                    </AegisImage>
                  </motion.div>
                </motion.div>

                {/* Synergistic 3 Formulations Lineup */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-mono-spec text-[#5E645F] uppercase">
                    <span className="font-semibold">The 3 Synergistic Formulations</span>
                    <span>Complete Daily Protocol</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                    {systemItems.map((item) => (
                      <SynchronizedStepCard
                        key={item.step}
                        item={item}
                        onAddToCart={onAddToCart}
                      />
                    ))}
                  </div>
                </div>

                {/* Architectural Trio Highlight Strip */}
                <div className="p-4 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-0.5">
                    <strong className="text-[#1A1C1B] font-mono-spec text-[11px] uppercase tracking-wider block">
                      THE COMPLETE 3-STEP TRIAD
                    </strong>
                    <p className="text-[#5E645F] text-[11.5px]">
                      WASH (150ml) + REPAIR (50ml) + SHIELD SPF 50 (50ml). Full-size clinical formulas.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentView('science');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-mono-spec text-[#526442] font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>View Clinical Science</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Clinical Pillars Micro-Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1">
                <span className="text-[18px] sm:text-[22px] font-mono-spec font-bold text-[#1A1C1B] block leading-none">
                  +94%
                </span>
                <span className="text-[10px] font-mono-spec text-[#5E645F] uppercase block">
                  Moisture Retention
                </span>
              </div>
              <div className="p-3 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1">
                <span className="text-[18px] sm:text-[22px] font-mono-spec font-bold text-[#1A1C1B] block leading-none">
                  100%
                </span>
                <span className="text-[10px] font-mono-spec text-[#5E645F] uppercase block">
                  Zero Cast in Stubble
                </span>
              </div>
              <div className="p-3 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1">
                <span className="text-[18px] sm:text-[22px] font-mono-spec font-bold text-[#1A1C1B] block leading-none">
                  pH 5.5
                </span>
                <span className="text-[10px] font-mono-spec text-[#5E645F] uppercase block">
                  Acid Mantle Matched
                </span>
              </div>
              <div className="p-3 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1">
                <span className="text-[18px] sm:text-[22px] font-mono-spec font-bold text-[#1A1C1B] block leading-none">
                  &lt; 3 Min
                </span>
                <span className="text-[10px] font-mono-spec text-[#5E645F] uppercase block">
                  Daily Time Needed
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Routine Timeline + Value Calculator + Direct Purchase (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* AM / PM Interactive Protocol Preview */}
            <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-7 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD5]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#526442]" />
                  <h3 className="font-serif-editorial text-lg text-[#1A1C1B]">
                    How The System Operates
                  </h3>
                </div>

                {/* Day / Night Toggle */}
                <div className="flex items-center gap-1 bg-[#F2EFE9] p-1 rounded-[3px]">
                  <button
                    id="hero-routine-am-btn"
                    onClick={() => setActiveRoutine('am')}
                    className={`px-2.5 py-1 text-[10px] font-mono-spec uppercase rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeRoutine === 'am'
                        ? 'bg-[#FAF9F7] text-[#526442] font-bold shadow-xs'
                        : 'text-[#5E645F] hover:text-[#1A1C1B]'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>AM (90s)</span>
                  </button>
                  <button
                    id="hero-routine-pm-btn"
                    onClick={() => setActiveRoutine('pm')}
                    className={`px-2.5 py-1 text-[10px] font-mono-spec uppercase rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeRoutine === 'pm'
                        ? 'bg-[#1A1C1B] text-[#FAF9F7] font-bold shadow-xs'
                        : 'text-[#5E645F] hover:text-[#1A1C1B]'
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span>PM (60s)</span>
                  </button>
                </div>
              </div>

              {/* Routine Steps List */}
              <AnimatePresence mode="wait">
                {activeRoutine === 'am' ? (
                  <motion.div
                    key="am-flow"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 text-xs"
                  >
                    <div className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#526442] space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          01 / CLEANSE (30s) · AEGIS WASH
                        </strong>
                        <span className="text-[#526442]">pH 5.5</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Lather 1 pump with warm water to dissolve overnight oil without drying the skin.
                      </p>
                    </div>

                    <div className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#526442] space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          02 / REPAIR (30s) · AEGIS HYDRA
                        </strong>
                        <span className="text-[#526442]">Oil-Free Gel</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Smooth 2 pumps over damp face and neck to bind hydration and soothe razor friction.
                      </p>
                    </div>

                    <div className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#526442] space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          03 / DEFEND (30s) · AEGIS SHIELD
                        </strong>
                        <span className="text-[#526442]">SPF 50+ PA++++</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Apply evenly. Zero white cast, zero sheen, zero residue in facial stubble.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pm-flow"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 text-xs"
                  >
                    <div className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#526442] space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          01 / PURIFY &amp; UNCLOG (30s) · AEGIS WASH
                        </strong>
                        <span className="text-[#526442]">Deep Grime Removal</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Cleanses urban particulate matter, sweat, and pollution accumulated through the day.
                      </p>
                    </div>

                    <div className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#526442] space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          02 / REPAIR OVERNIGHT (30s) · AEGIS HYDRA
                        </strong>
                        <span className="text-[#526442]">3% Niacinamide</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Double layer before sleep to restore the intercellular lipid matrix and calm irritation.
                      </p>
                    </div>

                    <div className="p-3 bg-[#FAF9F7] rounded-[2px] border border-dashed border-[#E2DDD5] text-center py-2 text-[#5E645F] text-[11px] font-mono-spec">
                      <span>(SPF not required at night)</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Value & Bundle Purchasing Engine */}
            <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-7 space-y-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-spec uppercase tracking-wider text-[#526442] font-bold">
                    SYSTEM FORMULATION SAVINGS
                  </span>
                  <span className="text-[11px] font-mono-spec text-[#526442] font-semibold">
                    14% SAVINGS BUNDLED
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono-spec border-y border-[#E2DDD5] py-3.5">
                  <div className="flex justify-between text-[#5E645F]">
                    <span>01. AEGIS WASH (150ml)</span>
                    <span>₹599</span>
                  </div>
                  <div className="flex justify-between text-[#5E645F]">
                    <span>02. AEGIS HYDRA (50ml)</span>
                    <span>₹799</span>
                  </div>
                  <div className="flex justify-between text-[#5E645F]">
                    <span>03. AEGIS SHIELD SPF 50 (50ml)</span>
                    <span>₹799</span>
                  </div>
                  <div className="flex justify-between text-[#526442] font-bold pt-1 border-t border-[#E2DDD5]">
                    <span>Routine Synergy Discount</span>
                    <span>- ₹298</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl sm:text-3xl font-serif-editorial text-[#1A1C1B] font-semibold">
                      ₹1,899
                    </span>
                    <span className="text-[10px] font-mono-spec text-[#5E645F] block">
                      ALL TAXES INCLUDED · FREE EXPRESS DELIVERY
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-[#5E645F] font-mono-spec mr-2">
                      ₹2,197
                    </span>
                    <span className="px-2 py-0.5 bg-[#526442] text-[#FAF9F7] text-[10px] font-mono-spec font-bold rounded-[2px]">
                      SAVE ₹298
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  id="hero-starter-system-buy-btn"
                  onClick={handleAddBundle}
                  className={`w-full py-4 rounded-[3px] font-mono-spec text-xs uppercase tracking-widest font-bold transition-all shadow-sm flex items-center justify-center gap-2.5 cursor-pointer ${
                    isAdded
                      ? 'bg-[#1A1C1B] text-[#FAF9F7]'
                      : 'bg-[#526442] hover:bg-[#3E453D] text-[#FAF9F7]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#8C9B86]" />
                      <span>ADDED SYSTEM TO BAG</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD THE COMPLETE STARTER SYSTEM · ₹1,899</span>
                    </>
                  )}
                </button>

                <button
                  id="hero-starter-system-dossier-btn"
                  onClick={() => {
                    setCurrentView('science');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-[3px] bg-transparent hover:bg-[#F2EFE9] text-[#1A1C1B] border border-[#E2DDD5] hover:border-[#1A1C1B] font-mono-spec text-[11px] uppercase tracking-wider font-semibold transition-all text-center block cursor-pointer"
                >
                  VIEW CLINICAL SCIENCE &amp; PROTOCOL &rarr;
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-spec text-[#5E645F] pt-2 border-t border-[#E2DDD5]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#526442]" />
                  <span>Dermatologist Approved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#526442]" />
                  <span>Fragrance &amp; Alcohol Free</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#526442]" />
                  <span>60-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#526442]" />
                  <span>Free Pan-India Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
