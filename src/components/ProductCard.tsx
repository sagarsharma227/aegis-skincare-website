import React, { useState } from "react";
import { Product } from "../types";
import { Heart, Star, Plus, Check } from "lucide-react";
import { useImageStore } from "../hooks/useImageStore";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const specCode = product.id.toUpperCase().replace("AEGIS-", "AG-");
  const { image } = useImageStore(product.id, product.image);
  const [isJustAdded, setIsJustAdded] = useState(false);

  // Only keep Limited Edition for exactly 5 specific products
  const limitedEditionIds = [
    'aegis-starter-bundle',
    'aegis-even-routine',
    'aegis-oil-control-set',
    'aegis-repair',
    'aegis-shield-matte'
  ];
  
  const isLimited = limitedEditionIds.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1200);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelectProduct(product.id)}
      className="group h-full flex-1 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 flex flex-col justify-between transition-colors duration-300 hover:border-[#526442] hover:shadow-lg cursor-pointer select-none"
    >
      {/* Top Meta, Inventory Badge & Wishlist */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-[10px] font-mono-spec">
          <div className="flex items-center gap-2">
            <span className="text-[#526442] font-bold tracking-widest uppercase">
              {product.stepNumber}
            </span>
            {/* Subtle Inventory Context Badge */}
            {isLimited && (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono-spec uppercase tracking-wider font-semibold px-2 py-0.5 rounded-[2px] bg-[#EFE9DF] text-[#7A5826] border border-[#DDD0BC]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A87B32]" />
                Limited Edition
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <motion.button
              id={`wishlist-btn-${product.id}`}
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(product.id);
              }}
              className={`p-1.5 rounded-[3px] border transition-colors cursor-pointer ${
                isWishlisted
                  ? "bg-[#526442] border-[#526442] text-[#FAF9F7]"
                  : "bg-[#F2EFE9] border-[#E2DDD5] text-[#5E645F] hover:text-[#1A1C1B] hover:border-[#1A1C1B]"
              }`}
              title={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                className={`w-3.5 h-3.5 ${isWishlisted ? "fill-current" : ""}`}
              />
            </motion.button>
          </div>
        </div>

        {/* Product Imagery - Authentic Real Photography */}
        <div
          id={`product-card-img-${product.id}`}
          className="relative aspect-square bg-[#151714] rounded-[2px] overflow-hidden flex items-center justify-center border border-[#E2DDD5]/40 group/img"
        >
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder-product.jpg'; }}
          />

          {/* Overlay actual product label in HTML to maintain brand consistency over real photography */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
            <div className="flex justify-between items-end opacity-90">
              <span className="text-[10px] font-mono-spec font-bold tracking-[0.1em] text-white/90">
                AEGIS // {specCode}
              </span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-1.5 text-left">
          {/* Skin Type / Category Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pb-0.5">
            <span className="text-[10px] font-mono-spec font-bold tracking-wider uppercase text-[#526442]">
              {product.concerns.slice(0, 2).join(' · ')}
            </span>
          </div>

          <h3
            id={`product-title-${product.id}`}
            className="font-serif-editorial text-lg font-medium text-[#1A1C1B] group-hover:text-[#526442] transition-colors leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#5E645F] font-normal">
            {product.subtitle}
          </p>

          <p className="text-xs text-[#5E645F] pt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Bottom Price, Rating & Add to Bag Action */}
      <div className="pt-5 mt-4 border-t border-[#E2DDD5]/60 flex items-center justify-between gap-3">
        <div className="text-left">
          <div className="flex items-baseline gap-2 font-mono-spec">
            <span className="font-bold text-[#1A1C1B] text-base">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#5E645F] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#5E645F]">
            <Star className="w-3 h-3 fill-[#526442] text-[#526442]" />
            <span className="font-semibold text-[#1A1C1B]">
              {product.rating}
            </span>
            <span>({product.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            id={`add-to-bag-${product.id}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.93 }}
            onClick={handleQuickAdd}
            className={`px-3.5 sm:px-4 py-2 rounded-[3px] font-mono-spec text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isJustAdded
                ? "bg-[#1A1C1B] text-[#FAF9F7]"
                : "bg-[#526442] hover:bg-[#394536] text-[#FAF9F7]"
            }`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#A8D5BA]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
