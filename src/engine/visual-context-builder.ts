import type { ContentGenerationInput } from "@/types/content-generation-input";
import type { VisualGenerationContext } from "@/types/visual-generation-context";
import { buildProductIntelligenceContext } from "@/engine/product-intelligence-context-builder";

export function buildVisualContext(input: ContentGenerationInput): VisualGenerationContext {
  const pillar = input.contentStrategy.contentPillars.find((item) => item.id === input.calendarPost.contentPillarId);
  const generatedEntry = input.project.generatedContent.find((item) => item.calendarPostId === input.calendarPost.id);
  const productName = input.brandContext?.products?.[0] ?? generatedEntry?.content.visualDirection.subjectFocus ?? input.industryDNA.name;

  const categorySpecificData = {
    brandName: input.brandContext?.brandName,
    productName,
    keyFeatures: input.brandContext?.keyFeatures ?? [],
    targetAudience: input.brandContext?.targetAudience,
    visualDescription: generatedEntry?.content.visualDirection.backgroundSuggestion,
    city: input.brandContext?.brandName ?? "",
    area: input.industryDNA.name,
    state: "",
    country: "",
    propertyType: input.industryDNA.name,
    amenities: input.brandContext?.keyFeatures ?? [],
    ...input.brandContext?.extractedInsights?.reduce<Record<string, unknown>>((acc, insight) => {
      acc[insight.id] = insight.title;
      return acc;
    }, {}),
  };

  const productIntelligence = buildProductIntelligenceContext({
    industry: input.industryDNA.name,
    category: input.industryDNA.shortName,
    data: categorySpecificData,
  });

  return {
    industry: input.industryDNA,
    brandName: input.brandContext?.brandName,
    products: input.brandContext?.products,
    communicationTone: input.contentStrategy.communicationStyle.primaryTone,
    brandKeywords: input.brandContext?.keywords ?? input.contentStrategy.communicationStyle.vocabularyGuidelines,
    uniqueSellingPoints: input.brandContext?.uniqueSellingPoints ?? [],
    contentPillar: pillar?.title ?? "Strategic content",
    contentTheme: input.calendarPost.contentTheme,
    objective: input.calendarPost.objective,
    hook: generatedEntry?.content.hook ?? "",
    productIntelligence,
    categorySpecificFacts: categorySpecificData,
    visualDirection: generatedEntry?.content.visualDirection ?? {
      concept: "Strategic visual",
      mood: ["Premium"],
      composition: "Editorial composition",
      subjectFocus: productName,
      backgroundSuggestion: "Clean premium background",
    },
  };
}