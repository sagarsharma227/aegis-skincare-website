import React, { useState } from 'react';
import { Product, NavView } from '../types';
import { PRODUCTS } from '../data/products';
import { useImageStore } from '../hooks/useImageStore';
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
import { motion, AnimatePresence } from 'motion/react';

interface StarterSystemHeroProps {
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  setCurrentView: (view: NavView) => void;
}

// Subcomponent for each of the 3 individual system steps to ensure live custom photo synchronization
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
  onClick: () => void;
}> = ({ item, onClick }) => {
  const { image } = useImageStore(item.product.id, item.product.image);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group/card cursor-pointer bg-[#F2EFE9]/50 hover:bg-[#F2EFE9] border border-[#E2DDD5] hover:border-[#526442] rounded-[3px] p-3 transition-colors duration-300 flex flex-col justify-between text-left shadow-xs hover:shadow-md"
    >
      <div className="aspect-square bg-[#151714] rounded-[2px] overflow-hidden relative mb-2.5">
        <img
          src={image}
          alt={item.product.name}
          className="w-full h-full object-cover grayscale-[0.1] group-hover/card:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#1A1C1B]/90 text-[#FAF9F7] text-[9px] font-mono-spec rounded-[2px]">
          {item.step}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono-spec text-[#526442] font-bold">
          <span>{item.role}</span>
          <span className="text-[#7A8279]">{item.time}</span>
        </div>
        <h4 className="text-xs sm:text-sm font-serif-editorial text-[#1A1C1B] font-medium leading-tight">
          {item.product.name}
        </h4>
        <p className="text-[10px] text-[#5E645F] line-clamp-2">
          {item.benefit}
        </p>
      </div>
    </motion.div>
  );
};

// Subcomponent for single-step spotlight image with live custom photo synchronization
const SynchronizedSingleStepImage: React.FC<{
  product: Product;
  onSelectProduct: (id: string) => void;
}> = ({ product, onSelectProduct }) => {
  const { image } = useImageStore(product.id, product.image);

  return (
    <motion.div
      onClick={() => onSelectProduct(product.id)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="aspect-square sm:aspect-4/5 bg-[#151714] rounded-[3px] overflow-hidden relative cursor-pointer group/spotlight border border-[#E2DDD5] shadow-xs hover:shadow-md transition-shadow"
    >
      <img
        src={image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover/spotlight:scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-3 right-3 text-left">
        <span className="text-[10px] font-mono-spec text-[#E2DDD5] uppercase tracking-widest block">
          CLICK TO VIEW FORMULA
        </span>
        <span className="text-sm font-serif-editorial text-[#FAF9F7]">
          {product.name}
        </span>
      </div>
    </motion.div>
  );
};

export const StarterSystemHero: React.FC<StarterSystemHeroProps> = ({
  onSelectProduct,
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

  // Active highlighted item tab ('all' or '01' | '02' | '03')
  const [activeTab, setActiveTab] = useState<'all' | '01' | '02' | '03'>('all');
  const [activeRoutine, setActiveRoutine] = useState<'am' | 'pm'>('am');
  const [isAdded, setIsAdded] = useState(false);

  const { image: bundleImg } = useImageStore(
    starterBundle.id,
    starterBundle.image
  );

  const handleAddBundle = () => {
    onAddToCart(starterBundle, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const selectedItemData = systemItems.find((i) => i.step === activeTab);

  return (
    <section
      id="hero-starter-system-section"
      className="relative py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#E2DDD5] overflow-hidden text-left"
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
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] text-[#1A1C1B] shadow-xs cursor-default"
            >
              <div className="flex text-[#526442]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="font-semibold">5.0 / 5.0</span>
              <span className="text-[#7A8279]">(528 reviews)</span>
            </motion.div>
            <div className="flex items-center gap-2 text-[#526442] font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#526442] animate-pulse" />
              <span>IN STOCK · 60-DAY SUPPLY · SAVE ₹298</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Interactive Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Product Showcase & Stage (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Step Switcher Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                id="hero-tab-all"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-2 rounded-[3px] text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                  activeTab === 'all'
                    ? 'bg-[#1A1C1B] text-[#FAF9F7] border-[#1A1C1B] shadow-xs'
                    : 'bg-[#FAF9F7] text-[#5E645F] border-[#E2DDD5] hover:border-[#1A1C1B] hover:text-[#1A1C1B]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>ALL 3 FORMULAS</span>
              </button>

              {systemItems.map((item) => (
                <button
                  key={item.step}
                  id={`hero-tab-${item.step}`}
                  onClick={() => setActiveTab(item.step as any)}
                  className={`px-3.5 py-2 rounded-[3px] text-xs font-mono-spec uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                    activeTab === item.step
                      ? 'bg-[#526442] text-[#FAF9F7] border-[#526442] shadow-xs'
                      : 'bg-[#FAF9F7] text-[#5E645F] border-[#E2DDD5] hover:border-[#526442] hover:text-[#1A1C1B]'
                  }`}
                >
                  <span className="font-bold">{item.step}</span>
                  <span>{item.role}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Stage Display with Animation */}
            <div className="relative bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-8 shadow-xs overflow-hidden">
              {/* Floating badges */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD5] text-[11px] font-mono-spec">
                <div className="flex items-center gap-2 text-[#526442] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#526442]" />
                  <span>
                    {activeTab === 'all'
                      ? 'UNIFIED 3-PIECE CLINICAL SUITE'
                      : `STEP ${activeTab} / ${selectedItemData?.role}`}
                  </span>
                </div>
                <span className="text-[#7A8279] tracking-wider uppercase">
                  {activeTab === 'all' ? '60–75 DAY SUPPLY' : selectedItemData?.volume}
                </span>
              </div>

              {/* Central Visual Arena */}
              <AnimatePresence mode="wait">
                {activeTab === 'all' ? (
                  <motion.div
                    key="all-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 pt-4"
                  >
                    {/* Primary Showcase: The Starter System Product Image Shared with Shop Section */}
                    <motion.div
                      onClick={() => onSelectProduct('aegis-starter-bundle')}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="relative aspect-16/9 sm:aspect-21/9 bg-[#151714] rounded-[3px] overflow-hidden border border-[#E2DDD5] group/bundle cursor-pointer shadow-xs hover:shadow-md transition-shadow"
                    >
                      <img
                        src={bundleImg}
                        alt="The Starter System"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/bundle:scale-[1.02]"
                        referrerPolicy="no-referrer"
                      />

                      {/* Bottom Info Bar */}
                      <div 
                        className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none flex items-end justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-mono-spec font-bold tracking-[0.15em] text-[#E2DDD5] uppercase block">
                            THE HERO KIT
                          </span>
                          <span className="text-sm font-serif-editorial text-[#FAF9F7]">
                            {starterBundle.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-spec text-white/80 hidden sm:inline uppercase">
                          Click To View Dossier · ₹1,899 (Save ₹298)
                        </span>
                      </div>
                    </motion.div>

                    {/* Synergistic 3 Formulas Lineup (Synced with Live Images) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono-spec text-[#7A8279] uppercase">
                        <span>The 3 Integrated Formulations</span>
                        <span>Click any step to inspect active specs</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        {systemItems.map((item) => (
                          <SynchronizedStepCard
                            key={item.step}
                            item={item}
                            onClick={() => setActiveTab(item.step as any)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Architectural Trio Highlight Strip */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="p-4 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:border-[#526442]/60 transition-colors"
                    >
                      <div className="space-y-1">
                        <strong className="text-[#1A1C1B] font-mono-spec text-[11px] uppercase tracking-wider block">
                          THE COMPLETE 3-STEP TRIAD
                        </strong>
                        <p className="text-[#5E645F]">
                          WASH (150ml) + REPAIR (50ml) + SHIELD SPF 50 (50ml). All 3 full-size formulas.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onSelectProduct('aegis-starter-bundle')}
                          className="text-xs font-mono-spec text-[#526442] font-bold uppercase tracking-wider hover:underline inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                        >
                          <span>View Full Suite Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`step-${activeTab}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 items-center"
                  >
                    <div className="sm:col-span-5">
                      <SynchronizedSingleStepImage
                        product={selectedItemData!.product}
                        onSelectProduct={onSelectProduct}
                      />
                    </div>

                    <div className="sm:col-span-7 space-y-4 text-left">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono-spec font-bold text-[#526442] uppercase tracking-wider">
                          STEP {selectedItemData!.step} / {selectedItemData!.role} · {selectedItemData!.time}
                        </span>
                        <h3 className="text-2xl font-serif-editorial font-normal text-[#1A1C1B]">
                          {selectedItemData!.product.name}
                        </h3>
                        <p className="text-xs font-mono-spec text-[#7A8279]">
                          {selectedItemData!.product.subtitle} · {selectedItemData!.volume}
                        </p>
                      </div>

                      <div className="space-y-2.5 text-xs text-[#5E645F]">
                        <div className="p-3 bg-[#F2EFE9] rounded-[2px] border border-[#E2DDD5]/60 space-y-1">
                          <strong className="text-[#1A1C1B] font-mono-spec text-[10px] uppercase tracking-wider block">
                            KEY CLINICAL ACTIVE
                          </strong>
                          <p className="text-[#1A1C1B] font-medium">{selectedItemData!.highlight}</p>
                          <p className="text-[#5E645F]">{selectedItemData!.benefit}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-spec">
                          <div className="p-2.5 bg-[#F2EFE9]/60 rounded-[2px]">
                            <span className="block text-[#7A8279] text-[9px] uppercase">TEXTURE & FINISH</span>
                            <span className="text-[#1A1C1B] font-medium truncate block">
                              {selectedItemData!.finish}
                            </span>
                          </div>
                          <div className="p-2.5 bg-[#F2EFE9]/60 rounded-[2px]">
                            <span className="block text-[#7A8279] text-[9px] uppercase">RITUAL TIMING</span>
                            <span className="text-[#1A1C1B] font-medium block">
                              {selectedItemData!.time} Commitment
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProduct(selectedItemData!.product.id)}
                        className="w-full py-2.5 bg-[#526442] hover:bg-[#394536] text-[#FAF9F7] font-mono-spec text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Examine Single Product Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4 Clinical Pillars Micro-Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="p-3 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1 hover:border-[#526442] hover:shadow-xs transition-colors cursor-default"
              >
                <span className="text-[18px] sm:text-[22px] font-mono-spec font-bold text-[#1A1C1B] block leading-none">
                  +94%
                </span>
                <span className="text-[10px] font-mono-spec text-[#5E645F] uppercase block">
                  Moisture Retention
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="p-3 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1 hover:border-[#526442] hover:shadow-xs transition-colors cursor-default"
              >
                <span className="text-[18px] sm:text-[22px] font-mono-spec font-bold text-[#1A1C1B] block leading-none">
                  100%
                </span>
                <span className="text-[10px] font-mono-spec text-[#5E645F] uppercase block">
                  Zero Cast in Stubble
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="p-3 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1 hover:border-[#526442] hover:shadow-xs transition-colors cursor-default"
              >
                <span className="text-[18px] sm:text-[22px] font-mono-spec font-bold text-[#1A1C1B] block leading-none">
                  pH 5.5
                </span>
                <span className="text-[10px] font-mono-spec text-[#5E645F] uppercase block">
                  Acid Mantle Matched
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="p-3 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[3px] space-y-1 hover:border-[#526442] hover:shadow-xs transition-colors cursor-default"
              >
                <span className="text-[18px] sm:text-[22px] font-mono-spec font-bold text-[#1A1C1B] block leading-none">
                  &lt; 3 Min
                </span>
                <span className="text-[10px] font-mono-spec text-[#5E645F] uppercase block">
                  Daily Time Needed
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Routine Timeline + Value Calculator + Direct Purchase (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* AM / PM Interactive Protocol Preview */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-7 space-y-6 shadow-xs hover:border-[#526442]/60 hover:shadow-md transition-all"
            >
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

              {/* Routine Steps List with Animation */}
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
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#526442] space-y-0.5 hover:shadow-xs transition-shadow cursor-default"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          01 / CLEANSE (30s) · AEGIS WASH
                        </strong>
                        <span className="text-[#526442]">pH 5.5</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Lather 1 pump with warm water to dissolve overnight oil without drying the skin.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#526442] space-y-0.5 hover:shadow-xs transition-shadow cursor-default"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          02 / REPAIR (30s) · AEGIS HYDRA
                        </strong>
                        <span className="text-[#526442]">Oil-Free Gel</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Smooth 1 pump over face & neck to rebuild moisture barrier and balance mid-day shine.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#526442] space-y-0.5 hover:shadow-xs transition-shadow cursor-default"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          03 / DEFEND (30s) · AEGIS SHIELD SPF 50
                        </strong>
                        <span className="text-[#526442]">Invisible SPF</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Apply 2 fingers over face and stubble. Zero chalky cast, zero beard residue.
                      </p>
                    </motion.div>
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
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#1A1C1B] space-y-0.5 hover:shadow-xs transition-shadow cursor-default"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          01 / PURIFY (30s) · AEGIS WASH
                        </strong>
                        <span className="text-[#1A1C1B]">Evening Reset</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Dissolves city grime, sweat, and daytime sunscreen completely clean.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="p-3 bg-[#F2EFE9] rounded-[2px] border-l-2 border-[#1A1C1B] space-y-0.5 hover:shadow-xs transition-shadow cursor-default"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono-spec">
                        <strong className="text-[#1A1C1B] uppercase font-bold">
                          02 / REPAIR (30s) · AEGIS HYDRA
                        </strong>
                        <span className="text-[#1A1C1B]">Overnight Moisture</span>
                      </div>
                      <p className="text-[#5E645F]">
                        Apply 1-2 pumps to calm shave friction, rehydrate stratum corneum, and rebuild barrier.
                      </p>
                    </motion.div>

                    <div className="p-3 bg-[#F2EFE9]/60 rounded-[2px] border border-dashed border-[#E2DDD5] text-[#5E645F] text-[11px] font-mono-spec flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#526442] shrink-0" />
                      <span>NO NIGHTTIME SUNSCREEN NEEDED · SYSTEM COMPLETE</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Price & Savings Breakdown */}
              <div className="pt-4 border-t border-[#E2DDD5] space-y-3">
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-mono-spec uppercase text-[#7A8279] block">
                        COMPLETE 3-PIECE SYSTEM
                      </span>
                      <span className="font-serif-editorial text-2xl font-medium text-[#1A1C1B]">
                        ₹1,899
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs line-through text-[#7A8279] font-mono-spec mr-2">
                        ₹2,197
                      </span>
                      <span className="px-2 py-0.5 bg-[#526442] text-[#FAF9F7] text-[10px] font-mono-spec font-bold rounded-[2px]">
                        SAVE ₹298
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#5E645F]">
                    Includes full-size WASH (150ml), HYDRA (50ml), and SHIELD (50ml).
                  </p>
                </div>

                {/* Direct Add To Bag Action */}
                <div className="space-y-2 pt-2">
                  <motion.button
                    id="hero-starter-system-add-btn"
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddBundle}
                    className={`w-full py-4 rounded-[3px] font-mono-spec text-xs uppercase tracking-widest font-bold transition-all shadow-sm flex items-center justify-center gap-2.5 cursor-pointer ${
                      isAdded
                        ? 'bg-[#1A1C1B] text-[#FAF9F7]'
                        : 'bg-[#526442] hover:bg-[#394536] text-[#FAF9F7]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#A9B7B7]" />
                        <span>ADDED SYSTEM TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#F2EFE9]" />
                        <span>ADD STARTER SYSTEM TO BAG — ₹1,899</span>
                      </>
                    )}
                  </motion.button>

                  <button
                    id="hero-starter-system-dossier-btn"
                    onClick={() => onSelectProduct('aegis-starter-bundle')}
                    className="w-full py-2.5 rounded-[3px] bg-transparent hover:bg-[#F2EFE9] text-[#1A1C1B] border border-[#E2DDD5] hover:border-[#1A1C1B] font-mono-spec text-[11px] uppercase tracking-wider font-semibold transition-all text-center block"
                  >
                    VIEW INGREDIENT &amp; CLINICAL DOSSIER
                  </button>
                </div>

                {/* Assurance Guarantee */}
                <div className="pt-2 flex flex-col gap-1.5 text-[10px] font-mono-spec text-[#5E645F]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#526442]" />
                    <span>Free express delivery on all Starter Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#526442]" />
                    <span>60-Day Empty-Bottle Skin Health Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#526442]" />
                    <span>100% Fragrance-Free · Hypoallergenic Tested</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
