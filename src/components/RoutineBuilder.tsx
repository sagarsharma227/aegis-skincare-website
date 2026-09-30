import React, { useState } from 'react';
import { Product, RoutineCheckStatus } from '../types';
import { PRODUCTS } from '../data/products';
import { CheckCircle2, AlertCircle, ShoppingBag, Sparkles, RefreshCw, Plus, Check } from 'lucide-react';
import { AegisMonogram } from './AegisMonogram';

interface RoutineBuilderProps {
  onAddMultipleToCart: (products: Product[]) => void;
  onSelectProduct: (productId: string) => void;
}

export const RoutineBuilder: React.FC<RoutineBuilderProps> = ({
  onAddMultipleToCart,
  onSelectProduct
}) => {
  const [selectedAmCleanse, setSelectedAmCleanse] = useState<string>('aegis-wash');
  const [selectedAmTreat, setSelectedAmTreat] = useState<string>('aegis-clear');
  const [selectedAmDefend, setSelectedAmDefend] = useState<string>('aegis-shield');

  const [selectedPmCleanse, setSelectedPmCleanse] = useState<string>('aegis-wash');
  const [selectedPmTreat, setSelectedPmTreat] = useState<string>('aegis-clear');
  const [selectedPmRepair, setSelectedPmRepair] = useState<string>('aegis-hydra');

  // Calculate unique selected products
  const selectedProductIds = Array.from(
    new Set([
      selectedAmCleanse,
      selectedAmTreat,
      selectedAmDefend,
      selectedPmCleanse,
      selectedPmTreat,
      selectedPmRepair
    ].filter(Boolean))
  );

  const selectedProducts = selectedProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = selectedProducts.length >= 3 ? Math.round(totalPrice * 0.15) : 0;
  const finalPrice = totalPrice - bundleDiscount;

  // Routine check status
  const hasCleanser = selectedProductIds.includes('aegis-wash');
  const hasTreatment = selectedProductIds.includes('aegis-clear');
  const hasBarrier = selectedProductIds.includes('aegis-hydra') || selectedProductIds.includes('aegis-recover');
  const hasSpf = selectedProductIds.includes('aegis-shield');

  const scoreCount = [hasCleanser, hasTreatment, hasBarrier, hasSpf].filter(Boolean).length;
  const routineScore = scoreCount * 25;

  const handleAddFullRoutine = () => {
    onAddMultipleToCart(selectedProducts);
  };

  return (
    <div className="space-y-12 text-left">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] text-[#526442] text-[10px] font-mono-spec tracking-[0.2em] uppercase">
          <AegisMonogram size={14} color="#526442" />
          <span>INTERACTIVE ROUTINE BUILDER</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-editorial text-[#1A1C1B]">
          Build Your Custom Daily System
        </h2>
        <p className="text-xs sm:text-sm text-[#5E645F] leading-relaxed">
          Configure your morning (AM) and evening (PM) steps to receive a live routine completeness check and bundle savings.
        </p>
      </div>

      {/* AM & PM Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Morning Protocol */}
        <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD5]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono-spec text-[#526442] font-bold uppercase tracking-widest">
                MORNING PROTOCOL
              </span>
              <h3 className="font-serif-editorial text-xl text-[#1A1C1B]">
                AM: Cleanse · Correct · Defend
              </h3>
            </div>
            <span className="text-xs font-mono-spec text-[#5E645F]">~2 Minutes</span>
          </div>

          {/* AM Step 1: Cleanse */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-spec text-[#5E645F]">
              <span>STEP 01: CLEANSE</span>
              <span className="text-[#526442]">pH 5.5 Amino Acids</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedAmCleanse('aegis-wash')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  selectedAmCleanse === 'aegis-wash'
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] text-[#526442] uppercase">AEGIS WASH</div>
                <div className="text-[11px]">Amino Acid Purifying Cleanser</div>
              </button>
              <button
                onClick={() => setSelectedAmCleanse('')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  !selectedAmCleanse
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] uppercase">Skip / Water Only</div>
                <div className="text-[11px]">Splash with lukewarm water</div>
              </button>
            </div>
          </div>

          {/* AM Step 2: Correct */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-spec text-[#5E645F]">
              <span>STEP 02: CORRECT</span>
              <span className="text-[#526442]">2% BHA + 5% Niacinamide</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedAmTreat('aegis-clear')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  selectedAmTreat === 'aegis-clear'
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] text-[#526442] uppercase">AEGIS CLEAR</div>
                <div className="text-[11px]">2% BHA + 5% Niacinamide Serum</div>
              </button>
              <button
                onClick={() => setSelectedAmTreat('')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  !selectedAmTreat
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] uppercase">Skip Serum</div>
                <div className="text-[11px]">Straight to hydration / SPF</div>
              </button>
            </div>
          </div>

          {/* AM Step 3: Defend */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-spec text-[#5E645F]">
              <span>STEP 03: DEFEND</span>
              <span className="text-[#526442]">Invisible SPF 50 PA++++</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedAmDefend('aegis-shield')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  selectedAmDefend === 'aegis-shield'
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] text-[#526442] uppercase">AEGIS SHIELD</div>
                <div className="text-[11px]">Zero-Cast SPF 50 Daily Sunscreen</div>
              </button>
              <button
                onClick={() => setSelectedAmDefend('')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  !selectedAmDefend
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] uppercase">No Sunscreen</div>
                <div className="text-[11px] text-[#A65F5F]">Leaves barrier vulnerable</div>
              </button>
            </div>
          </div>
        </div>

        {/* Evening Protocol */}
        <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2DDD5]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono-spec text-[#526442] font-bold uppercase tracking-widest">
                EVENING PROTOCOL
              </span>
              <h3 className="font-serif-editorial text-xl text-[#1A1C1B]">
                PM: Cleanse · Treat · Repair
              </h3>
            </div>
            <span className="text-xs font-mono-spec text-[#5E645F]">~2 Minutes</span>
          </div>

          {/* PM Step 1: Cleanse */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-spec text-[#5E645F]">
              <span>STEP 01: NIGHT RESET</span>
              <span className="text-[#526442]">Removes Pollution & SPF</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedPmCleanse('aegis-wash')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  selectedPmCleanse === 'aegis-wash'
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] text-[#526442] uppercase">AEGIS WASH</div>
                <div className="text-[11px]">Amino Acid Purifying Cleanser</div>
              </button>
              <button
                onClick={() => setSelectedPmCleanse('')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  !selectedPmCleanse
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] uppercase">Skip Cleanser</div>
                <div className="text-[11px] text-[#A65F5F]">Risk of clogged pores</div>
              </button>
            </div>
          </div>

          {/* PM Step 2: Treat */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-spec text-[#5E645F]">
              <span>STEP 02: PORE TREATMENT</span>
              <span className="text-[#526442]">Dissolves Trapped Sebum</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedPmTreat('aegis-clear')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  selectedPmTreat === 'aegis-clear'
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] text-[#526442] uppercase">AEGIS CLEAR</div>
                <div className="text-[11px]">2% BHA + 5% Niacinamide Serum</div>
              </button>
              <button
                onClick={() => setSelectedPmTreat('')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  !selectedPmTreat
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] uppercase">Skip Night Active</div>
                <div className="text-[11px]">Focus purely on hydration</div>
              </button>
            </div>
          </div>

          {/* PM Step 3: Repair */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono-spec text-[#5E645F]">
              <span>STEP 03: BARRIER REPAIR</span>
              <span className="text-[#526442]">3:1:1 Biomimetic Ceramides</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedPmRepair('aegis-hydra')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  selectedPmRepair === 'aegis-hydra'
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] text-[#526442] uppercase">AEGIS HYDRA</div>
                <div className="text-[11px]">Oil-Free Lightweight Gel Moisturizer</div>
              </button>
              <button
                onClick={() => setSelectedPmRepair('')}
                className={`p-3 rounded-[3px] border text-left text-xs transition-all ${
                  !selectedPmRepair
                    ? 'border-[#526442] bg-[#F2EFE9] text-[#1A1C1B] font-medium'
                    : 'border-[#E2DDD5] bg-[#FAF9F7] text-[#5E645F]'
                }`}
              >
                <div className="font-mono-spec text-[10px] uppercase">Skip Moisturizer</div>
                <div className="text-[11px]">Minimal hydration</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Routine Check Box & Summary Bar */}
      <div className="bg-[#1A1C1B] text-[#FAF9F7] border border-[#3E453D] rounded-[4px] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#3E453D]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-spec text-[#8C9B86] font-bold uppercase tracking-widest">
                ROUTINE COMPLETENESS CHECK
              </span>
              <span className="px-2 py-0.5 rounded-[2px] bg-[#222523] text-[#FAF9F7] font-mono-spec text-[10px] border border-[#3E453D]">
                {routineScore}% Complete
              </span>
            </div>
            <h3 className="font-serif-editorial text-2xl text-[#FAF9F7]">
              {routineScore === 100
                ? 'Full 360° Daily Defense System'
                : 'Partial Everyday Protocol'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono-spec">
              <div className="text-xs text-[#E2DDD5]">
                {selectedProducts.length} Formulations Selected
              </div>
              <div className="text-lg font-bold text-[#FAF9F7]">
                ₹{finalPrice.toLocaleString('en-IN')}{' '}
                {bundleDiscount > 0 && (
                  <span className="text-xs text-[#8C9B86] line-through">₹{totalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
            </div>

            <button
              id="builder-add-full-routine-btn"
              onClick={handleAddFullRoutine}
              disabled={selectedProducts.length === 0}
              className="py-3 px-6 rounded-[3px] bg-[#526442] hover:bg-[#3E453D] text-[#FAF9F7] font-mono-spec text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add System to Bag</span>
            </button>
          </div>
        </div>

        {/* 4 Check Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-[3px] border ${hasCleanser ? 'bg-[#222523] border-[#526442]' : 'bg-[#222523]/40 border-[#3E453D]'}`}>
            <div className="flex items-center justify-between font-mono-spec text-[10px] mb-1">
              <span className="text-[#8C9B86]">01. CLEANSING</span>
              {hasCleanser ? <Check className="w-3.5 h-3.5 text-[#8C9B86]" /> : <span className="text-[#A65F5F]">-</span>}
            </div>
            <span className="text-xs text-[#FAF9F7] font-medium block">
              {hasCleanser ? 'pH 5.5 Protected' : 'Missing Cleanser'}
            </span>
          </div>

          <div className={`p-3 rounded-[3px] border ${hasTreatment ? 'bg-[#222523] border-[#526442]' : 'bg-[#222523]/40 border-[#3E453D]'}`}>
            <div className="flex items-center justify-between font-mono-spec text-[10px] mb-1">
              <span className="text-[#8C9B86]">02. TREATMENT</span>
              {hasTreatment ? <Check className="w-3.5 h-3.5 text-[#8C9B86]" /> : <span className="text-[#A65F5F]">-</span>}
            </div>
            <span className="text-xs text-[#FAF9F7] font-medium block">
              {hasTreatment ? '2% BHA + Niacinamide' : 'No Pore Active'}
            </span>
          </div>

          <div className={`p-3 rounded-[3px] border ${hasBarrier ? 'bg-[#222523] border-[#526442]' : 'bg-[#222523]/40 border-[#3E453D]'}`}>
            <div className="flex items-center justify-between font-mono-spec text-[10px] mb-1">
              <span className="text-[#8C9B86]">03. BARRIER</span>
              {hasBarrier ? <Check className="w-3.5 h-3.5 text-[#8C9B86]" /> : <span className="text-[#A65F5F]">-</span>}
            </div>
            <span className="text-xs text-[#FAF9F7] font-medium block">
              {hasBarrier ? '3:1:1 Ceramides' : 'Missing Repair Fluid'}
            </span>
          </div>

          <div className={`p-3 rounded-[3px] border ${hasSpf ? 'bg-[#222523] border-[#526442]' : 'bg-[#222523]/40 border-[#3E453D]'}`}>
            <div className="flex items-center justify-between font-mono-spec text-[10px] mb-1">
              <span className="text-[#8C9B86]">04. SUN DEFENSE</span>
              {hasSpf ? <Check className="w-3.5 h-3.5 text-[#8C9B86]" /> : <span className="text-[#A65F5F]">-</span>}
            </div>
            <span className="text-xs text-[#FAF9F7] font-medium block">
              {hasSpf ? 'Zero-Cast SPF 50' : 'Missing Sunscreen'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
