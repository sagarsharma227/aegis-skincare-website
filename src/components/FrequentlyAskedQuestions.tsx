import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Sparkles, BookOpen, ShieldCheck, Search, ArrowRight, MessageSquare } from 'lucide-react';
import { NavView } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  category: 'routines' | 'ingredients' | 'shaving' | 'results';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  keyActives?: string[];
  protocolTip?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  // 1. ROUTINES & PROTOCOLS
  {
    id: 'faq-3-minute-routine',
    category: 'routines',
    categoryLabel: 'ROUTINES & PROTOCOLS',
    question: 'How does a 3-minute morning routine actually protect against environmental damage?',
    shortAnswer: 'By following a physiological sequence: non-stripping cleanse, weightless hydration, and broad-spectrum photoprotection.',
    detailedAnswer: [
      'Male facial skin faces three primary daily stressors: excess sebum flux, urban particulate accumulation, and uninterrupted UVA radiation that penetrates both cloud cover and architectural glass.',
      'Our 3-minute protocol focuses strictly on non-negotiable dermal physiology: Step 01 (WASH) clears overnight oxidized lipids without disrupting the acid mantle (pH 5.5); Step 02 (REPAIR) delivers multi-molecular humectants and lipids that bind water into the stratum corneum; Step 03 (SHIELD SPF 50) forms an invisible, weightless broad-spectrum barrier that absorbs excess oil with porous silica spheres.',
      'Clinical studies show that 100% daily compliance with a streamlined 3-step regimen achieves superior barrier recovery compared to elaborate 8-step routines that suffer from 80% abandonment.'
    ],
    keyActives: ['Apple Amino Acids', 'Multi-Weight Hyaluronic Acid', 'Tinosorb S', 'Uvinul A Plus'],
    protocolTip: 'AM Sequence: 30s Cleanse → 15s Moisturizer → 30s Shield SPF 50. Total time: under 90 seconds.'
  },
  {
    id: 'faq-layering-clear-repair',
    category: 'routines',
    categoryLabel: 'ROUTINES & PROTOCOLS',
    question: 'When should I apply active serums like BHA (AEGIS CLEAR) or Ceramides (AEGIS REPAIR)?',
    shortAnswer: 'Apply serums directly after cleansing onto clean skin, prior to heavier moisturizers or daytime sunscreen.',
    detailedAnswer: [
      'Active serums possess smaller molecular profiles designed for rapid trans-epidermal penetration. If applied over a heavy moisturizer or sunscreen, their penetration coefficient drops by over 70%.',
      'For AEGIS CLEAR (2% BHA + 10% Niacinamide): Dispense 2–3 drops onto clean, dry skin. Allow 20 seconds for the oil-soluble salicylic acid to enter the follicular infundibulum before locking in with hydration. Use in the morning to prevent midday shine, or at night for deep pore clearance.',
      'For AEGIS REPAIR (3:1:1 Ceramides + Madecassoside): Apply whenever skin feels tight, sensitized, or immediately following shaving. The biomimetic lamellar lipids integrate into compromised cell bilayers.'
    ],
    keyActives: ['2.0% Salicylic Acid', '10.0% Niacinamide', '3:1:1 Ceramides', 'Madecassoside'],
    protocolTip: 'Rule of thumb: Layer from thinnest liquid consistency to densest emulsion.'
  },
  {
    id: 'faq-sunscreen-indoor-beards',
    category: 'routines',
    categoryLabel: 'ROUTINES & PROTOCOLS',
    question: 'Why is daily broad-spectrum SPF 50 necessary even indoors or if I have a beard?',
    shortAnswer: 'UVA photons penetrate architectural glass and clouds year-round, while facial stubble provides negligible UV defense (UPF 1.5–3).',
    detailedAnswer: [
      'While UVB rays (which cause painful sunburns) are blocked by standard window glass, UVA rays (320–400 nm) account for 95% of ultraviolet radiation and penetrate deep into the reticular dermis uninterrupted, generating matrix metalloproteinases (MMPs) that dissolve collagen for 72 hours.',
      'Spectrophotometric studies reveal that trimmed facial hair and 5 o\'clock shadows offer an average Ultraviolet Protection Factor of only UPF 1.5 to 3.0—far below the dermatological minimum of UPF 30–50.',
      'AEGIS SHIELD SPF 50 utilizes transparent organic hybrid filters (Tinosorb S, Uvinul A Plus) in an ultra-sheer water-gel emulsion that absorbs within 20 seconds, leaving zero white chalky residue trapped in beard hair or along hairline boundaries.'
    ],
    keyActives: ['Tinosorb S', 'Uvinul A Plus', 'Spherical Silica', 'Ectoin 1.0%'],
    protocolTip: 'Apply 2 finger-lengths evenly across face, ears, and exposed neck 15 minutes before stepping outdoors.'
  },
  // 2. SHAVING & BARRIER CARE
  {
    id: 'faq-shaving-skincare-routine',
    category: 'shaving',
    categoryLabel: 'SHAVING & BARRIER CARE',
    question: 'How should I adapt my skincare routine on days when I shave with a razor?',
    shortAnswer: 'Avoid aggressive exfoliants immediately post-shave; prioritize physiological pH restoration and lipid replenishment.',
    detailedAnswer: [
      'A multi-blade razor stroke removes up to 2–3 superficial layers of anucleated corneocytes alongside the facial hair, causing an immediate 35–50% spike in transepidermal water loss (TEWL) and microscopic surface fissures.',
      'Never apply high-proof alcohol aftershaves, which coagulate native barrier proteins and spark neurogenic stinging via TRPV1 nociceptor activation.',
      'On shave days: Cleanse with gentle lukewarm water and AEGIS WASH or CALM. Shave with a sharp, clean blade using grain-aligned strokes. Pat dry gently—never rub—and immediately apply AEGIS AFTER or AEGIS REPAIR to reconstruct the lipid matrix before finishing with daytime SPF.'
    ],
    keyActives: ['Panthenol (Pro-Vitamin B5)', 'Ectoin', 'Centella Asiatica', 'Phytosphingosine'],
    protocolTip: 'Do not use concentrated chemical exfoliants (like high-strength AHA peel pads) within 4 hours of wet shaving.'
  },
  // 3. ACTIVE INGREDIENTS
  {
    id: 'faq-niacinamide-bha-combination',
    category: 'ingredients',
    categoryLabel: 'ACTIVE INGREDIENTS',
    question: 'Can I use Niacinamide together with Salicylic Acid (BHA) without causing irritation?',
    shortAnswer: 'Yes, they are highly synergistic when properly formulated at stabilized dermal pH ranges.',
    detailedAnswer: [
      'Niacinamide (Vitamin B3) and Salicylic Acid (BHA) target complementary biological pathways of follicular congestion: BHA is lipophilic, meaning it cuts through surface sebum to dissolve sticky dead cells inside the pore lining.',
      'Niacinamide works at the sebocyte level to moderate baseline lipid synthesis, while concurrently stimulating natural ceramide production to soothe redness.',
      'In AEGIS CLEAR, both actives are co-formulated at an optimal bio-compatible pH of 4.0–4.2 alongside 1.0% Zinc PCA and Centella Asiatica, eliminating the flushing or destabilization that historically occurred with older, unbuffered formulations.'
    ],
    keyActives: ['Salicylic Acid (BHA)', 'Niacinamide (Vitamin B3)', 'Zinc PCA'],
    protocolTip: 'Suitable for daily AM and PM use. Start 3 times per week if you have reactive or easily flushed skin.'
  },
  {
    id: 'faq-3-1-1-ceramide-ratio',
    category: 'ingredients',
    categoryLabel: 'ACTIVE INGREDIENTS',
    question: "What does the '3:1:1 Biomimetic Lipid Ratio' mean and why is it essential?",
    shortAnswer: 'It replicates the exact equimolar proportion of ceramides, cholesterol, and free fatty acids found in healthy human skin.',
    detailedAnswer: [
      'The stratum corneum is structured like "bricks and mortar": protein-rich corneocyte cells (bricks) suspended in a continuous multi-lamellar lipid matrix (mortar).',
      'Pioneering dermal biochemistry by Dr. Peter Elias demonstrated that this lipid matrix is naturally composed of approximately 50% ceramides, 25% cholesterol, and 15% free fatty acids—an approximate 3:1:1 equimolar ratio.',
      'When topical formulations provide only isolated ceramides without matching cholesterol and fatty acids, barrier repair is incomplete. Supplying the precise 3:1:1 ratio accelerates barrier reconstitution by up to 300% within 24 hours of barrier disruption.'
    ],
    keyActives: ['Ceramide NP', 'Ceramide AP', 'Ceramide EOP', 'Cholesterol', 'Free Fatty Acids'],
    protocolTip: 'Found in AEGIS REPAIR, AEGIS RECOVER, and AEGIS CALM for deep stratum corneum healing.'
  },
  {
    id: 'faq-formulation-standards',
    category: 'ingredients',
    categoryLabel: 'ACTIVE INGREDIENTS',
    question: 'Are AEGIS formulations free from fragrances, drying alcohols, and harsh sulfates?',
    shortAnswer: '100% yes. We strictly exclude synthetic fragrances, essential oils, denatured ethanol, and SLS.',
    detailedAnswer: [
      'Fragrance molecules and volatile essential oils (e.g., lavender, citrus, eucalyptus oils) are the leading cause of cosmetic allergic contact dermatitis in dermatological patch tests.',
      'All AEGIS products are 100% fragrance-free, dye-free, paraben-free, and formulated without denatured alcohol (alcohol denat / ethanol).',
      'Our cleansers utilize biomimetic amino-acid surfactant complexes (such as sodium cocoyl glycinate and apple amino acids) strictly buffered to physiological epidermal pH 5.0–5.5 to preserve the skin\'s natural acid mantle.'
    ],
    keyActives: ['pH 5.0–5.5 Buffer', 'Apple Amino Acids', '100% Fragrance-Free Matrix'],
    protocolTip: 'Every batch is third-party dermatologically tested on sensitive and razor-sensitized skin.'
  },
  // 4. RESULTS & TIMELINES
  {
    id: 'faq-timeline-results',
    category: 'results',
    categoryLabel: 'RESULTS & TIMELINES',
    question: 'How quickly should I expect to see improvements in oil control, redness, and texture?',
    shortAnswer: 'Surface comfort and shine reduction occur within 3–7 days; cellular barrier renewal and texture refinement manifest across 4–6 weeks.',
    detailedAnswer: [
      'Days 1–7 (Immediate Comfort): The elimination of harsh foaming sulfates and high-proof alcohol aftershaves immediately halts post-wash tightness and razor burn stinging. Sebum-absorbing silica and Zinc PCA balance midday forehead and nose glare.',
      'Weeks 2–4 (Follicular Clearance): Lipophilic salicylic acid and niacinamide clear persistent follicular micro-plugs, visibly diminishing blackheads and active shaving-induced pseudofolliculitis papules.',
      'Weeks 6–8 (Structural Renewal): At the 28–40 day full epidermal turnover cycle, baseline transepidermal water loss stabilizes, dermal collagen breakdown is arrested through broad-spectrum photoprotection, and skin texture feels resilient, smooth, and refined.'
    ],
    keyActives: ['Zinc PCA', '2% Salicylic Acid', '3:1:1 Ceramides', 'Tinosorb S'],
    protocolTip: 'Consistency is the primary determinant of clinical dermatological outcomes. Give any new active protocol at least 30 consecutive days.'
  }
];

interface FrequentlyAskedQuestionsProps {
  setCurrentView?: (view: NavView) => void;
  onOpenConsultation?: () => void;
}

export const FrequentlyAskedQuestions: React.FC<FrequentlyAskedQuestionsProps> = ({
  setCurrentView,
  onOpenConsultation
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-3-minute-routine');

  const categories = [
    { id: 'all', label: 'ALL QUESTIONS' },
    { id: 'routines', label: 'ROUTINES & PROTOCOLS' },
    { id: 'shaving', label: 'SHAVING & BARRIER' },
    { id: 'ingredients', label: 'ACTIVE INGREDIENTS' },
    { id: 'results', label: 'RESULTS & TIMELINE' }
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.shortAnswer.toLowerCase().includes(q) ||
        item.detailedAnswer.some((p) => p.toLowerCase().includes(q)) ||
        (item.keyActives && item.keyActives.some((k) => k.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFAQ = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="aegis-home-faq"
      className="py-20 lg:py-24 border-y border-[#262927] bg-[#040404] text-left relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono-spec tracking-[0.2em] uppercase text-[#8C9B86] font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ · CLINICAL ANSWERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial font-normal text-[#FAF9F7] leading-[1.15] tracking-tight">
              FAQ
            </h2>
            <p className="text-sm sm:text-base text-[#9EA59F] leading-relaxed">
              Straightforward, dermatologically grounded clarifications on male dermal architecture, ingredient concentrations, layering mechanics, and shave recovery.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono-spec">
            {setCurrentView && (
              <button
                id="faq-action-journal"
                onClick={() => setCurrentView('journal')}
                className="px-4 py-2.5 bg-[#141615] hover:bg-[#1C1F1D] border border-[#262927] rounded-[3px] text-[#FAF9F7] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#8C9B86]" />
                <span>Read The Journal</span>
              </button>
            )}
            {setCurrentView && (
              <button
                id="faq-action-quiz"
                onClick={() => setCurrentView('quiz')}
                className="px-4 py-2.5 bg-[#526442] hover:bg-[#3E4C32] text-[#FAF9F7] rounded-[3px] font-semibold inline-flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E2DDD5]" />
                <span>Diagnostic Quiz</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#262927]">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`faq-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-[3px] text-xs font-mono-spec uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#526442] text-[#FAF9F7] font-semibold border border-[#526442]'
                    : 'bg-[#141615] hover:bg-[#1C1F1D] text-[#9EA59F] hover:text-[#FAF9F7] border border-[#262927]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#727974]" />
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search active, routine, or step..."
              className="w-full pl-9 pr-3 py-2 bg-[#141615] border border-[#262927] rounded-[3px] text-xs text-[#FAF9F7] placeholder-[#727974] focus:outline-none focus:border-[#526442] transition-colors font-mono-spec"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C9B86] hover:text-[#FAF9F7] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 px-6 text-center border border-dashed border-[#262927] rounded-[4px] bg-[#141615] space-y-3">
              <HelpCircle className="w-8 h-8 text-[#8C9B86] mx-auto opacity-75" />
              <p className="text-sm font-serif-editorial text-[#FAF9F7]">
                No matching inquiries found for "{searchQuery}".
              </p>
              <p className="text-xs text-[#9EA59F]">
                Try adjusting your search terms or select "ALL QUESTIONS".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-mono-spec text-[#8C9B86] font-bold uppercase underline underline-offset-4 hover:text-[#FAF9F7] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = expandedId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: (index % 5) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`border transition-all duration-200 rounded-[3px] overflow-hidden ${
                    isOpen
                      ? 'border-[#526442] bg-[#141615] shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
                      : 'border-[#262927] bg-[#101211] hover:bg-[#141615] hover:border-[#526442]/60'
                  }`}
                >
                  <button
                    id={`faq-toggle-${faq.id}`}
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-5 flex items-start justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex items-center gap-2 text-[10px] font-mono-spec uppercase text-[#8C9B86] font-bold tracking-wider">
                        <span>{faq.categoryLabel}</span>
                        <span className="text-[#434B45]">·</span>
                        <span className="text-[#8C9B86]/70">Q{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-serif-editorial text-[#FAF9F7] font-normal leading-snug">
                        {faq.question}
                      </h3>
                      {!isOpen && (
                        <p className="text-xs text-[#9EA59F] pt-0.5 leading-relaxed">
                          {faq.shortAnswer}
                        </p>
                      )}
                    </div>
                    <div
                      className={`p-1.5 rounded-[2px] transition-transform duration-200 mt-1 shrink-0 ${
                        isOpen
                          ? 'rotate-180 bg-[#526442] text-[#FAF9F7]'
                          : 'bg-[#1C1F1D] text-[#9EA59F]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#262927] space-y-4">
                      {/* Short Takeaway Banner */}
                      <div className="p-3 bg-[#0C0E0D] border-l-2 border-[#526442] text-xs text-[#E0E5E0] font-medium leading-relaxed">
                        <strong className="font-mono-spec uppercase text-[10px] text-[#8C9B86] block mb-0.5">
                          Clinical Key Takeaway
                        </strong>
                        {faq.shortAnswer}
                      </div>

                      {/* Detailed Clinical Explanation */}
                      <div className="space-y-3 text-xs sm:text-sm text-[#B4BAB4] leading-relaxed">
                        {faq.detailedAnswer.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>

                      {/* Protocol Tip & Relevant Actives */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#262927] text-xs font-mono-spec">
                        {faq.protocolTip && (
                          <div className="text-[#8C9B86] flex items-start gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-tight">
                              <strong>Clinical Protocol:</strong> {faq.protocolTip}
                            </span>
                          </div>
                        )}

                        {faq.keyActives && faq.keyActives.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                            <span className="text-[10px] text-[#8C9B86] uppercase">Related Actives:</span>
                            {faq.keyActives.map((active) => (
                              <span
                                key={active}
                                className="px-2 py-0.5 bg-[#1C1F1D] border border-[#262927] text-[#D8DED8] rounded-[2px] text-[10px]"
                              >
                                {active}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
