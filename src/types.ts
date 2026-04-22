export type ComparisonRow = {
  id: number;
  product: string;
  isPrimary: number;
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
};

export type Insights = {
  gaps: string[];
  differentiators: string[];
  fastestInnovation: Array<{ name: string; update_count: number }>;
  trends: Array<{ category: string; additions: number }>;
} | null;
