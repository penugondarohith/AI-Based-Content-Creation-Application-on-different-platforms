import type { IndustryId } from "./industry";

export interface BrandInsight {
  id: string;
  category: string;
  title: string;
  description: string;
  confidence?: number;
  sourceFileId?: string;
}

export interface BrandContext {
  brandName: string;
  brandDescription: string;
  industry: IndustryId;
  products: string[];
  keyFeatures: string[];
  targetAudience: string;
  brandTone: string[];
  uniqueSellingPoints: string[];
  keywords: string[];
  extractedInsights: BrandInsight[];
  sourceFileIds: string[];
}

export type ReferenceCoverageLevel = "LOW" | "MEDIUM" | "HIGH" | "EXCELLENT";

export interface ReferenceCoverageResult {
  score: number;
  level: ReferenceCoverageLevel;
  breakdown: {
    brandName: boolean;
    products: boolean;
    keyFeatures: boolean;
    targetAudience: boolean;
    brandTone: boolean;
    uniqueSellingPoints: boolean;
    keywords: boolean;
  };
}

export interface BrandContextCompleteness {
  brandIdentity: boolean;
  products: boolean;
  audience: boolean;
  brandTone: boolean;
  uniqueSellingPoints: boolean;
  keywords: boolean;
}
