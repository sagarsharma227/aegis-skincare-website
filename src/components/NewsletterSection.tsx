import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AegisMonogram } from './AegisMonogram';
import { Check, ArrowRight, Mail } from 'lucide-react';

interface NewsletterSectionProps {
  onSuccessToast?: (msg: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSuccessToast }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter an email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate clinical dispatch subscription
    setTimeout(() => {
      setStatus('success');
      try {
        const stored = JSON.parse(localStorage.getItem('aegis_subscribers') || '[]');
        if (!stored.includes(cleanEmail)) {
          stored.push(cleanEmail);
          localStorage.setItem('aegis_subscribers', JSON.stringify(stored));
        }
      } catch {}

      if (onSuccessToast) {
        onSuccessToast('Enrolled in AEGIS Clinical Dispatches.');
      }
    }, 600);
  };

  const handleReset = () => {
    setEmail('');
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <motion.section
      id="aegis-newsletter-subscription"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-[#E2DDD5] bg-[#FAF9F7] py-20 lg:py-24 text-left relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] text-[#526442] text-[10px] font-mono-spec tracking-[0.25em] uppercase font-semibold">
            <AegisMonogram size={14} color="#526442" />
            <span>DISPATCHES & FORMULATION ARCHIVE</span>
          </div>

          {/* Heading & Context */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif-editorial font-normal text-[#1A1C1B] leading-tight">
              Clinical Dispatches.
            </h2>
            <p className="text-xs sm:text-sm text-[#5E645F] leading-relaxed max-w-lg mx-auto">
              Periodic monographs on stratum corneum physiology, small-batch releases, and transparent ingredient efficacy studies. No marketing noise.
            </p>
          </div>

          {/* Interactive Form / Confirmation */}
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="subscribed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-[#F2EFE9] border border-[#526442] rounded-[4px] space-y-3 max-w-md mx-auto text-center shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#526442] text-[#FAF9F7] flex items-center justify-center mx-auto">
                  <Check className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-serif-editorial text-[#1A1C1B] font-medium">
                    Subscription Confirmed
                  </h3>
                  <p className="text-xs font-mono-spec text-[#526442]">
                    {email} enrolled in laboratory dispatch list
                  </p>
                  <p className="text-[11px] text-[#5E645F] pt-1">
                    Vol. 01 on lipid barrier restoration has been dispatched to your inbox.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] font-mono-spec text-[#5E645F] hover:text-[#1A1C1B] underline uppercase tracking-wider cursor-pointer pt-2 inline-block"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-2 text-left"
                noValidate
              >
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className="relative flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Enter your email address"
                      required
                      disabled={status === 'loading'}
                      className="w-full px-4 py-3 bg-[#FAF9F7] border border-[#E2DDD5] text-xs font-mono-spec text-[#1A1C1B] placeholder:text-[#5E645F]/60 rounded-[3px] focus:outline-none focus:border-[#526442] focus:ring-1 focus:ring-[#526442] transition-all disabled:opacity-50"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    disabled={status === 'loading'}
                    className="px-6 py-3 bg-[#1A1C1B] hover:bg-[#526442] text-[#FAF9F7] font-mono-spec text-xs uppercase tracking-widest font-semibold rounded-[3px] transition-colors cursor-pointer whitespace-nowrap shadow-xs disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
                  >
                    {status === 'loading' ? (
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span>Join</span>
                    )}
                  </motion.button>
                </div>

                {errorMessage && (
                  <p className="text-[11px] font-mono-spec text-[#A65F5F] pl-1 pt-1">
                    {errorMessage}
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] font-mono-spec text-[#5E645F]/75 pt-2 px-1">
                  <span>Frequency: 1–2 research dispatches monthly</span>
                  <span>Unsubscribe anytime with 1-click</span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};
