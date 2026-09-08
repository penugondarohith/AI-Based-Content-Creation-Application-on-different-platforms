import type { IndustryConfig } from "./industry";
import type { VisualDirection } from "./generated-content";
import type { ProductIntelligenceContext } from "./category-details";

export interface VisualGenerationContext {
  industry: IndustryConfig;
  brandName?: string;
  products?: string[];
  communicationTone: string[];
  brandKeywords: string[];
  uniqueSellingPoints: string[];
  contentPillar: string;
  contentTheme: string;
  objective: string;
  hook: string;
  visualDirection: VisualDirection;
  productIntelligence?: ProductIntelligenceContext;
  categorySpecificFacts?: Record<string, unknown>;
}