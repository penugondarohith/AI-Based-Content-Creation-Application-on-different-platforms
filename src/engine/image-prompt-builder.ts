import type { ImageAspectRatio, ImageGenerationPrompt } from "@/types/generated-image";
import type { VisualGenerationContext } from "@/types/visual-generation-context";

export function buildImagePrompt(context: VisualGenerationContext, aspectRatio: ImageAspectRatio, visualStyle: string): ImageGenerationPrompt {
  const industryStyle: Record<string, string> = {
    Jewellery: "luxury product photography, refined macro details, warm studio lighting, rich gemstone textures",
    "Real Estate": "architectural hero shot, premium property styling, clean daylight, elevated lifestyle realism",
    Perfume: "cinematic fragrance editorial, immersive atmosphere, premium bottle focus, luxe mood lighting, soft shadows",
    "FMCG / Food": "commercial food styling, textured ingredients, appetizing composition, premium packaging detail",
  };

  const productName = context.productIntelligence?.productName ?? context.products?.[0] ?? context.visualDirection.subjectFocus ?? "premium product";
  const brandName = context.productIntelligence?.brandName ?? context.brandName ?? "premium brand";
  const categoryFacts = context.productIntelligence?.categorySpecificData ?? context.categorySpecificFacts ?? {};
  const features = context.productIntelligence?.features.length ? context.productIntelligence.features.join(", ") : context.uniqueSellingPoints.join(", ") || "premium craftsmanship";
  const usp = context.productIntelligence?.uniqueSellingPoints.length ? context.productIntelligence.uniqueSellingPoints.join("; ") : "distinctive design and premium quality";
  const audience = context.productIntelligence?.targetAudience.length ? context.productIntelligence.targetAudience.join(", ") : context.brandName ?? "premium audience";
  const visualDescription = context.productIntelligence?.visualDescription ?? context.visualDirection.backgroundSuggestion ?? "premium product presentation";

  const location = typeof categoryFacts.city === "string" || typeof categoryFacts.area === "string"
    ? [categoryFacts.area, categoryFacts.city, categoryFacts.state, categoryFacts.country].filter(Boolean).join(", ")
    : "premium lifestyle setting";

  const prompt = [
    `${productName} by ${brandName}`,
    `${context.visualDirection.concept} for a premium social campaign`,
    `${context.visualDirection.composition}`,
    `mood: ${context.visualDirection.mood.join(", ") || "premium"}`,
    `${industryStyle[context.industry.name] ?? "luxury editorial product photography, premium lighting, polished finish, premium composition"}`,
    `featured details: ${features}`,
    `unique selling points: ${usp}`,
    `target audience: ${audience}`,
    `visual description: ${visualDescription}`,
    `context: ${location}`,
    `background: ${context.visualDirection.backgroundSuggestion || "lush premium environment"}`,
    `visual style: ${visualStyle}, sophisticated color grading, high-end commercial polish, cinematic depth, soft highlights, premium texture, shallow depth of field`,
    `hero product composition, premium negative space, strong product focus, realistic material rendering, polished studio finish, elegant shadows, no text, no logo, no watermark, no clutter, no duplicate objects`,
  ].join(", ");

  return {
    prompt,
    negativePrompt: "text, logo, watermark, caption, headline, duplicate product, distorted object, low quality, blurry details, cluttered composition, unrealistic proportions, bad lighting, oversaturated colors, signboards, extra limbs, empty background, flat lighting",
    aspectRatio,
    visualStyle,
    mood: context.visualDirection.mood,
    subject: productName,
    composition: context.visualDirection.composition,
  };
}
