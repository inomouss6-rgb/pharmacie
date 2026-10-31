export interface BundleTier {
  quantity: 1 | 2 | 5;
  title: string;
  badge?: string;
  discountPercent: number;
  unitPrice: number;
  originalUnitPrice: number;
  totalPrice: number;
  originalTotalPrice: number;
  popular?: boolean;
  bestValue?: boolean;
  savings: number;
  perks: string[];
}

export interface BeforeAfterCase {
  id: string;
  name: string;
  age: number;
  city: string;
  duration: string;
  weightLost: string;
  initialWeight: string;
  finalWeight: string;
  waistLost: string;
  beforeImg: string;
  afterImg: string;
  compositeImg?: string;
  quote: string;
  familyStory: string;
  verifiedMedical: boolean;
}

export interface Product {
  id: 'wegovy' | 'mounjaro' | 'zepbound';
  name: string;
  brand: string;
  molecule: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  rating: number;
  reviewCount: number;
  doses: string[];
  defaultDose: string;
  image: string;
  colorTheme: {
    primary: string;
    light: string;
    accent: string;
    border: string;
  };
  features: string[];
  stockLeft: number;
  bundleTiers: BundleTier[];
  beforeAfterList: BeforeAfterCase[];
  clinicalTrial: {
    stat: string;
    label: string;
    source: string;
  };
}

export interface TrustpilotReview {
  id: string;
  author: string;
  city: string;
  date: string;
  rating: number; // 5
  product: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  kilosLost?: string;
  familyReaction?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  molecule: string;
  image: string;
  dose: string;
  tier: BundleTier;
  count: number; // multiplier of the bundle
}
