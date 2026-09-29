
import React from 'react';
import { motion } from 'motion/react';
import { Beaker, ShieldCheck, Droplet, Clock } from 'lucide-react';

export const BrandPhilosophy = () => {
  return (
    <section className="bg-[#1A1C1B] text-[#FAF9F7] py-16 sm:py-20 border-b border-[#3E453D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center sm:text-left"
        >
          <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#FAF9F7] font-medium tracking-tight mb-2">
            BUILT AROUND THE ESSENTIALS
          </h2>
          <p className="font-sans text-[#A8B5CF] text-sm sm:text-base font-light">
            Science-backed formulations focused purely on biological utility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="space-y-4 p-4 rounded-[3px] transition-colors hover:bg-[#222523]"
          >
            <ShieldCheck className="w-6 h-6 text-[#A8B5CF]" strokeWidth={1.5} />
            <h3 className="font-mono-spec text-xs tracking-widest text-[#FAF9F7] uppercase font-semibold">
              Designed for men's skin
            </h3>
            <p className="font-sans text-xs text-[#E2DDD5] leading-relaxed font-light">
              Formulated specifically for thicker stratum corneum, higher sebum production, and daily shaving friction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="space-y-4 p-4 rounded-[3px] transition-colors hover:bg-[#222523]"
          >
            <Beaker className="w-6 h-6 text-[#A8B5CF]" strokeWidth={1.5} />
            <h3 className="font-mono-spec text-xs tracking-widest text-[#FAF9F7] uppercase font-semibold">
              Transparent active ingredients
            </h3>
            <p className="font-sans text-xs text-[#E2DDD5] leading-relaxed font-light">
              Clear percentages of clinical actives like Niacinamide and Salicylic Acid, without proprietary blends.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="space-y-4 p-4 rounded-[3px] transition-colors hover:bg-[#222523]"
          >
            <Droplet className="w-6 h-6 text-[#A8B5CF]" strokeWidth={1.5} />
            <h3 className="font-mono-spec text-xs tracking-widest text-[#FAF9F7] uppercase font-semibold">
              pH-conscious formulations
            </h3>
            <p className="font-sans text-xs text-[#E2DDD5] leading-relaxed font-light">
              Strictly buffered formulations designed to respect and restore the skin's natural acidic mantle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3 }}
            className="space-y-4 p-4 rounded-[3px] transition-colors hover:bg-[#222523]"
          >
            <Clock className="w-6 h-6 text-[#A8B5CF]" strokeWidth={1.5} />
            <h3 className="font-mono-spec text-xs tracking-widest text-[#FAF9F7] uppercase font-semibold">
              Simple daily routines
            </h3>
            <p className="font-sans text-xs text-[#E2DDD5] leading-relaxed font-light">
              Cleanse, correct, and protect in under 3 minutes per day. High adherence yields high results.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
