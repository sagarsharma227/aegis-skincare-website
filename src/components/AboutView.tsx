import React from 'react';
import { NavView } from '../types';
import { ArrowRight } from 'lucide-react';
import { AegisMonogram } from './AegisMonogram';
import { motion } from 'motion/react';

interface AboutViewProps {
  setCurrentView: (view: NavView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentView }) => {
  return (
    <div className="bg-[#F2EFE9] min-h-screen py-12 lg:py-20 text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] text-[#526442] text-[10px] font-mono-spec tracking-[0.2em] uppercase">
            <AegisMonogram size={14} color="#526442" />
            <span>EST. 2024 · DELHI, INDIA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-editorial font-normal text-[#1A1C1B] leading-tight">
            Why AEGIS exists.
          </h1>

          <div className="space-y-4 text-base sm:text-lg text-[#5E645F] leading-relaxed font-serif-editorial">
            <p className="text-[#1A1C1B] font-medium">
              Skincare became unnecessarily complicated.
            </p>
            <p>
              AEGIS was built around a simpler idea:
            </p>
            <ul className="space-y-1.5 text-[#1A1C1B] pl-4 border-l-2 border-[#526442]">
              <li>— Protect the barrier.</li>
              <li>— Target what matters.</li>
              <li>— Stay consistent.</li>
            </ul>
            <p>
              For years, men were offered two extremes: aggressive 3-in-1 body washes loaded with synthetic fragrances and high-alkaline sulfates, or overwhelming 10-step cosmetic routines that few people have the time or interest to maintain.
            </p>
            <p>
              We formulated AEGIS around the everyday biological realities of male skin—higher sebum production, regular shaving friction, and environmental sun exposure—using evidence-informed active molecules at physiological pH 5.5.
            </p>
          </div>
        </motion.div>

        {/* 3 Core Architectural Standards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="p-6 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] space-y-2 shadow-xs"
          >
            <span className="text-[10px] font-mono-spec text-[#526442] font-bold uppercase">STANDARD 01</span>
            <h3 className="font-serif-editorial text-lg text-[#1A1C1B]">100% Disclosed INCI</h3>
            <p className="text-xs text-[#5E645F] leading-relaxed">
              Every active percentage is clearly stated on the front of the bottle. No proprietary mystery blends.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="p-6 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] space-y-2 shadow-xs"
          >
            <span className="text-[10px] font-mono-spec text-[#526442] font-bold uppercase">STANDARD 02</span>
            <h3 className="font-serif-editorial text-lg text-[#1A1C1B]">0% Synthetic Perfume</h3>
            <p className="text-xs text-[#5E645F] leading-relaxed">
              Formulated completely fragrance-free to prevent stinging and allergic contact dermatitis on post-shave skin.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="p-6 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] space-y-2 shadow-xs"
          >
            <span className="text-[10px] font-mono-spec text-[#526442] font-bold uppercase">STANDARD 03</span>
            <h3 className="font-serif-editorial text-lg text-[#1A1C1B]">3-Minute Protocol</h3>
            <p className="text-xs text-[#5E645F] leading-relaxed">
              Designed to take no more than 90 seconds in the morning and 60 seconds at night.
            </p>
          </motion.div>
        </motion.div>

        {/* Founder Profile: Arifa Naved (Old Delhi) - No Pictures */}
        <section id="founder-profile" className="p-8 sm:p-12 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] space-y-8 shadow-xs">
          <div className="space-y-3 border-b border-[#F2EFE9] pb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F2EFE9] border border-[#D5CEC2] rounded-[3px] text-[#526442] text-[10px] font-mono-spec tracking-widest uppercase">
              <span>FOUNDER & CHIEF FORMULATION SCIENTIST</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h2 className="text-2xl sm:text-4xl font-serif-editorial text-[#1A1C1B]">
                Arifa Naved
              </h2>
              <span className="text-xs sm:text-sm font-mono-spec text-[#5E645F]">
                Origin: Old Delhi, India · Formulation Lab Lead
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm text-[#5E645F] leading-relaxed">
              <p className="font-serif-editorial text-lg text-[#1A1C1B] leading-snug">
                Born and raised in the historic heart of Old Delhi, Arifa Naved grew up immersed in the heritage apothecary trade before pursuing specialized scientific training in molecular pharmacology and cosmetic chemistry.
              </p>
              <p>
                Frustrated by a male grooming market defined by harsh sulfates, stinging alcohol splashes, and masking artificial fragrances, Arifa set out to establish AEGIS MEN as a rigorous, clinical-grade alternative. Her core philosophy centers on physiological compatibility: engineering active emulsions that reinforce the stratum corneum rather than stripping it.
              </p>
              <p>
                Working from our Delhi formulation studio, Arifa directly oversees every prototype batch, testing active delivery, photostability in high-heat urban climates, and tolerance on shave-irritated skin.
              </p>
              <blockquote className="border-l-2 border-[#526442] pl-4 italic font-serif-editorial text-[#1A1C1B] text-base sm:text-lg my-4">
                "Formulation is an architecture of subtraction. Every active ingredient must have an indisputable physiological purpose, buffered to the exact cellular pH 5.5 of male skin."
              </blockquote>
            </div>

            {/* Fake Qualifications & Credentials */}
            <div className="lg:col-span-5 bg-[#F2EFE9] border border-[#D5CEC2] rounded-[4px] p-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono-spec text-[#526442] font-bold uppercase tracking-wider block">
                  QUALIFICATIONS & CLINICAL ACCREDITATION
                </span>
                <h4 className="font-serif-editorial text-base text-[#1A1C1B]">
                  Cosmetic Chemistry & Dermal Science
                </h4>
              </div>

              <ul className="space-y-3.5 text-xs text-[#1A1C1B]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#526442] font-mono-spec font-semibold text-[11px] mt-0.5">01</span>
                  <div>
                    <span className="font-semibold block text-[#1A1C1B]">M.Tech in Cosmetic Chemistry & Molecular Pharmacology</span>
                    <span className="text-[#5E645F] text-[11px]">Delhi Institute of Pharmaceutical Sciences & Research (DIPSAR), New Delhi</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#526442] font-mono-spec font-semibold text-[11px] mt-0.5">02</span>
                  <div>
                    <span className="font-semibold block text-[#1A1C1B]">Fellowship in Male Epidermal Barrier Restoration</span>
                    <span className="text-[#5E645F] text-[11px]">International Society of Dermal Formulation Scientists</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#526442] font-mono-spec font-semibold text-[11px] mt-0.5">03</span>
                  <div>
                    <span className="font-semibold block text-[#1A1C1B]">Principal Researcher in Photostable Lipid Emulsions</span>
                    <span className="text-[#5E645F] text-[11px]">Ex-Head of Emulsion Stability, South Asian Derma-Cosmetics Lab</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#526442] font-mono-spec font-semibold text-[11px] mt-0.5">04</span>
                  <div>
                    <span className="font-semibold block text-[#1A1C1B]">Lead Formulation Architect & Author</span>
                    <span className="text-[#5E645F] text-[11px]">"Subtractive Formulation Protocols in High-Humidity Male Epidermis" (2023)</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#526442] font-mono-spec font-semibold text-[11px] mt-0.5">05</span>
                  <div>
                    <span className="font-semibold block text-[#1A1C1B]">Certification in Fragrance-Free Physiological Buffering</span>
                    <span className="text-[#5E645F] text-[11px]">Board of Clean Cosmetic Pharmacology, New Delhi</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Formulation Architecture Callout */}
        <div className="p-8 sm:p-10 bg-[#1A1C1B] text-[#FAF9F7] border border-[#3E453D] rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] font-mono-spec text-[#8C9B86] uppercase tracking-widest block">
              EVIDENCE-INFORMED DAILY PROTOCOLS
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-editorial text-[#FAF9F7]">
              Engineered for Men's Epidermal Barrier
            </h2>
            <p className="text-xs text-[#E2DDD5]">
              100% INCI transparency, physiological pH 5.5 balance, and zero synthetic fragrance.
            </p>
          </div>
          <button
            id="about-explore-shop-btn"
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#526442] hover:bg-[#3E453D] text-[#FAF9F7] text-xs font-mono-spec uppercase tracking-widest font-semibold rounded-[3px] flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
          >
            <span>Explore All Formulations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

