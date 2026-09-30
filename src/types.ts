export type NavView =
  | 'home'
  | 'shop'
  | 'product'
  | 'quiz'
  | 'routines'
  | 'ingredients'
  | 'science'
  | 'journal'
  | 'about';

export type ProductCategory =
  | 'all'
  | 'cleansers'
  | 'serums'
  | 'moisturizers'
  | 'spf'
  | 'treatments'
  | 'exfoliation'
  | 'masks'
  | 'body'
  | 'bundles';

export type SkinConcern =
  | 'all'
  | 'acne'
  | 'oil'
  | 'redness'
  | 'dehydration'
  | 'dark-spots'
  | 'aging'
  | 'barrier'
  | 'sun'
  | 'texture'
  | 'shaving';

export interface ActiveIngredient {
  name: string;
  concentration: string;
  role: string;
  mechanism: string;
}

export interface BeforeYouBuySpec {
  finish: string;
  fragrance: string;
  skinType: string;
  routine: string;
  size: string;
  expectedUse: string;
}

export interface HowToUseStep {
  stepNumber: string;
  action: string;
  amountOrTime: string;
  instruction: string;
}

export interface IngredientCompatibility {
  worksWellWith: string[];
  useCarefullyWith: string[];
  explanation: string;
}

export interface ComparisonData {
  bestFor: string;
  keyActive: string;
  amUse: boolean;
  pmUse: boolean;
  targetSkin: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location?: string;
  city?: string;
  rating: number;
  date: string;
  verified?: boolean;
  verifiedBuyer?: boolean;
  skinType?: string;
  productName?: string;
  title: string;
  comment: string;
  helpfulCount?: number;
}

export interface Product {
  id: string;
  slug: string;
  stepNumber: string; // e.g. "01 / CLEANSE"
  stepCategory: string; // e.g. "CLEANSE", "CORRECT", "REPAIR", "DEFEND", "ROUTINE"
  name: string; // e.g. "AEGIS WASH"
  subtitle: string; // e.g. "Amino Acid Purifying Cleanser"
  formulaSpec: string; // e.g. "15% APPLE AMINO ACIDS + 0.5% SALICYLIC"
  category: ProductCategory;
  concerns: SkinConcern[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  volume: string;
  phLevel: string;
  status?: 'low-stock' | 'best-seller' | 'limited-edition' | 'archival-batch';
  badges?: string[];
  shortDescription: string;
  whyItExists: string;
  whatItDoes: string;
  benefits: string[];
  keyActives: ActiveIngredient[];
  beforeYouBuy?: BeforeYouBuySpec;
  howToUseTimeline?: HowToUseStep[];
  compatibility?: IngredientCompatibility;
  comparison?: ComparisonData;
  completeRoutineItemIds?: string[];
  completeRoutineDiscount?: number;
  protocolAM: string;
  protocolPM: string;
  whoItsFor: string;
  fullIngredients: string;
  faqList: { question: string; answer: string }[];
  image: string;
  galleryImages: string[];
  badge?: string;
  pairsWith?: string[];
  isBundle?: boolean;
  bundleItemIds?: string[];
  skinTypes?: string[];
  subcategory?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface IngredientInfo {
  id: string;
  name: string;
  category: string;
  whatItDoes: string;
  bestFor: string;
  howToUse: string;
  scientificInsight: string;
  matchedProducts: string[];
  worksWellWith?: string[];
  useCarefullyWith?: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: 'FOUNDATIONS' | 'INGREDIENTS' | 'ROUTINES' | "MEN'S SKIN" | 'SCIENCE';
  readTime: string;
  date: string;
  author: string;
  authorRole?: string;
  summary: string;
  content: string[];
  clinicalKeypoints?: string[];
  tableOfContents?: { id: string; title: string }[];
  references?: string[];
  studies?: string[];
  image: string;
  relatedProducts?: string[];
  relatedProductId?: string;
  relatedIngredients?: string[];
  relatedArticleIds?: string[];
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    tag?: string;
  }[];
}

export interface QuizDiagnosis {
  skinType: string;
  barrierScore: number;
  oilScore?: number;
  sensitivityScore?: number;
  mainIssue: string;
  priorityTitle: string;
  priorityDescription: string;
  targetActives: string[];
  recommendedProductIds: string[];
  amSteps: { step: string; product: string; instruction: string }[];
  pmSteps: { step: string; product: string; instruction: string }[];
  guidanceNote: string;
}

export interface RoutineCheckStatus {
  hasCleanser: boolean;
  hasTreatment: boolean;
  hasBarrierSupport: boolean;
  hasSunProtection: boolean;
  score: number;
  missingItems: { category: string; prompt: string; recommendedProductId: string }[];
  conflictWarning?: string;
}
