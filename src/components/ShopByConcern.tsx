import React from 'react';
import { motion } from 'motion/react';
import { NavView, SkinConcern } from '../types';

interface ShopByConcernProps {
  setCurrentView?: (view: NavView) => void;
  selectedConcern?: SkinConcern;
  onSelectConcern?: (concern: SkinConcern) => void;
}

export const ShopByConcern: React.FC<ShopByConcernProps> = ({
  setCurrentView,
  selectedConcern,
  onSelectConcern,
}) => {
  const concerns: { id: SkinConcern; label: string }[] = [
    { id: 'acne', label: 'Acne & Breakouts' },
    { id: 'oil', label: 'Oil Control' },
    { id: 'texture', label: 'Blackheads & Pores' },
    { id: 'dark-spots', label: 'Dark Spots' },
    { id: 'barrier', label: 'Dryness & Barrier' },
    { id: 'sun', label: 'Sun Protection' },
    { id: 'shaving', label: 'Razor Irritation' },
  ];

  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono-spec tracking-[0.2em] uppercase text-[#526442] font-semibold block mb-1">
            TARGETED FORMULATIONS
          </span>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#1A1C1B]">Shop by Concern</h2>
          <p className="font-sans text-[#5E645F] text-xs sm:text-sm mt-1 max-w-xl">
            Filter our active formulas by your primary skin concern.
          </p>
        </div>
        {selectedConcern && selectedConcern !== 'all' && onSelectConcern && (
          <button
            onClick={() => onSelectConcern('all')}
            className="text-xs font-mono-spec font-bold text-[#526442] hover:text-[#1A1C1B] tracking-wider uppercase transition-colors whitespace-nowrap"
          >
            SHOW ALL CONCERNS &times;
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {concerns.map((concern, index) => {
          const isActive = selectedConcern === concern.id;
          return (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (onSelectConcern) {
                  onSelectConcern(isActive ? 'all' : concern.id);
                } else if (setCurrentView) {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`group cursor-pointer p-3 sm:p-4 border rounded-[3px] transition-all text-center flex flex-col items-center justify-center min-h-[75px] sm:min-h-[85px] select-none ${
                isActive
                  ? 'bg-[#1A1C1B] border-[#1A1C1B] text-[#FAF9F7] shadow-xs'
                  : 'bg-[#F2EFE9] border-[#E2DDD5] text-[#1A1C1B] hover:border-[#526442] hover:bg-[#FAF9F7]'
              }`}
            >
              <span
                className={`font-mono-spec text-[11px] font-semibold tracking-wide ${
                  isActive
                    ? 'text-[#FAF9F7]'
                    : 'text-[#1A1C1B] group-hover:text-[#526442]'
                }`}
              >
                {concern.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
