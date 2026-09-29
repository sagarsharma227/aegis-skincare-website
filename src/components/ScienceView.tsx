import React from 'react';
import { NavView } from '../types';
import { Shield, Droplets, Scissors, Sun, Sparkles, ArrowRight, Dna, CheckCircle2 } from 'lucide-react';
import { AegisMonogram } from './AegisMonogram';
import { motion } from 'motion/react';

interface ScienceViewProps {
  setCurrentView: (view: NavView) => void;
}

export const ScienceView: React.FC<ScienceViewProps> = ({ setCurrentView }) => {
  return (
    <div className="bg-[#F2EFE9] min-h-screen py-12 lg:py-20 text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] text-[#526442] text-[10px] font-mono-spec tracking-[0.2em] uppercase">
            <AegisMonogram size={14} color="#526442" />
            <span>AEGIS RESEARCH ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-editorial font-normal text-[#1A1C1B] leading-tight">
            THE SCIENCE OF <br />
            <span className="italic text-[#526442]">BETTER SKIN.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5E645F] leading-relaxed">
            Skincare should be understandable. Men’s skin has distinctive physiological factors—higher sebum secretion, regular razor friction, and daily sun exposure. Here is why each AEGIS formula exists.
          </p>
        </motion.div>

        
        {/* Core Clinical Pathways */}
        <div className="space-y-6 pt-4 mb-16">
          <h2 className="text-xl sm:text-2xl font-serif-editorial text-[#1A1C1B]">
            Clinical Pathways
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pathway 1: Oil Control */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 shadow-xs flex flex-col gap-4 group hover:border-[#526442] hover:shadow-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-mono-spec text-[#5E645F] uppercase tracking-wider block">CONCERN</span>
                  <strong className="text-sm font-serif-editorial text-[#1A1C1B] block">Oil Imbalance</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A8B5CF]" />
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-mono-spec text-[#5E645F] uppercase tracking-wider block">MECHANISM</span>
                  <strong className="text-sm font-serif-editorial text-[#1A1C1B] block">Excess Sebum</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1 bg-[#F2EFE9] p-3 rounded-[2px]">
                  <span className="text-[9px] font-mono-spec text-[#526442] uppercase tracking-wider block">ACTIVE</span>
                  <strong className="text-xs font-mono-spec text-[#1A1C1B] block">5% Niacinamide + Zinc</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-[#526442]" />
                <div className="flex-1 space-y-1 bg-[#F2EFE9] p-3 rounded-[2px] border-l-2 border-[#526442]">
                  <span className="text-[9px] font-mono-spec text-[#526442] uppercase tracking-wider block">FORMULATION</span>
                  <strong className="text-xs font-mono-spec text-[#1A1C1B] block">AEGIS CLEAR</strong>
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <span className="text-[10px] font-mono-spec bg-[#1A1C1B] text-[#FAF9F7] px-2 py-1 rounded-[2px] font-semibold tracking-wider">
                  ROUTINE: AM / PM
                </span>
              </div>
            </motion.div>

            {/* Pathway 2: Barrier Repair */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 shadow-xs flex flex-col gap-4 group hover:border-[#526442] hover:shadow-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-mono-spec text-[#5E645F] uppercase tracking-wider block">CONCERN</span>
                  <strong className="text-sm font-serif-editorial text-[#1A1C1B] block">Barrier Damage</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A8B5CF]" />
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-mono-spec text-[#5E645F] uppercase tracking-wider block">MECHANISM</span>
                  <strong className="text-sm font-serif-editorial text-[#1A1C1B] block">Lipid Depletion</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1 bg-[#F2EFE9] p-3 rounded-[2px]">
                  <span className="text-[9px] font-mono-spec text-[#526442] uppercase tracking-wider block">ACTIVE</span>
                  <strong className="text-xs font-mono-spec text-[#1A1C1B] block">3:1:1 Ceramides</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-[#526442]" />
                <div className="flex-1 space-y-1 bg-[#F2EFE9] p-3 rounded-[2px] border-l-2 border-[#526442]">
                  <span className="text-[9px] font-mono-spec text-[#526442] uppercase tracking-wider block">FORMULATION</span>
                  <strong className="text-xs font-mono-spec text-[#1A1C1B] block">AEGIS RECOVER</strong>
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <span className="text-[10px] font-mono-spec bg-[#1A1C1B] text-[#FAF9F7] px-2 py-1 rounded-[2px] font-semibold tracking-wider">
                  ROUTINE: PM
                </span>
              </div>
            </motion.div>
            
             {/* Pathway 3: Razor Burn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 shadow-xs flex flex-col gap-4 group hover:border-[#526442] hover:shadow-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-mono-spec text-[#5E645F] uppercase tracking-wider block">CONCERN</span>
                  <strong className="text-sm font-serif-editorial text-[#1A1C1B] block">Razor Irritation</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A8B5CF]" />
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-mono-spec text-[#5E645F] uppercase tracking-wider block">MECHANISM</span>
                  <strong className="text-sm font-serif-editorial text-[#1A1C1B] block">Micro-trauma</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1 bg-[#F2EFE9] p-3 rounded-[2px]">
                  <span className="text-[9px] font-mono-spec text-[#526442] uppercase tracking-wider block">ACTIVE</span>
                  <strong className="text-xs font-mono-spec text-[#1A1C1B] block">Centella + Panthenol</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-[#526442]" />
                <div className="flex-1 space-y-1 bg-[#F2EFE9] p-3 rounded-[2px] border-l-2 border-[#526442]">
                  <span className="text-[9px] font-mono-spec text-[#526442] uppercase tracking-wider block">FORMULATION</span>
                  <strong className="text-xs font-mono-spec text-[#1A1C1B] block">AEGIS CALM</strong>
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <span className="text-[10px] font-mono-spec bg-[#1A1C1B] text-[#FAF9F7] px-2 py-1 rounded-[2px] font-semibold tracking-wider">
                  ROUTINE: POST-SHAVE
                </span>
              </div>
            </motion.div>
            
             {/* Pathway 4: UV Damage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 shadow-xs flex flex-col gap-4 group hover:border-[#526442] hover:shadow-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-mono-spec text-[#5E645F] uppercase tracking-wider block">CONCERN</span>
                  <strong className="text-sm font-serif-editorial text-[#1A1C1B] block">UV Damage</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A8B5CF]" />
                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-mono-spec text-[#5E645F] uppercase tracking-wider block">MECHANISM</span>
                  <strong className="text-sm font-serif-editorial text-[#1A1C1B] block">Photoaging</strong>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1 bg-[#F2EFE9] p-3 rounded-[2px]">
                  <span className="text-[9px] font-mono-spec text-[#526442] uppercase tracking-wider block">ACTIVE</span>
                  <strong className="text-xs font-mono-spec text-[#1A1C1B] block">Organic UV Filters</strong>
                </div>
                <ArrowRight className="w-4 h-4 text-[#526442]" />
                <div className="flex-1 space-y-1 bg-[#F2EFE9] p-3 rounded-[2px] border-l-2 border-[#526442]">
                  <span className="text-[9px] font-mono-spec text-[#526442] uppercase tracking-wider block">FORMULATION</span>
                  <strong className="text-xs font-mono-spec text-[#1A1C1B] block">AEGIS SHIELD SPF 50</strong>
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <span className="text-[10px] font-mono-spec bg-[#1A1C1B] text-[#FAF9F7] px-2 py-1 rounded-[2px] font-semibold tracking-wider">
                  ROUTINE: AM
                </span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* 5 Core Science Modules */}
        <div className="space-y-8">
          {/* 01 The Skin Barrier */}
          <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-10 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[10px] font-mono-spec text-[#526442] font-bold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              <span>01 / THE SKIN BARRIER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-editorial text-[#1A1C1B]">
              The Stratum Corneum & Acid Mantle
            </h2>
            <p className="text-xs sm:text-sm text-[#5E645F] leading-relaxed max-w-3xl">
              Your skin barrier operates like a brick-and-mortar wall: corneocytes (bricks) held together by a multi-lamellar lipid matrix (mortar) composed of ceramides, cholesterol, and fatty acids. When standard alkaline soaps disrupt this barrier, transepidermal water loss surges, triggering dryness and rebound oiliness.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2DDD5]">
              <div className="p-3 bg-[#F2EFE9] rounded-[3px] text-xs font-mono-spec">
                <span className="text-[#526442] font-bold block">PHYSIOLOGICAL pH 5.5</span>
                <span className="text-[#5E645F] text-[11px]">Maintains the protective acid mantle.</span>
              </div>
              <div className="p-3 bg-[#F2EFE9] rounded-[3px] text-xs font-mono-spec">
                <span className="text-[#526442] font-bold block">LIPID BILAYER</span>
                <span className="text-[#5E645F] text-[11px]">Locks in deep cellular hydration.</span>
              </div>
              <div className="p-3 bg-[#F2EFE9] rounded-[3px] text-xs font-mono-spec">
                <span className="text-[#526442] font-bold block">GENTLE SURFACTANTS</span>
                <span className="text-[#5E645F] text-[11px]">Cleanses without protein stripping.</span>
              </div>
            </div>
          </div>

          {/* 02 Sebum & Congestion */}
          <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-10 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[10px] font-mono-spec text-[#526442] font-bold uppercase tracking-widest">
              <Droplets className="w-3.5 h-3.5" />
              <span>02 / SEBUM & CONGESTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-editorial text-[#1A1C1B]">
              Why Lipophilic Salicylic Acid Works Differently
            </h2>
            <p className="text-xs sm:text-sm text-[#5E645F] leading-relaxed max-w-3xl">
              Higher androgen levels in men stimulate greater sebaceous gland activity. When excess sebum mixes with dead surface keratin, it creates follicular plugs (blackheads). Because Salicylic Acid is lipophilic (oil-soluble), it can enter sebum-filled pores to dissolve plugs from within.
            </p>
          </div>

          {/* 03 Shaving & Friction */}
          <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-10 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[10px] font-mono-spec text-[#526442] font-bold uppercase tracking-widest">
              <Scissors className="w-3.5 h-3.5" />
              <span>03 / SHAVING & BLADE FRICTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-editorial text-[#1A1C1B]">
              Post-Shave Recovery & Epidermal Friction
            </h2>
            <p className="text-xs sm:text-sm text-[#5E645F] leading-relaxed max-w-3xl">
              Daily or frequent shaving mechanically removes up to two layers of stratum corneum cells. This micro-trauma causes razor burn, bumpy follicular friction, and localized irritation. AEGIS uses buffered Centella Asiatica and Phytosphingosine to rapidly calm post-shave skin.
            </p>
          </div>

          {/* 04 Daily UV Exposure */}
          <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-10 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-[10px] font-mono-spec text-[#526442] font-bold uppercase tracking-widest">
              <Sun className="w-3.5 h-3.5" />
              <span>04 / DAILY UV EXPOSURE & URBAN POLLUTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-editorial text-[#1A1C1B]">
              Broad-Spectrum Photoprotection Without White Cast
            </h2>
            <p className="text-xs sm:text-sm text-[#5E645F] leading-relaxed max-w-3xl">
              Up to 80% of visible skin aging and dark spots stem from cumulative daily ultraviolet exposure. By utilizing next-generation photostable organic filters in a water-gel matrix, AEGIS SHIELD absorbs completely invisible in stubble, beards, and all skin tones.
            </p>
          </div>

          {/* 05 3:1:1 Ceramide Architecture */}
          <div className="bg-[#1A1C1B] text-[#FAF9F7] border border-[#343A33] rounded-[4px] p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-mono-spec text-[#A9B7B7] font-bold uppercase tracking-widest">
              <Dna className="w-3.5 h-3.5" />
              <span>05 / BIOMIMETIC RATIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-editorial">
              Built Around the Skin Barrier: The 3:1:1 Ceramide Ratio
            </h2>
            <p className="text-xs sm:text-sm text-[#E2DDD5] leading-relaxed max-w-3xl">
              AEGIS barrier formulations utilize a biomimetic lipid approach inspired by the physiological composition of the human stratum corneum:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#282C27] border border-[#3E453D] rounded-[3px] space-y-1">
                <span className="text-xl font-serif-editorial text-[#FAF9F7] block">3 Parts Ceramides</span>
                <p className="text-[11px] text-[#E2DDD5]">Ceramide NP, AP, and EOP replenish the cellular lipid mortar.</p>
              </div>
              <div className="p-4 bg-[#282C27] border border-[#3E453D] rounded-[3px] space-y-1">
                <span className="text-xl font-serif-editorial text-[#FAF9F7] block">1 Part Cholesterol</span>
                <p className="text-[11px] text-[#E2DDD5]">Maintains membrane fluidity and intercellular organization.</p>
              </div>
              <div className="p-4 bg-[#282C27] border border-[#3E453D] rounded-[3px] space-y-1">
                <span className="text-xl font-serif-editorial text-[#FAF9F7] block">1 Part Free Fatty Acids</span>
                <p className="text-[11px] text-[#E2DDD5]">Provides essential elasticity and flexible barrier protection.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-editorial text-2xl text-[#1A1C1B]">Ready to explore the formulas?</h3>
            <p className="text-xs text-[#5E645F]">Browse our complete 100% disclosed catalogue.</p>
          </div>
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-[#526442] hover:bg-[#394536] text-[#FAF9F7] font-mono-spec text-xs font-semibold uppercase tracking-wider rounded-[3px] flex items-center gap-2"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
