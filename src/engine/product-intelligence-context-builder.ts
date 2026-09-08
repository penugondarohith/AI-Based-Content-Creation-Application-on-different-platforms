import type { ProductIntelligenceContext } from "@/types/category-details";

export function buildProductIntelligenceContext({
  industry,
  category,
  data,
}: {
  industry: string;
  category?: string;
  data: Record<string, unknown>;
}): ProductIntelligenceContext {
  const features = Array.isArray(data.keyFeatures)
    ? data.keyFeatures.filter((value): value is string => typeof value === "string")
    : typeof data.keyFeatures === "string"
      ? data.keyFeatures.split(",").map((entry) => entry.trim()).filter(Boolean)
      : [];

  const uniqueSellingPoints = [
    typeof data.uniqueSellingPoint === "string" ? data.uniqueSellingPoint : "",
    typeof data.uniqueFeatures === "string" ? data.uniqueFeatures : "",
    typeof data.productBenefits === "string" ? data.productBenefits : "",
  ].filter(Boolean);

  const targetAudience = Array.isArray(data.targetAudience)
    ? data.targetAudience.filter((value): value is string => typeof value === "string")
    : typeof data.targetAudience === "string"
      ? [data.targetAudience]
      : [];

  return {
    industry,
    category,
    brandName: typeof data.brandName === "string" ? data.brandName : undefined,
    productName: typeof data.productName === "string" ? data.productName : typeof data.propertyName === "string" ? data.propertyName : undefined,
    launchDate: typeof data.launchDate === "string" ? data.launchDate : undefined,
    features,
    uniqueSellingPoints,
    targetAudience,
    visualDescription: typeof data.visualDescription === "string" ? data.visualDescription : undefined,
    categorySpecificData: {
      ...(data as Record<string, unknown>),
      location: typeof data.city === "string" || typeof data.area === "string" ? {
        city: data.city,
        area: data.area,
        state: data.state,
        country: data.country,
      } : undefined,
      propertyType: data.propertyType,
      amenities: Array.isArray(data.amenities) ? data.amenities : typeof data.amenities === "string" ? [data.amenities] : [],
      nearbyLandmarks: typeof data.nearbyLandmarks === "string" ? data.nearbyLandmarks.split("\n").map((value) => value.trim()).filter(Boolean) : [],
    },
  };
}
