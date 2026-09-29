import React from 'react';
import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { NavView } from '../types';

interface BestsellersProps {
  onSelectProduct: (id: string) => void;
  onAddToCart: (product: any, quantity: number) => void;
  onToggleWishlist: (id: string) => void;
  wishlistIds: string[];
}

export const Bestsellers: React.FC<BestsellersProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  // Select exact 3 essential products
  const essentialIds = ['aegis-wash', 'aegis-clear', 'aegis-shield'];
  const bestsellers = essentialIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));

  return (
    <section className="py-20 sm:py-24 bg-[#FAF9F7] border-b border-[#E2DDD5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#1A1C1B] mb-2">
              THE ESSENTIALS
            </h2>
            <p className="font-sans text-[#5E645F] text-sm">
              Everything you need. Nothing you don't.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={(p) => onAddToCart(p, 1)}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
