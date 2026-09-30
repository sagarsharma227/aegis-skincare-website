import { Product } from '../../types';

export const TREATMENTS: Product[] = [
  {
    id: 'aegis-eye',
    slug: 'eye-hydration-depuffing-gel',
    stepNumber: 'TARGET / EYE',
    stepCategory: 'CORRECT',
    name: 'AEGIS EYE',
    subtitle: 'Under-Eye Hydration & De-Puffing Gel',
    formulaSpec: '2.0% CAFFEINE + MULTI-PEPTIDES + HYALURONIC ACID + GREEN TEA',
    category: 'treatments',
    concerns: ['aging', 'dehydration', 'dark-spots'],
    skinTypes: ['All Skin Types', 'Screen Fatigue', 'Dark Circles'],
    subcategory: 'Under-Eye Refresh Gel',
    price: 649,
    originalPrice: 799,
    rating: 4.8,
    reviewCount: 210,
    volume: '15 ml / 0.5 fl. oz.',
    phLevel: 'pH 6.5 (Ocular Safe)',
    badges: ['ANTI-FATIGUE', 'OPHTHALMOLOGIST SAFE'],
    shortDescription: 'Refreshing, non-sticky gel that drains morning under-eye fluid, brightens vascular dark circles, and hydrates tired eyes.',
    whyItExists: 'Men’s periorbital skin is delicate and frequently shows signs of screen fatigue, sleep deficits, and dark circles. AEGIS EYE delivers concentrated caffeine and micro-circulation peptides in an instant cooling gel.',
    whatItDoes: 'Reduces puffiness within 15 minutes, improves under-eye brightness, and smoothes fine fatigue lines.',
    benefits: [
      '2.0% Caffeine stimulates micro-circulation to drain pooled fluids',
      'Targeted peptides reinforce thin periorbital tissue',
      'Instant cooling roller-touch sensation awakens tired morning eyes'
    ],
    keyActives: [
      {
        name: 'Caffeine Complex',
        concentration: '2.0%',
        role: 'Vasoconstrictor & Fluid Drainer',
        mechanism: 'Narrows micro-capillaries to reduce puffy morning eye bags.'
      },
      {
        name: 'Eyeseryl Peptide',
        concentration: '1.5%',
        role: 'Anti-Edema Tetrapeptide',
        mechanism: 'Prevents vascular leakage and improves lymphatic draining.'
      },
      {
        name: 'Hyaluronic Acid Micro-Beads',
        concentration: '1.0%',
        role: 'Fine Line Plumper',
        mechanism: 'Hydrates thin ocular skin without causing fluid retention.'
      }
    ],
    beforeYouBuy: {
      finish: 'Weightless refreshed dry-down',
      fragrance: 'Fragrance-free',
      skinType: 'All skin types, screen workers, late sleepers',
      routine: 'AM & PM (Step 02)',
      size: '15 ML',
      expectedUse: 'Approximately 90 days'
    },
    howToUseTimeline: [
      {
        stepNumber: '01',
        action: 'TAP',
        amountOrTime: 'Half pea size',
        instruction: 'Dispense half a pea size between ring fingertips.'
      },
      {
        stepNumber: '02',
        action: 'PRESS',
        amountOrTime: 'Orbital bone',
        instruction: 'Gently tap along the orbital bone from inner eye outward.'
      },
      {
        stepNumber: '03',
        action: 'ABSORB',
        amountOrTime: '15 seconds',
        instruction: 'Absorbs instantly. Do not rub eyelids directly.'
      }
    ],
    compatibility: {
      worksWellWith: ['All face serums and moisturizers', 'Contact lens wearers'],
      useCarefullyWith: ['Do not get directly inside eyes'],
      explanation: 'Ocular-safe formula tested for contact lens wearers.'
    },
    comparison: {
      bestFor: 'Dark circles, morning puffy eyes, screen fatigue, late work nights',
      keyActive: '2% Caffeine + Eyeseryl Peptides + HA',
      amUse: true,
      pmUse: true,
      targetSkin: 'All skin types with tired eye areas'
    },
    protocolAM: 'Tap gently along orbital bone to instantly depuff and look refreshed.',
    protocolPM: 'Apply before sleeping to boost overnight lymphatic drainage.',
    whoItsFor: 'Men who stare at computer screens, sleep less than 7 hours, or have dark eye circles.',
    fullIngredients: 'Aqua, Caffeine (2.0%), Acetyl Tetrapeptide-5, Sodium Hyaluronate, Camellia Sinensis (Green Tea) Leaf Extract, Glycerin, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    faqList: [
      {
        question: 'Will this sting my eyes if I sweat?',
        answer: 'No. Formulated free of migrating oils and volatile scents to prevent eye irritation.'
      }
    ],
    image: '/images/products/aegis-eye.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248593883-7d727b4074ee?auto=format&fit=crop&w=800&q=80'
    ],
    pairsWith: ['aegis-shield', 'aegis-recover']
  },
  {
    id: 'aegis-after',
    slug: 'after-post-shave-soothing-serum',
    stepNumber: 'TARGET / SHAVE',
    stepCategory: 'REPAIR',
    name: 'AEGIS AFTER',
    subtitle: 'Post-Shave Soothing Serum',
    formulaSpec: '1.0% BISABOLOL + 3.0% PANTHENOL + CENTELLA + ALLANTOIN',
    category: 'treatments',
    concerns: ['redness', 'barrier'],
    skinTypes: ['Sensitive Neck', 'Razor-Burn Prone', 'All Shaving Men'],
    subcategory: 'Post-Shave Recovery Serum',
    price: 599,
    originalPrice: 749,
    rating: 5.0,
    reviewCount: 312,
    volume: '50 ml / 1.7 fl. oz.',
    phLevel: 'pH 5.5',
    status: 'best-seller',
    badges: ['ZERO STING', 'RAZOR BURN RELIEF'],
    shortDescription: 'Alcohol-free soothing serum that neutralizes razor burn, stops itching, and accelerates healing of microscopic shaving nicks.',
    whyItExists: 'Traditional aftershaves rely on high-proof alcohol that burns, dehydrates, and damages the healing epidermal barrier. AEGIS AFTER delivers clinical anti-inflammatories like bisabolol and panthenol with zero sting.',
    whatItDoes: 'Extinguishes razor heat in seconds, prevents razor bumps and irritation, and leaves neck skin soft and calm.',
    benefits: [
      '100% alcohol-free — zero burn or sting on freshly shaved skin',
      'Pharmaceutical bisabolol instantly extinguishes inflammatory razor heat',
      'Allantoin and panthenol seal microscopic razor abrasions'
    ],
    keyActives: [
      {
        name: 'Alpha-Bisabolol (German Chamomile)',
        concentration: '1.0%',
        role: 'Acute Anti-Inflammatory',
        mechanism: 'Blocks leukotriene and prostaglandin synthesis to extinguish heat and redness.'
      },
      {
        name: 'Panthenol (Pro-Vitamin B5)',
        concentration: '3.0%',
        role: 'Micro-Wound Healer',
        mechanism: 'Accelerates keratinocyte migration over microscopic razor nicks.'
      },
      {
        name: 'Allantoin',
        concentration: '1.0%',
        role: 'Epithelial Soother',
        mechanism: 'Soothes stinging and prevents razor bump formation.'
      }
    ],
    beforeYouBuy: {
      finish: 'Non-greasy, soothing velvet touch',
      fragrance: 'Fragrance-free',
      skinType: 'Any man who shaves with a razor or electric trimmer',
      routine: 'Directly after shaving',
      size: '50 ML',
      expectedUse: 'Approximately 60 shaves'
    },
    howToUseTimeline: [
      {
        stepNumber: '01',
        action: 'SHAVE & RINSE',
        amountOrTime: 'Cool water',
        instruction: 'Finish shave and rinse face/neck thoroughly with cool water.'
      },
      {
        stepNumber: '02',
        action: 'PUMP',
        amountOrTime: '2 pumps',
        instruction: 'Pump 2 drops into clean hands.'
      },
      {
        stepNumber: '03',
        action: 'SMOOTH',
        amountOrTime: 'Neck & jaw',
        instruction: 'Smooth generously over freshly shaved jawline and neck.'
      }
    ],
    compatibility: {
      worksWellWith: ['AEGIS WASH', 'AEGIS HYDRA', 'AEGIS SHIELD'],
      useCarefullyWith: ['Do not follow with harsh cologne or alcohol splashes'],
      explanation: 'Use as your first post-shave step before any other cream or sunscreen.'
    },
    comparison: {
      bestFor: 'Razor burn, neck redness, post-shave stinging, collar irritation',
      keyActive: '1% Bisabolol + 3% Panthenol + Allantoin',
      amUse: true,
      pmUse: true,
      targetSkin: 'All shaving skin, sensitive neck'
    },
    completeRoutineItemIds: ['aegis-wash', 'aegis-after', 'aegis-hydra'],
    completeRoutineDiscount: 350,
    protocolAM: 'Apply 2 pumps immediately after morning shaving, followed by AEGIS SHIELD.',
    protocolPM: 'Apply after evening shaves or beard trims to calm skin overnight.',
    whoItsFor: 'Men who dread shaving because of red bumps, stinging, or razor burn around the collar.',
    fullIngredients: 'Aqua, Panthenol (3.0%), Glycerin, Bisabolol (1.0%), Centella Asiatica Extract, Allantoin (1.0%), Vegetable Squalane, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    faqList: [
      {
        question: 'Will this sting on a fresh cut?',
        answer: 'No! It is 100% alcohol-free and specifically engineered to deliver zero sting.'
      }
    ],
    image: '/images/products/aegis-after.jpg',
    galleryImages: [
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80'
    ],
    pairsWith: ['aegis-wash', 'aegis-hydra']
  }
];
