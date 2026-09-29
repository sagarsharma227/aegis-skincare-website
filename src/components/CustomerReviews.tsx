import React from 'react';
import { REVIEWS, PRODUCTS } from '../data/products';
import { Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomerReviewsProps {
  onSelectProduct?: (productId: string) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ onSelectProduct }) => {
  return (
    <section className="bg-[#F2EFE9] py-20 lg:py-24 border-b border-[#E2DDD5] text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-mono-spec tracking-[0.2em] uppercase text-[#526442] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>COMMUNITY FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-editorial font-normal text-[#1A1C1B]">
            Everyday Experiences
          </h2>
          <p className="text-xs sm:text-sm text-[#5E645F] leading-relaxed">
            Real feedback from men using the 3-minute protocol across varying climates and skin types.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review, idx) => {
            const matchedProduct = PRODUCTS.find(
              (p) =>
                p.name.toLowerCase() === review.productName.toLowerCase() ||
                p.name.toLowerCase().includes(review.productName.toLowerCase()) ||
                review.productName.toLowerCase().includes(p.name.toLowerCase())
            );

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 flex flex-col justify-between space-y-4 shadow-xs hover:border-[#526442] hover:shadow-md transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#526442]">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono-spec text-[#5E645F]">
                      {review.date}
                    </span>
                  </div>

                  <p className="text-xs text-[#1A1C1B] leading-relaxed font-serif-editorial italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2DDD5]/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A1C1B] font-serif-editorial">
                      {review.author}
                    </span>
                    {review.verifiedBuyer && (
                      <span className="text-[9px] font-mono-spec text-[#526442] font-semibold uppercase">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono-spec text-[#5E645F]">
                    <span>{review.city}</span>
                    {matchedProduct && onSelectProduct ? (
                      <button
                        onClick={() => onSelectProduct(matchedProduct.id)}
                        className="truncate max-w-[140px] text-[#526442] hover:text-[#1A1C1B] font-semibold underline underline-offset-2 cursor-pointer text-right"
                        title={`View ${review.productName} specs`}
                      >
                        {review.productName}
                      </button>
                    ) : (
                      <span className="truncate max-w-[120px]">{review.productName}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
