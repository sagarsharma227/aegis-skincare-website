import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, SkinConcern } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { RecentlyViewed } from './RecentlyViewed';
import { ProductComparisonModal } from './ProductComparisonModal';
import { ShopFilters } from './ShopFilters';
import { ArrowUpDown, X, RotateCcw, Layers } from 'lucide-react';
import { AegisMonogram } from './AegisMonogram';
import { motion } from 'motion/react';

interface ShopViewProps {
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  recentlyViewedIds: string[];
}

export const ShopView: React.FC<ShopViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  recentlyViewedIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'bestsellers' | 'price-low' | 'price-high'>('featured');
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'ALL SKINCARE' },
    { id: 'cleansers', label: 'CLEANSERS' },
    { id: 'serums', label: 'SERUMS' },
    { id: 'moisturizers', label: 'MOISTURIZERS' },
    { id: 'spf', label: 'SUNSCREEN' },
    { id: 'treatments', label: 'TARGETED CARE' },
    { id: 'body', label: 'BODY SKINCARE' },
    { id: 'bundles', label: 'BUNDLES' }
  ];

  const skinTypes = [
    { id: 'all', label: 'All Skin Types' },
    { id: 'Oily', label: 'Oily' },
    { id: 'Dry', label: 'Dry' },
    { id: 'Combination', label: 'Combination' },
    { id: 'Sensitive', label: 'Sensitive' },
    { id: 'Normal', label: 'Normal' }
  ];

  const concerns: { id: SkinConcern; label: string }[] = [
    { id: 'all', label: 'All Concerns' },
    { id: 'acne', label: 'Acne / Blemishes' },
    { id: 'oil', label: 'Oil Control / Shine' },
    { id: 'dark-spots', label: 'Dark Spots / Uneven Tone' },
    { id: 'barrier', label: 'Barrier Repair / Redness' },
    { id: 'dehydration', label: 'Dryness / Dehydration' },
    { id: 'aging', label: 'Aging / Fine Lines' },
    { id: 'sun', label: 'Sun Protection' },
    { id: 'shaving', label: 'Razor Burn / Post-Shave' }
  ];

  const toggleCompare = (productId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const comparedProducts = compareIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchCon =
        selectedConcern === 'all' ||
        p.concerns.includes(selectedConcern) ||
        (selectedConcern === 'shaving' && (p.concerns.includes('barrier') || p.id.includes('after') || p.id.includes('shaving')));
      
      const matchSkin =
        selectedSkinType === 'all' ||
        (p.skinTypes && p.skinTypes.some((t) => t.toLowerCase().includes(selectedSkinType.toLowerCase())));

      return matchCat && matchCon && matchSkin;
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'bestsellers') {
      result.sort((a, b) => {
        const isBestSeller = (p: Product) => {
          if (p.id === 'aegis-even-routine') return false;
          return p.status === 'best-seller' || p.id === 'aegis-repair' || p.id === 'aegis-starter-bundle' || p.id === 'aegis-after' || p.badges?.includes('MOST POPULAR');
        };
        const aBest = isBestSeller(a) ? 1 : 0;
        const bBest = isBestSeller(b) ? 1 : 0;
        if (aBest !== bBest) return bBest - aBest;
        return b.reviewCount - a.reviewCount;
      });
    } else if (sortBy === 'featured') {
      // Sort bundles first, then by step sequence based on original array index or category
      result.sort((a, b) => {
        if (a.isBundle && !b.isBundle) return -1;
        if (!a.isBundle && b.isBundle) return 1;
        return 0; // maintain original relative order otherwise
      });
    }

    return result;
  }, [selectedCategory, selectedConcern, selectedSkinType, sortBy]);

  return (
    <div className="bg-[#F2EFE9] min-h-screen py-12 lg:py-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="max-w-2xl text-left space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono-spec tracking-[0.2em] uppercase text-[#526442] font-semibold">
            <AegisMonogram size={14} color="#526442" />
            <span>AEGIS FORMULATION INDEX</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-editorial font-normal text-[#1A1C1B] leading-tight">
            Shop Formulations
          </h1>
          <p className="text-sm sm:text-base text-[#5E645F] leading-relaxed">
            Purposeful formulas for the skin concerns that matter. Disclosed active concentrations at physiological pH.
          </p>
        </div>

        {/* Unified Clinical Filter System: Category, Concern, and Skin Type in Card Box Grid */}
        <ShopFilters
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          selectedConcern={selectedConcern}
          onSelectConcern={(con) => setSelectedConcern(con)}
          selectedSkinType={selectedSkinType}
          onSelectSkinType={(type) => setSelectedSkinType(type)}
          products={PRODUCTS}
          onResetAll={() => {
            setSelectedCategory('all');
            setSelectedConcern('all');
            setSelectedSkinType('all');
          }}
        />

        {/* Toolbar: Formulation Count, Compare, and Sorting */}
        <div className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="text-xs font-mono-spec">
            <span className="font-semibold text-[#1A1C1B]">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Formulation' : 'Formulations'}
            </span>
          </div>

          {/* Compare Trigger & Sort Controls */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono-spec">

            {/* Compare Bar Trigger */}
            {compareIds.length > 0 && (
              <button
                id="shop-compare-trigger-btn"
                onClick={() => setIsCompareOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#526442] text-[#FAF9F7] rounded-[3px] font-mono-spec font-bold text-[11px] shadow-xs cursor-pointer hover:bg-[#394536] transition-colors"
              >
                <span>Compare ({compareIds.length}/3)</span>
              </button>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-mono-spec shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5E645F]" />
              <label htmlFor="shop-sort-select" className="text-[#5E645F] uppercase text-[11px]">SORT:</label>
              <select
                id="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] px-2.5 py-1.5 text-xs text-[#1A1C1B] focus:outline-hidden font-mono-spec cursor-pointer"
              >
                <option value="featured">Featured Protocol</option>
                <option value="bestsellers">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[4px] space-y-4">
            <p className="text-sm font-mono-spec text-[#5E645F] uppercase font-bold tracking-wider">
              NOTHING MATCHED YOUR FILTERS
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedConcern('all');
              }}
              className="px-5 py-2 bg-[#526442] text-[#FAF9F7] text-xs font-mono-spec uppercase rounded-[3px]"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="relative flex flex-col"
              >
                <ProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                />
                <div className="mt-2 flex items-center justify-end">
                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`text-[10px] font-mono-spec uppercase px-2 py-1 rounded-[2px] transition-colors flex items-center gap-1 ${
                      compareIds.includes(product.id)
                        ? 'bg-[#1A1C1B] text-[#FAF9F7]'
                        : 'text-[#5E645F] hover:text-[#1A1C1B]'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>{compareIds.includes(product.id) ? 'Comparing' : '+ Compare'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Floating Compare Bar */}
        {compareIds.length > 0 && (
          <aside aria-label="Product comparison bar" className="fixed bottom-6 right-6 z-40 bg-[#1A1C1B] text-[#FAF9F7] border border-[#3E453D] rounded-[4px] p-4 shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] font-mono-spec text-[#8C9B86] uppercase tracking-widest block">
                COMPARE MATRIX ({compareIds.length}/3)
              </span>
              <div className="flex gap-2">
                {comparedProducts.map((p) => (
                  <span key={p.id} className="text-xs font-serif-editorial text-[#FAF9F7] flex items-center gap-1">
                    {p.name}
                    <button onClick={() => toggleCompare(p.id)} className="text-[#8C9B86] hover:text-[#FAF9F7] cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              id="open-compare-modal-btn"
              onClick={() => setIsCompareOpen(true)}
              className="py-2 px-4 bg-[#526442] hover:bg-[#3E453D] text-[#FAF9F7] text-xs font-mono-spec uppercase tracking-wider font-semibold rounded-[3px] transition-colors cursor-pointer"
            >
              Compare
            </button>
          </aside>
        )}

        {/* Recently Viewed */}
        <RecentlyViewed
          viewedIds={recentlyViewedIds}
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
        />

        {/* Comparison Modal */}
        {isCompareOpen && (
          <ProductComparisonModal
            products={comparedProducts}
            onClose={() => setIsCompareOpen(false)}
            onRemoveProduct={toggleCompare}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
          />
        )}
      </div>
    </div>
  );
};
