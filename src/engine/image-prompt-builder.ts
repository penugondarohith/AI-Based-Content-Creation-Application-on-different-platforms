import type { ImageAspectRatio, ImageGenerationPrompt } from "@/types/generated-image";
import type { VisualGenerationContext } from "@/types/visual-generation-context";

export function buildImagePrompt(context: VisualGenerationContext, aspectRatio: ImageAspectRatio, visualStyle: string): ImageGenerationPrompt {
  const industryStyle: Record<string, string> = {
    Jewellery: "macro product photography, elegant precious materials, soft warm studio lighting",
    "Real Estate": "wide-angle architectural photography, natural daylight, premium spaces and location context",
    Perfume: "cinematic fragrance editorial, atmospheric shadows, sensory lifestyle storytelling",
    "FMCG / Food": "high-quality commercial food photography, fresh ingredients, texture and appetite appeal",
  };

  const productName = context.productIntelligence?.productName ?? context.products?.[0] ?? context.visualDirection.subjectFocus;
  const brandName = context.productIntelligence?.brandName ?? context.brandName ?? "premium brand";
  const categoryFacts = context.productIntelligence?.categorySpecificData ?? context.categorySpecificFacts ?? {};
  const targetAudience = context.productIntelligence?.targetAudience.length ? context.productIntelligence.targetAudience.join(", ") : context.brandName ?? "premium audience";
  const featureList = context.productIntelligence?.features.length ? context.productIntelligence.features.join(", ") : context.uniqueSellingPoints.join(", ") || "premium product quality";
  const uspList = context.productIntelligence?.uniqueSellingPoints.length ? context.productIntelligence.uniqueSellingPoints.join("; ") : "distinguished design and premium craftsmanship";
  const visualDescription = context.productIntelligence?.visualDescription ?? context.visualDirection.backgroundSuggestion ?? "premium product presentation";

  const geography = typeof categoryFacts.city === "string" || typeof categoryFacts.area === "string"
    ? `location ${[categoryFacts.area, categoryFacts.city, categoryFacts.state, categoryFacts.country].filter(Boolean).join(", ")}`
    : "premium lifestyle setting";

  const prompt = [
    `${productName} by ${brandName}`,
    `${context.visualDirection.concept}`,
    `${context.visualDirection.composition}`,
    `mood: ${context.visualDirection.mood.join(", ") || "premium"}`,
    `${industryStyle[context.industry.name] ?? "premium editorial campaign photography"}`,
    `brand story: ${context.contentTheme} and ${context.objective}`,
    `featured details: ${featureList}`,
    `unique selling points: ${uspList}`,
    `target audience: ${targetAudience}`,
    `visual description: ${visualDescription}`,
    `context: ${geography}`,
    `background: ${context.visualDirection.backgroundSuggestion}`,
    `visual style: ${visualStyle}`,
    `high-end commercial product shot, polished realism, premium lighting, crisp detail, luxury finishes, strong product focus, no text in image`,
  ].join(", ");

  return {
    prompt,
    negativePrompt: "text, logo, watermark, caption, headline, duplicate product, distorted object, low quality, blurry details, cluttered composition, unrealistic proportions, bad lighting, oversaturated colors, signboards, extra limbs",
    aspectRatio,
    visualStyle,
    mood: context.visualDirection.mood,
    subject: productName,
    composition: context.visualDirection.composition,
  };
}