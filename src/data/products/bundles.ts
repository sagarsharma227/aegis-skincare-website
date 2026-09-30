import { Product } from '../../types';

export const BUNDLES: Product[] = [
  {
    id: 'aegis-starter-bundle',
    slug: 'starter-routine-system',
    stepNumber: 'BUNDLE / 01',
    stepCategory: 'ROUTINE',
    name: 'THE STARTER SYSTEM',
    subtitle: 'Essential 3-Step Daily Protocol',
    formulaSpec: 'WASH (150ml) + HYDRA (50ml) + SHIELD SPF 50 (50ml)',
    category: 'bundles',
    concerns: ['oil', 'dehydration', 'aging', 'sun'],
    skinTypes: ['All Skin Types', 'Normal', 'Combination'],
    subcategory: 'Complete Routine Bundle',
    price: 1899,
    originalPrice: 2197,
    rating: 5.0,
    reviewCount: 528,
    volume: 'Complete 3-Piece Kit (60-Day Supply)',
    phLevel: 'Physiological pH Matched',
    status: 'best-seller',
    badges: ['SAVE ₹298', 'MOST POPULAR', 'STARTER CHOICE'],
    shortDescription: 'The foundational everyday triad: Cleanse, Repair, and Defend in less than 2 minutes each morning and night.',
    whyItExists: 'Healthy skin doesn’t require a shelf full of confusing products. This 3-step system delivers everything men need for clear, resilient, and protected skin.',
    whatItDoes: 'Gently cleanses away daily grime, restores skin barrier lipids post-shave, and provides invisible broad-spectrum SPF 50 defense.',
    benefits: [
      'Covers your complete morning (90 sec) and evening (60 sec) routine',
      'Saves ₹298 compared to purchasing items individually',
      'Includes full-size WASH (150ml), HYDRA (50ml), and SHIELD (50ml)'
    ],
    keyActives: [
      {
        name: 'Step 1: AEGIS WASH',
        concentration: '150 ml',
        role: 'Gentle Cleanse',
        mechanism: 'Apple amino acids preserve barrier pH 5.5.'
      },
      {
        name: 'Step 2: AEGIS HYDRA',
        concentration: '50 ml',
        role: 'Lipid & Hydration Repair',
        mechanism: 'Hyaluronic acid and niacinamide soothe and moisturize.'
      },
      {
        name: 'Step 3: AEGIS SHIELD',
        concentration: '50 ml',
        role: 'Daily Defend',
        mechanism: 'SPF 50 PA++++ zero-cast invisible sunscreen.'
      }
    ],
    beforeYouBuy: {
      finish: 'Comfortable natural satin matte',
      fragrance: '100% Fragrance-free',
      skinType: 'All skin types, beginners, everyday users',
      routine: 'Full AM & PM Protocol',
      size: '150ml + 50ml + 50ml',
      expectedUse: 'Approximately 60–75 days'
    },
    howToUseTimeline: [
      {
        stepNumber: '01',
        action: 'AM / PM CLEANSE',
        amountOrTime: '30 sec',
        instruction: 'Lather AEGIS WASH with water and cleanse thoroughly.'
      },
      {
        stepNumber: '02',
        action: 'REPAIR',
        amountOrTime: '1 pump',
        instruction: 'Apply AEGIS HYDRA to face and neck.'
      },
      {
        stepNumber: '03',
        action: 'AM DEFEND',
        amountOrTime: '2 fingers',
        instruction: 'Apply AEGIS SHIELD SPF 50 as the morning top layer.'
      }
    ],
    compatibility: {
      worksWellWith: ['Universal compatibility'],
      useCarefullyWith: ['None'],
      explanation: 'Scientifically designed as a unified, synergistic daily system.'
    },
    comparison: {
      bestFor: 'Everyday skin health, post-shave comfort, and daily UV defense',
      keyActive: 'Amino Acids + Hyaluronic + SPF 50',
      amUse: true,
      pmUse: true,
      targetSkin: 'All skin types'
    },
    protocolAM: 'WASH (30s) → HYDRA (1 pump) → SHIELD SPF 50 (2 fingers).',
    protocolPM: 'WASH (30s) → HYDRA (2 pumps across face & neck).',
    whoItsFor: 'Men who want an effortless, high-performance skincare routine with zero confusion.',
    fullIngredients: 'Refer to individual product listings for complete INCI disclosures.',
    faqList: [
      {
        question: 'How long does this kit last?',
        answer: 'Approximately 60 to 75 days of twice-daily recommended usage.'
      }
    ],
    image: '/images/bundles/aegis-starter-bundle.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=80'
    ],
    isBundle: true,
    bundleItemIds: ['aegis-wash', 'aegis-hydra', 'aegis-shield']
  },
  {
    id: 'aegis-clear-routine',
    slug: 'clear-routine-bundle',
    stepNumber: 'BUNDLE / 02',
    stepCategory: 'ROUTINE',
    name: 'AEGIS CLEAR ROUTINE',
    subtitle: 'Pore Clarifying & Oil-Control Trio',
    formulaSpec: 'WASH (150ml) + CLEAR SERUM (30ml) + SHIELD SPF 50 (50ml)',
    category: 'bundles',
    concerns: ['acne', 'oil', 'redness', 'sun'],
    skinTypes: ['Oily', 'Combination', 'Acne-Prone'],
    subcategory: 'Anti-Acne Routine Bundle',
    price: 1849,
    originalPrice: 2147,
    rating: 4.9,
    reviewCount: 384,
    volume: 'Complete 3-Piece Kit (60-Day Supply)',
    phLevel: 'Physiological pH Matched',
    status: 'low-stock',
    badges: ['SAVE ₹298', 'OIL CONTROL', 'CLINICAL BHA'],
    shortDescription: 'Targeted daily regimen for men battling stubborn blackheads, midday shine, and frequent breakouts.',
    whyItExists: 'Acne and excessive shine require consistent follicular decongestion. This trio delivers gentle daily cleansing, high-potency BHA and Niacinamide, and zero-grease sun defense.',
    whatItDoes: 'Clears clogged pores, regulates sebum production, and shields skin against UV-induced post-blemish dark marks.',
    benefits: [
      'Dissolves pore-clogging sebum and prevents blackheads',
      'Balances shiny T-zones without dehydrating skin',
      'Protects acne-prone skin with zero pore-clogging sunscreen'
    ],
    keyActives: [
      {
        name: 'Step 1: AEGIS WASH',
        concentration: '150 ml',
        role: 'Purifying Cleanse',
        mechanism: 'Apple amino acids lift surface grease.'
      },
      {
        name: 'Step 2: AEGIS CLEAR',
        concentration: '30 ml',
        role: 'Pore Decongestion',
        mechanism: '2% BHA + 10% Niacinamide + 1% Zinc PCA.'
      },
      {
        name: 'Step 3: AEGIS SHIELD',
        concentration: '50 ml',
        role: 'Clean Matte Defend',
        mechanism: 'SPF 50 PA++++ non-comedogenic fluid.'
      }
    ],
    beforeYouBuy: {
      finish: 'Clean matte throughout the day',
      fragrance: '100% Fragrance-free',
      skinType: 'Oily, congested, acne-prone skin',
      routine: 'Full AM & PM Daily Protocol',
      size: '150ml + 30ml + 50ml',
      expectedUse: 'Approximately 60 days'
    },
    howToUseTimeline: [
      {
        stepNumber: '01',
        action: 'AM CLEANSE',
        amountOrTime: '30 sec',
        instruction: 'Wash with AEGIS WASH and pat dry.'
      },
      {
        stepNumber: '02',
        action: 'AM CORRECT',
        amountOrTime: '2 drops',
        instruction: 'Press 2 drops of CLEAR into oily zones.'
      },
      {
        stepNumber: '03',
        action: 'AM DEFEND',
        amountOrTime: '2 fingers',
        instruction: 'Seal with AEGIS SHIELD SPF 50.'
      }
    ],
    compatibility: {
      worksWellWith: ['Synergistic acne defense'],
      useCarefullyWith: ['Physical scrub brushes'],
      explanation: 'Formulated to clear skin gently without barrier peeling.'
    },
    comparison: {
      bestFor: 'Oily shine, blackheads, breakouts, clogged pores',
      keyActive: 'Amino Acids + 2% BHA/10% Niacinamide + SPF 50',
      amUse: true,
      pmUse: true,
      targetSkin: 'Oily, combination, breakout-prone'
    },
    protocolAM: 'WASH (30s) → CLEAR (2 drops) → SHIELD SPF 50 (2 finger lengths).',
    protocolPM: 'WASH (30s) → CLEAR (3 drops across face).',
    whoItsFor: 'Men dealing with forehead shine, clogged nose pores, or regular breakouts.',
    fullIngredients: 'Refer to individual product listings for complete INCI disclosures.',
    faqList: [
      {
        question: 'Will this dry out my cheeks?',
        answer: 'No. AEGIS CLEAR is balanced with 10% niacinamide and hyaluronic acid to preserve moisture while controlling shine.'
      }
    ],
    image: '/images/bundles/aegis-clear-routine.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248593883-7d727b4074ee?auto=format&fit=crop&w=800&q=80'
    ],
    isBundle: true,
    bundleItemIds: ['aegis-wash', 'aegis-clear', 'aegis-shield']
  },
  {
    id: 'aegis-even-routine',
    slug: 'even-routine-bundle',
    stepNumber: 'BUNDLE / 03',
    stepCategory: 'ROUTINE',
    name: 'AEGIS EVEN ROUTINE',
    subtitle: 'Tone & Texture Resurfacing System',
    formulaSpec: 'WASH (150ml) + EVEN SERUM (30ml) + SHIELD SPF 50 (50ml)',
    category: 'bundles',
    concerns: ['dark-spots', 'aging', 'sun', 'texture'],
    skinTypes: ['All Skin Types', 'Hyperpigmentation', 'Sun Damage'],
    subcategory: 'Tone Correcting Bundle',
    price: 1899,
    originalPrice: 2197,
    rating: 4.9,
    reviewCount: 226,
    volume: 'Complete 3-Piece Kit (60-Day Supply)',
    phLevel: 'Physiological pH Matched',
    badges: ['SAVE ₹298', 'RESURFACES TEXTURE'],
    shortDescription: 'Clinical tone-correcting system designed to fade persistent marks and rough bumps while preventing new discoloration.',
    whyItExists: 'Post-blemish marks and uneven texture require active azelaic science combined with strict broad-spectrum UV protection.',
    whatItDoes: 'Fades stubborn marks, evens out blotchy skin tone, and locks in high-level UVA/UVB photoprotection.',
    benefits: [
      'Potassium Azeloyl Diglycinate and Niacinamide fade marks and smooth bumps',
      'SPF 50 prevents UV rays from re-darkening existing spots',
      'Improves overall facial clarity and radiance'
    ],
    keyActives: [
      {
        name: 'Step 1: AEGIS WASH',
        concentration: '150 ml',
        role: 'Cleanse & Prep',
        mechanism: 'Apple amino acids optimize active absorption.'
      },
      {
        name: 'Step 2: AEGIS EVEN',
        concentration: '30 ml',
        role: 'Tone & Texture Resurfacing',
        mechanism: '10% Potassium Azeloyl Diglycinate + 3% Niacinamide + Centella.'
      },
      {
        name: 'Step 3: AEGIS SHIELD',
        concentration: '50 ml',
        role: 'Photoprotection',
        mechanism: 'SPF 50 PA++++ blocks UV pigment reactivation.'
      }
    ],
    beforeYouBuy: {
      finish: 'Even, luminous satin matte',
      fragrance: '100% Fragrance-free',
      skinType: 'All skin types, dark spots, sun discoloration',
      routine: 'Full AM & PM Tone Protocol',
      size: '150ml + 30ml + 50ml',
      expectedUse: 'Approximately 60 days'
    },
    howToUseTimeline: [
      {
        stepNumber: '01',
        action: 'AM CLEANSE',
        amountOrTime: '30 sec',
        instruction: 'Wash with AEGIS WASH and pat dry.'
      },
      {
        stepNumber: '02',
        action: 'AM RESURFACE',
        amountOrTime: '2–3 drops',
        instruction: 'Press AEGIS EVEN into uneven areas and face.'
      },
      {
        stepNumber: '03',
        action: 'AM PROTECT',
        amountOrTime: '2 fingers',
        instruction: 'Apply AEGIS SHIELD SPF 50 diligently every morning.'
      }
    ],
    compatibility: {
      worksWellWith: ['Synergistic clarifying protocol'],
      useCarefullyWith: ['Never skip sunscreen when using active serums'],
      explanation: 'Sun protection is essential to prevent rebound pigmentation.'
    },
    comparison: {
      bestFor: 'Dark marks, texture roughness, blotchy tone, dull complexion',
      keyActive: 'Amino Acids + Azelaic Derivative (PAD) + SPF 50',
      amUse: true,
      pmUse: true,
      targetSkin: 'All types with hyperpigmentation'
    },
    protocolAM: 'WASH (30s) → EVEN (2 drops) → SHIELD SPF 50 (2 fingers).',
    protocolPM: 'WASH (30s) → EVEN (3 drops across face & dark spots).',
    whoItsFor: 'Men with dark marks left behind after pimples heal or rough skin bumps.',
    fullIngredients: 'Refer to individual product listings for complete INCI disclosures.',
    faqList: [
      {
        question: 'How long until I see dark spots fade?',
        answer: 'Visible lightening typically begins in 4 to 6 weeks of daily twice-a-day application paired with consistent SPF 50.'
      }
    ],
    image: '/images/bundles/aegis-even-routine.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1615397323058-29a393fbab93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615397323058-29a393fbab93?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248593883-7d727b4074ee?auto=format&fit=crop&w=800&q=80'
    ],
    isBundle: true,
    bundleItemIds: ['aegis-wash', 'aegis-even', 'aegis-shield']
  },
];
