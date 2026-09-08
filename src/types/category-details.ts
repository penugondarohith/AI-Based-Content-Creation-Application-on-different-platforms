export interface CategoryDetails {
  id: string;
  projectId: string;
  industry: string;
  category?: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductIntelligenceContext {
  industry: string;
  category?: string;
  brandName?: string;
  productName?: string;
  launchDate?: string;
  features: string[];
  uniqueSellingPoints: string[];
  targetAudience: string[];
  visualDescription?: string;
  categorySpecificData: Record<string, unknown>;
}
