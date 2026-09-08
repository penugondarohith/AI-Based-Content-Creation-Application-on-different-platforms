import type { CategoryDetails } from "@/types/category-details";
import { buildProductIntelligenceContext } from "@/engine/product-intelligence-context-builder";

export type UserContentContext = {
  industry: string;
  category?: string;
  businessName?: string;
  productOrProjectName?: string;
  productDetails: Record<string, unknown>;
  features: string[];
  location?: Record<string, unknown>;
  amenities: string[];
  targetAudience: string[];
  uniqueSellingPoints: string[];
  campaignObjective?: string;
  campaignTone?: string;
};

export function buildUserContentContext(details: CategoryDetails | null | undefined): UserContentContext | null {
  if (!details) return null;
  const intelligence = buildProductIntelligenceContext(details);
  const data = details.data;
  const businessName = typeof data.brandName === "string" ? data.brandName : typeof data.companyName === "string" ? data.companyName : typeof data.builderName === "string" ? data.builderName : undefined;
  const location = intelligence.categorySpecificData.location as Record<string, unknown> | undefined;
  return {
    industry: details.industry,
    category: details.category,
    businessName,
    productOrProjectName: intelligence.productName,
    productDetails: data,
    features: intelligence.features,
    location,
    amenities: Array.isArray(data.amenities) ? data.amenities.filter((item): item is string => typeof item === "string") : [],
    targetAudience: intelligence.targetAudience,
    uniqueSellingPoints: intelligence.uniqueSellingPoints,
    campaignObjective: typeof data.campaignObjective === "string" ? data.campaignObjective : typeof data.campaignMessage === "string" ? data.campaignMessage : undefined,
    campaignTone: typeof data.campaignTone === "string" ? data.campaignTone : typeof data.desiredTone === "string" ? data.desiredTone : undefined,
  };
}
