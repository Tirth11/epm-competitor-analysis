export type ProductType = 'EPM' | 'EDR';

export type ComparisonRow = {
  id: number;
  product: string;
  isPrimary: number;
  productType: ProductType;
  feature: string;
  category: string;
  subCategory: string | null;
  status: string;
  description: string | null;
  sourceUrl: string | null;
  references: string[];
  firstDetected: string;
  lastUpdated: string;
  changeType: 'new' | 'updated' | 'removed';
};

export type UpdateItem = {
  id: number;
  product: string;
  updateType: 'added' | 'changed' | 'deprecated' | 'announcement';
  title: string;
  detail: string | null;
  sourceUrl: string | null;
  createdAt: string;
};

export type Product = {
  id: number;
  name: string;
  website: string;
  is_primary: number;
  product_type: ProductType;
  vendor: string | null;
  description: string | null;
};

export type UseCase = {
  id: number;
  product: string;
  productType: ProductType;
  title: string;
  category: string;
  industry: string | null;
  problem: string;
  solution: string;
  outcome: string;
  sourceUrl: string | null;
};

export type Insights = {
  gaps: string[];
  differentiators: string[];
  fastestInnovation: Array<{ name: string; update_count: number }>;
  trends: Array<{ category: string; additions: number }>;
} | null;
