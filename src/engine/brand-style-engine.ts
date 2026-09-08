import type { BrandContext } from "@/types/brand-context";

export function getBrandStyle(brandContext?: BrandContext | null) {
  if (!brandContext) {
    return {
      brandName: "ContentForge AI",
      brandTone: ["premium", "confident", "modern"],
      keywords: ["editorial", "clarity", "strategy"],
      primaryStyle: "Editorial",
      visualPersonality: "clean premium",
      palette: ["#171a2f", "#8b5cf6", "#f9fafb"],
    };
  }

  return {
    brandName: brandContext.brandName || "ContentForge AI",
    brandTone: brandContext.brandTone?.length ? brandContext.brandTone : ["premium", "confident"],
    keywords: brandContext.keywords?.length ? brandContext.keywords : ["premium", "story-led"],
    primaryStyle: brandContext.uniqueSellingPoints?.[0] || "Editorial",
    visualPersonality: brandContext.brandDescription || "Confident and premium",
    palette: [
      "#171a2f",
      brandContext.keywords?.[0] ? "#7c3aed" : "#8b5cf6",
      "#f8fafc",
    ],
  };
}
