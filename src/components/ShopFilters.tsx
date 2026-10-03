import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProductCategory, SkinConcern, Product } from '../types';
import { Filter, RotateCcw } from 'lucide-react';

interface ShopFiltersProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedConcern: SkinConcern;
  onSelectConcern: (con: SkinConcern) => void;
  selectedSkinType: string;
  onSelectSkinType: (type: string) => void;
  products: Product[];
  onResetAll: () => void;
}

export const ShopFilters: React.FC<ShopFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedConcern,
  onSelectConcern,
  selectedSkinType,
  onSelectSkinType,
  products,
  onResetAll,
}) => {
  const [activeTab, setActiveTab] = useState<'concern' | 'category' | 'skintype'>('concern');
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Skincare' },
    { id: 'cleansers', label: 'Cleansers' },
    { id: 'serums', label: 'Targeted Serums' },
    { id: 'moisturizers', label: 'Moisturizers' },
    { id: 'spf', label: 'Sunscreen (SPF)' },
    { id: 'treatments', label: 'Targeted Care' },
    { id: 'body', label: 'Body Skincare' },
    { id: 'bundles', label: 'Bundles & Kits' },
  ];

  const concerns: { id: SkinConcern; label: string }[] = [
    { id: 'all', label: 'All Concerns' },
    { id: 'acne', label: 'Acne & Breakouts' },
    { id: 'oil', label: 'Oil Control & Shine' },
    { id: 'texture', label: 'Blackheads & Pores' },
    { id: 'dark-spots', label: 'Dark Spots & Tone' },
    { id: 'barrier', label: 'Dryness & Barrier' },
    { id: 'sun', label: 'Sun Protection' },
    { id: 'shaving', label: 'Razor Irritation' },
  ];

  const skinTypes = [
    { id: 'all', label: 'All Skin Types' },
    { id: 'Oily', label: 'Oily & Congested' },
    { id: 'Dry', label: 'Dry & Flaky' },
    { id: 'Combination', label: 'Combination' },
    { id: 'Sensitive', label: 'Sensitive / Shave-Prone' },
    { id: 'Normal', label: 'Normal / Resilient' },
  ];

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedConcern !== 'all' || selectedSkinType !== 'all';

  const renderGrid = (
    items: { id: string; label: string }[],
    selectedId: string,
    onSelect: (id: any) => void
  ) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        {items.map((item, index) => {
          const isActive = selectedId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              onClick={() => onSelect(isActive && item.id !== 'all' ? 'all' : item.id)}
              className={`group cursor-pointer p-3 sm:p-4 border rounded-[3px] transition-all text-center flex flex-col items-center justify-center min-h-[75px] sm:min-h-[85px] select-none ${
                isActive
                  ? 'bg-[#1A1C1B] border-[#1A1C1B] text-[#FAF9F7] shadow-xs'
                  : 'bg-[#F2EFE9] border-[#E2DDD5] text-[#1A1C1B] hover:border-[#526442] hover:bg-[#FAF9F7]'
              }`}
            >
              <span
                className={`font-mono-spec text-[11px] font-semibold tracking-wide uppercase leading-tight ${
                  isActive
                    ? 'text-[#FAF9F7]'
                    : 'text-[#1A1C1B] group-hover:text-[#526442]'
                }`}
              >
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-8 space-y-6">
      {/* Top Header & Mode Navigation */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-[#E2DDD5] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono-spec tracking-[0.2em] uppercase text-[#526442] font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>CLINICAL FILTERING & TARGETED SELECTION</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#1A1C1B]">
            {viewMode === 'all'
              ? 'Browse All Filters'
              : activeTab === 'concern'
              ? 'Shop by Concern'
              : activeTab === 'category'
              ? 'Shop by Category'
              : 'Shop by Skin Type'}
          </h2>
          <p className="font-sans text-[#5E645F] text-xs sm:text-sm max-w-xl">
            {viewMode === 'all'
              ? 'Select targeted indications, formulation category steps, and specific skin profiles.'
              : activeTab === 'concern'
              ? 'Select your primary skin concern to view targeted, science-backed formulations.'
              : activeTab === 'category'
              ? 'Filter by protocol step: cleansers, active serums, barrier creams, and SPF.'
              : 'Formulas calibrated for sebaceous activity, barrier fragility, and post-shave skin.'}
          </p>
        </div>

        {/* Tab Switcher & View Mode */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Main 3 Filter Category Tabs */}
          <div className="flex items-center gap-1.5 bg-[#F2EFE9] p-1 border border-[#E2DDD5] rounded-[4px]">
            <button
              id="shop-filter-tab-concern"
              onClick={() => {
                setActiveTab('concern');
                setViewMode('tabs');
              }}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-mono-spec uppercase font-bold tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'tabs' && activeTab === 'concern'
                  ? 'bg-[#1A1C1B] text-[#FAF9F7] shadow-xs'
                  : 'text-[#5E645F] hover:text-[#1A1C1B]'
              }`}
            >
              <span>CONCERN</span>
              {selectedConcern !== 'all' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#526442]" />
              )}
            </button>

            <button
              id="shop-filter-tab-category"
              onClick={() => {
                setActiveTab('category');
                setViewMode('tabs');
              }}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-mono-spec uppercase font-bold tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'tabs' && activeTab === 'category'
                  ? 'bg-[#1A1C1B] text-[#FAF9F7] shadow-xs'
                  : 'text-[#5E645F] hover:text-[#1A1C1B]'
              }`}
            >
              <span>CATEGORY</span>
              {selectedCategory !== 'all' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#526442]" />
              )}
            </button>

            <button
              id="shop-filter-tab-skintype"
              onClick={() => {
                setActiveTab('skintype');
                setViewMode('tabs');
              }}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-mono-spec uppercase font-bold tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'tabs' && activeTab === 'skintype'
                  ? 'bg-[#1A1C1B] text-[#FAF9F7] shadow-xs'
                  : 'text-[#5E645F] hover:text-[#1A1C1B]'
              }`}
            >
              <span>SKIN TYPE</span>
              {selectedSkinType !== 'all' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#526442]" />
              )}
            </button>
          </div>

          {/* View Mode Toggle (Tabs vs Expand All) */}
          <button
            id="shop-filter-view-mode-btn"
            onClick={() => setViewMode(viewMode === 'tabs' ? 'all' : 'tabs')}
            className={`px-3 py-1.5 text-xs font-mono-spec rounded-[3px] border transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'all'
                ? 'bg-[#526442] text-[#FAF9F7] border-[#526442] font-semibold'
                : 'bg-[#FAF9F7] text-[#5E645F] border-[#E2DDD5] hover:border-[#1A1C1B] hover:text-[#1A1C1B]'
            }`}
          >
            {viewMode === 'all' ? 'TABS VIEW' : 'EXPAND ALL'}
          </button>

          {/* Reset button if active */}
          {hasActiveFilters && (
            <button
              id="shop-filter-clear-top-btn"
              onClick={onResetAll}
              className="px-2.5 py-1.5 text-[11px] font-mono-spec text-[#526442] hover:text-[#1A1C1B] border border-[#E2DDD5] rounded-[3px] bg-[#FAF9F7] hover:bg-[#F2EFE9] transition-all flex items-center gap-1 cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>CLEAR</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Grids */}
      {viewMode === 'all' ? (
        <div className="space-y-8">
          {/* 1. Category Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-spec tracking-wider uppercase font-bold text-[#1A1C1B]">
                  01 / FORMULATION CATEGORY
                </span>
                {selectedCategory !== 'all' && (
                  <span className="text-[10px] font-mono-spec text-[#526442] bg-[#526442]/10 px-2 py-0.5 rounded-[2px] font-bold">
                    SELECTED
                  </span>
                )}
              </div>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => onSelectCategory('all')}
                  className="text-[11px] font-mono-spec text-[#5E645F] hover:text-[#1A1C1B] underline uppercase cursor-pointer"
                >
                  Reset Category
                </button>
              )}
            </div>
            {renderGrid(categories, selectedCategory, onSelectCategory)}
          </div>

          {/* 2. Concern Grid */}
          <div className="space-y-3 pt-2 border-t border-[#E2DDD5]/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-spec tracking-wider uppercase font-bold text-[#1A1C1B]">
                  02 / SKIN CONCERN
                </span>
                {selectedConcern !== 'all' && (
                  <span className="text-[10px] font-mono-spec text-[#526442] bg-[#526442]/10 px-2 py-0.5 rounded-[2px] font-bold">
                    SELECTED
                  </span>
                )}
              </div>
              {selectedConcern !== 'all' && (
                <button
                  onClick={() => onSelectConcern('all')}
                  className="text-[11px] font-mono-spec text-[#5E645F] hover:text-[#1A1C1B] underline uppercase cursor-pointer"
                >
                  Reset Concern
                </button>
              )}
            </div>
            {renderGrid(concerns, selectedConcern, onSelectConcern)}
          </div>

          {/* 3. Skin Type Grid */}
          <div className="space-y-3 pt-2 border-t border-[#E2DDD5]/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-spec tracking-wider uppercase font-bold text-[#1A1C1B]">
                  03 / SKIN TYPE
                </span>
                {selectedSkinType !== 'all' && (
                  <span className="text-[10px] font-mono-spec text-[#526442] bg-[#526442]/10 px-2 py-0.5 rounded-[2px] font-bold">
                    SELECTED
                  </span>
                )}
              </div>
              {selectedSkinType !== 'all' && (
                <button
                  onClick={() => onSelectSkinType('all')}
                  className="text-[11px] font-mono-spec text-[#5E645F] hover:text-[#1A1C1B] underline uppercase cursor-pointer"
                >
                  Reset Skin Type
                </button>
              )}
            </div>
            {renderGrid(skinTypes, selectedSkinType, onSelectSkinType)}
          </div>
        </div>
      ) : (
        <div>
          {activeTab === 'concern' && renderGrid(concerns, selectedConcern, onSelectConcern)}
          {activeTab === 'category' && renderGrid(categories, selectedCategory, onSelectCategory)}
          {activeTab === 'skintype' && renderGrid(skinTypes, selectedSkinType, onSelectSkinType)}
        </div>
      )}

      {/* Applied Filters Summary Bar (shows active filters across all 3 facets) */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-[#E2DDD5] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-spec">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#5E645F] uppercase text-[10px] font-semibold tracking-wider">
              ACTIVE FILTERS:
            </span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1C1B] text-[#FAF9F7] rounded-[2px] text-[11px]">
                <span>Category: {categories.find((c) => c.id === selectedCategory)?.label}</span>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-[#E2DDD5] font-bold cursor-pointer"
                  title="Remove category filter"
                >
                  &times;
                </button>
              </span>
            )}

            {selectedConcern !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1C1B] text-[#FAF9F7] rounded-[2px] text-[11px]">
                <span>Concern: {concerns.find((c) => c.id === selectedConcern)?.label}</span>
                <button
                  onClick={() => onSelectConcern('all')}
                  className="hover:text-[#E2DDD5] font-bold cursor-pointer"
                  title="Remove concern filter"
                >
                  &times;
                </button>
              </span>
            )}

            {selectedSkinType !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1C1B] text-[#FAF9F7] rounded-[2px] text-[11px]">
                <span>Skin Type: {skinTypes.find((s) => s.id === selectedSkinType)?.label}</span>
                <button
                  onClick={() => onSelectSkinType('all')}
                  className="hover:text-[#E2DDD5] font-bold cursor-pointer"
                  title="Remove skin type filter"
                >
                  &times;
                </button>
              </span>
            )}
          </div>

          <button
            onClick={onResetAll}
            className="text-[11px] text-[#526442] hover:text-[#1A1C1B] font-bold uppercase underline tracking-wider cursor-pointer"
          >
            Clear All &times;
          </button>
        </div>
      )}
    </div>
  );
};
