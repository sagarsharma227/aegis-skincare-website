
import React from 'react';
import { NavView } from '../types';

interface FooterProps {
  setCurrentView: (view: NavView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-[#1A1C1B] text-[#FAF9F7] pt-20 pb-10 border-t border-[#3E453D]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-serif-editorial text-2xl tracking-widest text-[#FAF9F7] uppercase">
              AEGIS MEN
            </h2>
            <p className="font-mono-spec text-[10px] tracking-[0.3em] uppercase text-[#526442] font-semibold">
              SCIENCE &times; SIMPLICITY
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-mono-spec text-xs tracking-widest text-[#8C9B86] uppercase font-bold">
              SHOP
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#E2DDD5] font-light">
              <li>
                <button onClick={() => { setCurrentView('shop'); window.scrollTo(0,0); }} className="hover:text-[#FAF9F7] transition-colors cursor-pointer">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('shop'); window.scrollTo(0,0); }} className="hover:text-[#FAF9F7] transition-colors cursor-pointer">
                  Bestsellers
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('shop'); window.scrollTo(0,0); }} className="hover:text-[#FAF9F7] transition-colors cursor-pointer">
                  Bundles
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono-spec text-xs tracking-widest text-[#8C9B86] uppercase font-bold">
              EXPLORE
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#E2DDD5] font-light">
              <li>
                <button onClick={() => { setCurrentView('shop'); window.scrollTo(0,0); }} className="hover:text-[#FAF9F7] transition-colors cursor-pointer">
                  Shop Skincare
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('routines'); window.scrollTo(0,0); }} className="hover:text-[#FAF9F7] transition-colors cursor-pointer">
                  Routines
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('science'); window.scrollTo(0,0); }} className="hover:text-[#FAF9F7] transition-colors cursor-pointer">
                  Science
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('journal'); window.scrollTo(0,0); }} className="hover:text-[#FAF9F7] transition-colors cursor-pointer">
                  Journal
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono-spec text-xs tracking-widest text-[#8C9B86] uppercase font-bold">
              SUPPORT
            </h3>
            <ul className="space-y-3 font-sans text-xs text-[#E2DDD5] font-light">
              <li>
                <button onClick={() => { setCurrentView('about'); window.scrollTo(0,0); }} className="hover:text-[#FAF9F7] transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button className="hover:text-[#FAF9F7] transition-colors cursor-not-allowed opacity-70">
                  Shipping
                </button>
              </li>
              <li>
                <button className="hover:text-[#FAF9F7] transition-colors cursor-not-allowed opacity-70">
                  Returns
                </button>
              </li>
              <li>
                <button className="hover:text-[#FAF9F7] transition-colors cursor-not-allowed opacity-70">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#3E453D] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono-spec text-[#5E645F] uppercase tracking-widest">
          <p>&copy; 2026 AEGIS MEN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <button className="hover:text-[#E2DDD5] transition-colors cursor-not-allowed">Privacy</button>
            <button className="hover:text-[#E2DDD5] transition-colors cursor-not-allowed">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
