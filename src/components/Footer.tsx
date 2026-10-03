import React from 'react';
import { NavView } from '../types';
import { AegisMonogram } from './AegisMonogram';
import { ShieldCheck, Droplets } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: NavView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-[#1A1C1B] text-[#FAF9F7] pt-20 pb-12 border-t border-[#2A2E2B] text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[4px] bg-[#222623] text-[#FAF9F7] flex items-center justify-center shadow-xs border border-[#3E453D]">
                <AegisMonogram size={20} color="#FAF9F7" accentColor="#D3C9B8" />
              </div>
              <div>
                <h2 className="font-serif-editorial text-2xl tracking-widest text-[#FAF9F7] uppercase leading-none">
                  AEGIS MEN
                </h2>
                <p className="font-mono-spec text-[9.5px] tracking-[0.28em] uppercase text-[#8C9B86] font-semibold pt-1">
                  SCIENCE &times; SIMPLICITY
                </p>
              </div>
            </div>
            <p className="text-xs font-sans text-[#9EA59F] max-w-sm leading-relaxed font-light">
              Physiological precision dermatology engineered specifically for male dermal architecture. Formulated at epidermal pH 5.0–5.5 with zero synthetic fragrance.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono-spec text-[#8C9B86] font-semibold pt-1">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% INCI Disclosure
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5" />
                Fragrance-Free
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-mono-spec text-xs tracking-widest text-[#8C9B86] uppercase font-bold">
              SHOP
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#D8DED8]">
              <li>
                <button
                  onClick={() => { setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  Bestsellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  Bundles & Protocols
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono-spec text-xs tracking-widest text-[#8C9B86] uppercase font-bold">
              EXPLORE
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#D8DED8]">
              <li>
                <button
                  onClick={() => { setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  Shop Skincare
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('routines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  Routines & Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('science'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  Dermal Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('journal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  Research Journal
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono-spec text-xs tracking-widest text-[#8C9B86] uppercase font-bold">
              SUPPORT
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#D8DED8]">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      document.getElementById('aegis-home-faq')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  Clinical FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#FAF9F7] transition-colors cursor-pointer"
                >
                  About AEGIS
                </button>
              </li>
              <li>
                <span className="text-[#9EA59F]">
                  Standard Delivery: 2–4 Business Days
                </span>
              </li>
              <li>
                <span className="text-[#9EA59F]">
                  Contact: clinic@aegismen.in
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2A2E2B] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono-spec text-[#7A827B] uppercase tracking-widest">
          <p>&copy; 2026 AEGIS MEN. ALL RIGHTS RESERVED. PHYSIOLOGICAL PRECISION DERMATOLOGY.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#FAF9F7] transition-colors cursor-default">Privacy Protocol</span>
            <span className="hover:text-[#FAF9F7] transition-colors cursor-default">Terms of Formulation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
