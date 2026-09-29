import React, { useState } from 'react';
import { NavView, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { RoutineBuilder } from './RoutineBuilder';
import { Clock, Sun, Moon, ArrowRight, CheckCircle2, Sparkles, Layers, Copy, Check } from 'lucide-react';
import { AegisMonogram } from './AegisMonogram';
import { motion } from 'motion/react';
import { CleanseIcon, CorrectIcon, DefendIcon, PurifyIcon, RepairIcon } from './RoutineStepIcons';

interface RoutinesViewProps {
  setCurrentView: (view: NavView) => void;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onAddMultipleToCart: (products: Product[]) => void;
}

export const RoutinesView: React.FC<RoutinesViewProps> = ({
  setCurrentView,
  onSelectProduct,
  onAddToCart,
  onAddMultipleToCart
}) => {
  const [profileType, setProfileType] = useState<'oily' | 'sensitive' | 'balanced'>('oily');
  const [copiedType, setCopiedType] = useState<'am' | 'pm' | 'all' | null>(null);
  const starterKit = PRODUCTS.find((p) => p.id === 'aegis-starter-bundle') || PRODUCTS[0];

  const copyRoutineText = (type: 'am' | 'pm' | 'all') => {
    let text = '';
    const step2AM = profileType === 'sensitive' ? 'AEGIS REPAIR' : 'AEGIS CLEAR SERUM';
    const step2AMDesc = profileType === 'sensitive' 
      ? 'Apply 1 pump of AEGIS REPAIR barrier serum to calm shaving irritation and rebuild lost lipids.'
      : 'Apply 2-3 drops of 2% BHA + 5% Niacinamide across forehead and nose to control shine and keep pores clear.';
    
    const step2PM = profileType === 'sensitive' ? 'AEGIS RECOVER CREAM' : 'AEGIS CLEAR + HYDRA';
    const step2PMDesc = profileType === 'sensitive'
      ? 'Dime-sized amount of overnight recovery cream to accelerate barrier recovery from daily razor passes.'
      : 'Apply 3 drops of BHA serum to clear pore canals, followed by 1 pump of AEGIS HYDRA to replenish hydration.';

    if (type === 'am') {
      text = `AEGIS MEN — MORNING PROTOCOL (AM) [~90 SECONDS]
Skin Profile: ${profileType.toUpperCase()}
• 01 / CLEANSE (30s): AEGIS WASH — Lather 1 pump with water. Maintains pH 5.5 barrier.
• 02 / CORRECT (30s): ${step2AM} — ${step2AMDesc}
• 03 / DEFEND (30s): AEGIS SHIELD SPF 50 — Apply 2 finger lengths. 100% invisible photoprotection.`;
    } else if (type === 'pm') {
      text = `AEGIS MEN — EVENING PROTOCOL (PM) [~60 SECONDS]
Skin Profile: ${profileType.toUpperCase()}
• 01 / PURIFY (30s): AEGIS WASH — Dissolves daytime particulate pollution, sunscreen, and oxidized oils.
• 02 / TREAT & REBUILD (30s): ${step2PM} — ${step2PMDesc}`;
    } else {
      text = `AEGIS MEN — COMPLETE 3-MINUTE DAILY PROTOCOL
Skin Profile: ${profileType.toUpperCase()}

MORNING PROTOCOL (AM) [~90s]:
• 01 / CLEANSE (30s): AEGIS WASH
• 02 / CORRECT (30s): ${step2AM}
• 03 / DEFEND (30s): AEGIS SHIELD SPF 50

EVENING PROTOCOL (PM) [~60s]:
• 01 / PURIFY (30s): AEGIS WASH
• 02 / TREAT & REBUILD (30s): ${step2PM}`;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    });
  };

  return (
    <div className="bg-[#F2EFE9] min-h-screen py-12 lg:py-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] text-[#526442] text-[10px] font-mono-spec tracking-[0.2em] uppercase font-semibold">
            <AegisMonogram size={14} color="#526442" />
            <span>THE 3-MINUTE COMMITMENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-editorial font-normal text-[#1A1C1B] leading-tight">
            Your routine, <br />
            <span className="italic text-[#526442]">simplified.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5E645F] leading-relaxed">
            Effective skincare should not require a 10-step chore. By targeting the exact biological steps—Cleanse, Correct, and Defend—AEGIS fits into any morning and evening schedule in under three minutes.
          </p>
        </motion.div>

        {/* Skin Profile Toggle */}
        <div className="bg-[#F2EFE9] border border-[#E2DDD5] rounded-[4px] p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono-spec text-[#5E645F] uppercase font-bold">
              EXPLORE ROUTINE FOR YOUR SKIN PROFILE:
            </span>
            <div className="flex gap-2">
              <button
                id="routine-tab-oily"
                onClick={() => setProfileType('oily')}
                className={`px-3.5 py-1.5 rounded-[3px] text-xs font-mono-spec uppercase transition-all ${
                  profileType === 'oily'
                    ? 'bg-[#526442] text-[#FAF9F7] font-bold shadow-xs'
                    : 'bg-[#FAF9F7] text-[#1A1C1B] border border-[#E2DDD5]'
                }`}
              >
                Oily & Congested
              </button>
              <button
                id="routine-tab-sensitive"
                onClick={() => setProfileType('sensitive')}
                className={`px-3.5 py-1.5 rounded-[3px] text-xs font-mono-spec uppercase transition-all ${
                  profileType === 'sensitive'
                    ? 'bg-[#526442] text-[#FAF9F7] font-bold shadow-xs'
                    : 'bg-[#FAF9F7] text-[#1A1C1B] border border-[#E2DDD5]'
                }`}
              >
                Post-Shave & Dry
              </button>
              <button
                id="routine-tab-balanced"
                onClick={() => setProfileType('balanced')}
                className={`px-3.5 py-1.5 rounded-[3px] text-xs font-mono-spec uppercase transition-all ${
                  profileType === 'balanced'
                    ? 'bg-[#526442] text-[#FAF9F7] font-bold shadow-xs'
                    : 'bg-[#FAF9F7] text-[#1A1C1B] border border-[#E2DDD5]'
                }`}
              >
                Daily Maintenance
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column AM / PM Protocol */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AM Routine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-8 space-y-6 shadow-xs hover:shadow-lg transition-colors hover:border-[#526442]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD5]">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#526442]" />
                <h3 className="font-serif-editorial text-xl font-medium text-[#1A1C1B]">
                  Morning Protocol (AM)
                </h3>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono-spec text-[#5E645F] hidden sm:inline">~90 SECONDS</span>
                <button
                  id="copy-am-routine-btn"
                  onClick={() => copyRoutineText('am')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-spec rounded-[3px] border border-[#E2DDD5] bg-[#F2EFE9] hover:bg-[#FAF9F7] text-[#1A1C1B] hover:border-[#526442] hover:text-[#526442] transition-all cursor-pointer select-none"
                  title="Copy Morning Protocol to clipboard"
                >
                  {copiedType === 'am' ? (
                    <>
                      <Check className="w-3 h-3 text-[#526442]" />
                      <span className="text-[#526442] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#5E645F]" />
                      <span>COPY ROUTINE</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Step 1: Cleanse */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] space-y-1.5 hover:border-[#526442]/60 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono-spec">
                  <div className="flex items-center gap-2">
                    <CleanseIcon size={16} color="#526442" />
                    <span className="font-bold text-[#526442] uppercase">01 / CLEANSE (30s)</span>
                  </div>
                  <span className="text-[#1A1C1B] font-semibold">AEGIS WASH</span>
                </div>
                <p className="text-xs text-[#5E645F] pl-6">
                  Lather 1 pump with water. Gently washes away sleep perspiration and sebum while maintaining your skin mantle at pH 5.5.
                </p>
              </motion.div>

              {/* Step 2: Correct */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] space-y-1.5 hover:border-[#526442]/60 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono-spec">
                  <div className="flex items-center gap-2">
                    <CorrectIcon size={16} color="#526442" />
                    <span className="font-bold text-[#526442] uppercase">02 / CORRECT (30s)</span>
                  </div>
                  <span className="text-[#1A1C1B] font-semibold">
                    {profileType === 'sensitive' ? 'AEGIS REPAIR' : 'AEGIS CLEAR SERUM'}
                  </span>
                </div>
                <p className="text-xs text-[#5E645F] pl-6">
                  {profileType === 'sensitive'
                    ? 'Apply 1 pump of AEGIS REPAIR barrier serum to calm shaving irritation and rebuild lost lipids.'
                    : 'Apply 2-3 drops of 2% BHA + 5% Niacinamide across forehead and nose to control shine and keep pores clear.'}
                </p>
              </motion.div>

              {/* Step 3: Defend */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] space-y-1.5 hover:border-[#526442]/60 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono-spec">
                  <div className="flex items-center gap-2">
                    <DefendIcon size={16} color="#526442" />
                    <span className="font-bold text-[#526442] uppercase">03 / DEFEND (30s)</span>
                  </div>
                  <span className="text-[#1A1C1B] font-semibold">AEGIS SHIELD SPF 50</span>
                </div>
                <p className="text-xs text-[#5E645F] pl-6">
                  Apply 2 finger lengths over face and neck. Dries down 100% invisible with zero white cast in facial hair or stubble.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* PM Routine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-8 space-y-6 shadow-xs hover:shadow-lg transition-colors hover:border-[#526442]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD5]">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#1A1C1B]" />
                <h3 className="font-serif-editorial text-xl font-medium text-[#1A1C1B]">
                  Evening Protocol (PM)
                </h3>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono-spec text-[#5E645F] hidden sm:inline">~60 SECONDS</span>
                <button
                  id="copy-pm-routine-btn"
                  onClick={() => copyRoutineText('pm')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono-spec rounded-[3px] border border-[#E2DDD5] bg-[#F2EFE9] hover:bg-[#FAF9F7] text-[#1A1C1B] hover:border-[#526442] hover:text-[#526442] transition-all cursor-pointer select-none"
                  title="Copy Evening Protocol to clipboard"
                >
                  {copiedType === 'pm' ? (
                    <>
                      <Check className="w-3 h-3 text-[#526442]" />
                      <span className="text-[#526442] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#5E645F]" />
                      <span>COPY ROUTINE</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Step 1: Purify */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] space-y-1.5 hover:border-[#526442]/60 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono-spec">
                  <div className="flex items-center gap-2">
                    <PurifyIcon size={16} color="#526442" />
                    <span className="font-bold text-[#526442] uppercase">01 / PURIFY (30s)</span>
                  </div>
                  <span className="text-[#1A1C1B] font-semibold">AEGIS WASH</span>
                </div>
                <p className="text-xs text-[#5E645F] pl-6">
                  Dissolves daytime particulate pollution, sunscreen, and oxidized oils before rest.
                </p>
              </motion.div>

              {/* Step 2: Repair / Rebuild */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] space-y-1.5 hover:border-[#526442]/60 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono-spec">
                  <div className="flex items-center gap-2">
                    <RepairIcon size={16} color="#526442" />
                    <span className="font-bold text-[#526442] uppercase">02 / TREAT & REBUILD (30s)</span>
                  </div>
                  <span className="text-[#1A1C1B] font-semibold">
                    {profileType === 'sensitive' ? 'AEGIS RECOVER CREAM' : 'AEGIS CLEAR + HYDRA'}
                  </span>
                </div>
                <p className="text-xs text-[#5E645F] pl-6">
                  {profileType === 'sensitive'
                    ? 'Dime-sized amount of overnight recovery cream to accelerate barrier recovery from daily razor passes.'
                    : 'Apply 3 drops of BHA serum to clear pore canals, followed by 1 pump of AEGIS HYDRA to replenish hydration.'}
                </p>
              </motion.div>
            </div>

            {/* Quick Kit Link */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] space-y-3 mt-4"
            >
              <div className="flex justify-between items-center text-xs font-mono-spec">
                <span className="font-bold text-[#1A1C1B]">{starterKit.name}</span>
                <span className="text-[#526442] font-bold">₹{starterKit.price.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-[#5E645F]">
                {starterKit.shortDescription}
              </p>
              <button
                onClick={() => onAddToCart(starterKit)}
                className="w-full py-2.5 bg-[#526442] hover:bg-[#394536] text-[#FAF9F7] text-xs font-mono-spec uppercase tracking-wider font-semibold rounded-[3px] transition-colors"
              >
                Add Starter System to Bag
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Embedded Interactive Routine Builder */}
        <RoutineBuilder
          onAddMultipleToCart={onAddMultipleToCart}
          onSelectProduct={onSelectProduct}
        />

        {/* Personalized Quiz Callout */}
        <div className="bg-[#1A1C1B] text-[#FAF9F7] p-8 sm:p-12 rounded-[4px] border border-[#3E453D] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h3 className="text-2xl font-serif-editorial">Want a personalized routine for your exact skin?</h3>
            <p className="text-xs text-[#E2DDD5] max-w-xl">
              Take our 60-second skin quiz to get custom ingredient recommendations calibrated to your shaving habits and daily outdoor exposure.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 px-6 py-3.5 bg-[#FAF9F7] text-[#1A1C1B] hover:bg-[#F2EFE9] font-mono-spec text-xs font-semibold uppercase tracking-wider rounded-[3px] flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#526442]" />
            <span>Take 60s Skin Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
