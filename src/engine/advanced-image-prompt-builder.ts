import type { ImageAspectRatio } from "@/types/generated-image";
import type { ProductIntelligenceContext } from "@/types/category-details";

export function buildAdvancedImagePrompt({
  industry,
  category,
  brandName,
  productName,
  launchDate,
  features,
  uniqueSellingPoints,
  visualDescription,
  targetAudience,
  categorySpecificData,
  aspectRatio,
  campaignObjective,
  contentPillar,
  contentTheme,
}: {
  industry: string;
  category?: string;
  brandName?: string;
  productName?: string;
  launchDate?: string;
  features: string[];
  uniqueSellingPoints: string[];
  visualDescription?: string;
  targetAudience: string[];
  categorySpecificData: Record<string, unknown>;
  aspectRatio: ImageAspectRatio;
  campaignObjective?: string;
  contentPillar?: string;
  contentTheme?: string;
}): string {
  const subjectLine =
    industry === "Perfume"
      ? `${productName || "Premium fragrance"} by ${brandName || "the brand"}, a ${categorySpecificData.perfumeType || "luxury fragrance"} launched in ${launchDate || "the current season"}.`
      : industry === "Real Estate"
        ? `${productName || "Luxury property"} by ${brandName || "the developer"} in ${String(categorySpecificData.city || "a premium location")}.`
        : `${productName || "Premium product"} by ${brandName || "the brand"}.`;

  const featureLine = features.length ? `Key features: ${features.join(", ")}.` : "Key features: strong visual identity and premium quality.";
  const uspLine = uniqueSellingPoints.length ? `Unique selling points: ${uniqueSellingPoints.join(", ")}.` : "Unique selling points: premium material quality and considered design.";
  const locationLine = categorySpecificData.city || categorySpecificData.area
    ? `Location: ${[categorySpecificData.area, categorySpecificData.city, categorySpecificData.state, categorySpecificData.country].filter(Boolean).join(", ")}.`
    : "Location: premium destination setting.";

  const styleLine = industry === "Perfume"
    ? "Visual style: luxury editorial fragrance photography with premium lighting, cinematic depth, and refined negative space."
    : industry === "Real Estate"
      ? "Visual style: high-end architectural photography with realistic materials, natural daylight, and polished lifestyle realism."
      : "Visual style: premium commercial product photography with curated styling and strong visual hierarchy.";

  const compositionLine = industry === "Perfume"
    ? "Composition: the product is the single primary subject, centered with clean negative space for campaign text. Premium lighting highlights the bottle material and fragrance personality."
    : industry === "Real Estate"
      ? "Composition: show the strongest architectural features and location cues with realistic property proportions and premium lifestyle context."
      : "Composition: primary subject centered with premium negative space and carefully layered product styling.";

  const campaignLine = `Campaign objective: ${campaignObjective || contentTheme || "Luxury marketing campaign"}.`;

  return [
    `Create a premium commercial advertising image for ${subjectLine}`,
    `Brand context: ${brandName || "premium brand"}.`,
    featureLine,
    uspLine,
    industry === "Real Estate" ? locationLine : `Audience: ${targetAudience.join(", ") || "premium audience"}.`,
    industry === "Real Estate" ? `Property details: ${categorySpecificData.propertyType || "luxury residence"}; amenities: ${Array.isArray(categorySpecificData.amenities) ? categorySpecificData.amenities.join(", ") : "quality lifestyle amenities"}.` : `Product details: ${visualDescription || "premium product presentation"}.`,
    campaignLine,
    styleLine,
    compositionLine,
    `Aspect ratio: ${aspectRatio}.`,
    "Do not generate text, watermarks, logos, duplicate products, distorted objects, unrealistic architecture, or cluttered compositions.",
  ].join(" ");
}
