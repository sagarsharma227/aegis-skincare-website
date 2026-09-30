import React, { useState } from 'react';
import { Product, QuizDiagnosis } from '../types';
import { QUIZ_QUESTIONS, calculateQuizResults } from '../data/quizQuestions';
import { PRODUCTS } from '../data/products';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Check, ShoppingBag, ShieldCheck, Sun, Moon, AlertCircle } from 'lucide-react';
import { AegisMonogram } from './AegisMonogram';
import { ProductPackagingView } from './ProductPackagingView';
import { motion, AnimatePresence } from 'motion/react';

interface RoutineQuizProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onAddMultipleToCart: (products: Product[]) => void;
  onSelectProduct: (productId: string) => void;
  onShowToast: (msg: string) => void;
  isEmbedded?: boolean;
}

export const RoutineQuiz: React.FC<RoutineQuizProps> = ({
  onAddToCart,
  onAddMultipleToCart,
  onSelectProduct,
  onShowToast,
  isEmbedded = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('aegis_quiz_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [diagnosis, setDiagnosis] = useState<QuizDiagnosis | null>(() => {
    try {
      const saved = localStorage.getItem('aegis_quiz_diagnosis');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleSelectOption = (questionId: number, optionId: string) => {
    const updatedAnswers = { ...answers, [questionId]: optionId };
    setAnswers(updatedAnswers);
    try {
      localStorage.setItem('aegis_quiz_answers', JSON.stringify(updatedAnswers));
    } catch {}

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final profile
      setIsCalculating(true);
      setTimeout(() => {
        const result = calculateQuizResults(updatedAnswers);
        setDiagnosis(result);
        try {
          localStorage.setItem('aegis_quiz_diagnosis', JSON.stringify(result));
        } catch {}
        setIsCalculating(false);
      }, 800);
    }
  };

  const handleReset = () => {
    setDiagnosis(null);
    setCurrentStep(0);
    setAnswers({});
    try {
      localStorage.removeItem('aegis_quiz_diagnosis');
      localStorage.removeItem('aegis_quiz_answers');
    } catch {}
  };

  const recommendedProducts = diagnosis
    ? (diagnosis.recommendedProductIds
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter(Boolean) as Product[])
    : [];

  const totalPrice = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  const discountAmount = recommendedProducts.length >= 3 ? 348 : 0;
  const finalPrice = totalPrice - discountAmount;

  const question = QUIZ_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div
      id={isEmbedded ? 'home-diagnostic-quiz' : undefined}
      className={`${
        isEmbedded
          ? 'bg-[#FAF9F7] py-16 sm:py-24 border-b border-[#E2DDD5]'
          : 'bg-[#F2EFE9] min-h-screen py-12 lg:py-20'
      } text-left`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] text-[#526442] text-[10px] font-mono-spec tracking-[0.2em] uppercase font-semibold">
            <AegisMonogram size={14} color="#526442" />
            <span>AEGIS DIAGNOSTIC MATRIX</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif-editorial font-normal text-[#1A1C1B]">
            Find Your Everyday Routine
          </h1>
          <p className="text-xs sm:text-sm text-[#5E645F] max-w-lg mx-auto leading-relaxed">
            Answer 6 quick questions about your skin, shaving habits, and daily sun exposure to receive a custom 3-minute regimen.
          </p>
        </motion.div>

        {/* Calculating State */}
        {isCalculating && (
          <div className="p-12 sm:p-16 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] text-center space-y-4 animate-pulse">
            <div className="w-10 h-10 border-2 border-[#526442] border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="font-serif-editorial text-2xl text-[#1A1C1B]">
              Synthesizing Skin Profile...
            </h2>
            <p className="text-xs font-mono-spec text-[#5E645F]">
              Matching active molecules to your oil production and shaving frequency.
            </p>
          </div>
        )}

        {/* Quiz Results Screen */}
        {!isCalculating && diagnosis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Top Profile Card */}
            <div className="p-6 sm:p-8 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] space-y-6 text-left shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E2DDD5] gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-spec text-[#526442] font-bold uppercase tracking-widest block">
                    BASED ON YOUR ANSWERS · CUSTOM RECOMMENDATION
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif-editorial font-medium text-[#1A1C1B]">
                    {diagnosis.skinType}
                  </h2>
                  <p className="text-xs text-[#5E645F]">{diagnosis.mainIssue}</p>
                </div>

                {/* 3 Metric Badges */}
                <div className="flex gap-2">
                  <div className="p-2.5 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] text-center font-mono-spec">
                    <span className="text-lg font-bold text-[#526442] block">{diagnosis.barrierScore}/100</span>
                    <span className="text-[9px] text-[#5E645F] uppercase block">Barrier Health</span>
                  </div>
                  <div className="p-2.5 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] text-center font-mono-spec">
                    <span className="text-lg font-bold text-[#1A1C1B] block">{diagnosis.oilScore || 65}/100</span>
                    <span className="text-[9px] text-[#5E645F] uppercase block">Sebum Load</span>
                  </div>
                  <div className="p-2.5 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] text-center font-mono-spec">
                    <span className="text-lg font-bold text-[#1A1C1B] block">{diagnosis.sensitivityScore || 50}/100</span>
                    <span className="text-[9px] text-[#5E645F] uppercase block">Sensitivity</span>
                  </div>
                </div>
              </div>

              {/* Priority Focus */}
              {diagnosis.priorityTitle && (
                <div className="p-4 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] space-y-1">
                  <span className="text-[10px] font-mono-spec text-[#526442] font-bold uppercase block">
                    PRIMARY BIOLOGICAL PRIORITY: {diagnosis.priorityTitle}
                  </span>
                  <p className="text-xs text-[#1A1C1B] leading-relaxed">
                    {diagnosis.priorityDescription}
                  </p>
                </div>
              )}

              {/* Recommended Actives */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono-spec font-bold text-[#1A1C1B] uppercase block">
                  Recommended Active Molecules:
                </span>
                <div className="flex flex-wrap gap-2">
                  {diagnosis.targetActives.map((act, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#F2EFE9] border border-[#E2DDD5] text-[#526442] text-xs font-mono-spec rounded-[2px]"
                    >
                      ✓ {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* AM / PM Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Morning */}
                <div className="p-4 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] space-y-3">
                  <div className="flex items-center gap-2 font-mono-spec text-xs font-bold text-[#526442] uppercase">
                    <Sun className="w-3.5 h-3.5" />
                    <span>MORNING PROTOCOL (~90s)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {diagnosis.amSteps.map((step, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <strong className="text-[#1A1C1B] block text-[11px] font-mono-spec">{step.step}: {step.product}</strong>
                        <p className="text-[#5E645F] text-[11px]">{step.instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div className="p-4 bg-[#F2EFE9] border border-[#E2DDD5] rounded-[3px] space-y-3">
                  <div className="flex items-center gap-2 font-mono-spec text-xs font-bold text-[#1A1C1B] uppercase">
                    <Moon className="w-3.5 h-3.5" />
                    <span>EVENING PROTOCOL (~60s)</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {diagnosis.pmSteps.map((step, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <strong className="text-[#1A1C1B] block text-[11px] font-mono-spec">{step.step}: {step.product}</strong>
                        <p className="text-[#5E645F] text-[11px]">{step.instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Guidance Note */}
              {diagnosis.guidanceNote && (
                <div className="p-3 bg-[#F2EFE9] rounded-[3px] border border-[#E2DDD5] text-xs font-mono-spec text-[#5E645F]">
                  💡 <strong>Formulator Note:</strong> {diagnosis.guidanceNote}
                </div>
              )}

              {/* Expectation */}
              <div className="pt-2 text-xs text-[#5E645F] italic leading-relaxed border-t border-[#E2DDD5]">
                "{diagnosis.clinicalExpectation}"
              </div>
            </div>

            {/* Recommended Products Showcase */}
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-editorial text-xl font-medium text-[#1A1C1B]">
                  Your Recommended Regimen ({recommendedProducts.length} Formulations)
                </h3>
                <button
                  id="quiz-retake-btn"
                  onClick={handleReset}
                  className="text-xs font-mono-spec text-[#5E645F] hover:text-[#1A1C1B] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake Assessment</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] space-y-3 flex flex-col justify-between hover:border-[#526442] transition-colors"
                  >
                    <div
                      onClick={() => onSelectProduct(prod.id)}
                      className="cursor-pointer space-y-2"
                    >
                      <div className="aspect-square bg-[#151714] rounded-[2px] overflow-hidden flex items-center justify-center">
                        <ProductPackagingView product={prod} size="sm" className="h-full border-none shadow-none" />
                      </div>
                      <span className="text-[9px] font-mono-spec text-[#526442] font-bold uppercase block">
                        {prod.stepNumber}
                      </span>
                      <h4 className="text-xs font-bold text-[#1A1C1B] leading-snug">{prod.name}</h4>
                      <p className="text-[10px] text-[#5E645F] leading-relaxed">
                        {prod.whyItExists ? prod.whyItExists.slice(0, 95) + '...' : prod.shortDescription}
                      </p>
                      <span className="font-mono-spec font-semibold text-xs text-[#1A1C1B] block">₹{prod.price.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      onClick={() => onAddToCart(prod)}
                      className="w-full py-2 bg-[#526442] hover:bg-[#394536] text-[#FAF9F7] text-[11px] font-mono-spec uppercase tracking-wider rounded-[3px] transition-colors font-semibold"
                    >
                      + Add Step
                    </button>
                  </div>
                ))}
              </div>

              {/* Bulk Add Banner */}
              <div className="p-6 bg-[#1A1C1B] text-[#FAF9F7] border border-[#3E453D] rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-left">
                  <span className="text-[9px] font-mono-spec text-[#8C9B86] uppercase tracking-widest block">
                    COMPLETE RECOMMENDED SYSTEM
                  </span>
                  <div className="text-lg font-serif-editorial text-[#FAF9F7]">
                    Complete Routine Protocol · ₹{finalPrice.toLocaleString('en-IN')}{' '}
                    {discountAmount > 0 && (
                      <span className="text-xs text-[#8C9B86] line-through font-mono-spec font-normal">₹{totalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>
                <button
                  id="quiz-add-all-btn"
                  onClick={() => {
                    onAddMultipleToCart(recommendedProducts);
                    onShowToast('Recommended routine added to bag with routine savings.');
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#526442] hover:bg-[#3E453D] text-[#FAF9F7] text-xs font-mono-spec uppercase tracking-widest font-semibold rounded-[3px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Complete Routine to Bag</span>
                </button>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] font-mono-spec text-[#5E645F] text-center pt-2">
                * Note: Based on your answers. This assessment provides general cosmetic skincare guidance and is not a medical diagnosis. Formulations are 100% fragrance-free and physiological pH balanced.
              </p>
            </div>
          </motion.div>
        )}

        {/* Active Quiz Step */}
        {!isCalculating && !diagnosis && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FAF9F7] border border-[#E2DDD5] rounded-[4px] p-6 sm:p-10 space-y-8 text-left shadow-xs"
            >
              {/* Progress Bar with 01 / 07 formatting */}
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-mono-spec text-[#5E645F]">
                  <span className="font-bold text-[#526442] uppercase tracking-wider">
                    {String(currentStep + 1).padStart(2, '0')} / {String(QUIZ_QUESTIONS.length).padStart(2, '0')}
                  </span>
                  <span>{progressPercent}% Completed</span>
                </div>
                <div className="w-full h-1 bg-[#F2EFE9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#526442] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Details */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-serif-editorial font-normal text-[#1A1C1B] leading-snug">
                  {question.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5E645F]">
                  {question.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
              {question.options.map((opt) => {
                const isSelected = answers[question.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`quiz-option-${opt.id}`}
                    onClick={() => handleSelectOption(question.id, opt.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[4px] border transition-all duration-200 flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#F2EFE9] border-[#526442]'
                        : 'bg-[#FAF9F7] border-[#E2DDD5] hover:border-[#526442]/60 hover:bg-[#F2EFE9]/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-[#1A1C1B] font-serif-editorial">
                        {opt.label}
                      </div>
                      <p className="text-xs text-[#5E645F] leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    {opt.tag && (
                      <span className="shrink-0 text-[10px] font-mono-spec px-2.5 py-1 bg-[#F2EFE9] text-[#526442] rounded-[2px] font-medium uppercase">
                        {opt.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation back */}
            {currentStep > 0 && (
              <div className="pt-2">
                <button
                  id="quiz-prev-btn"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs font-mono-spec text-[#5E645F] hover:text-[#1A1C1B] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Question</span>
                </button>
              </div>
            )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
