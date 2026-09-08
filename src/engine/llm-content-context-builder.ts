import type { ContentGenerationInput } from "@/types/content-generation-input";
import { buildGenerationContext } from "@/engine/generation-context-builder";
import { buildUserContentContext } from "@/engine/user-content-context-builder";

export function buildLlmContentContext(input: ContentGenerationInput) {
  const context = buildGenerationContext(input);
  const userContext = buildUserContentContext(input.categoryDetails ?? input.project.categoryDetails);
  return {
    userContext,
    userProvidedBusiness: {
      brandName: input.brandContext?.brandName ?? null,
      brandDescription: input.brandContext?.brandDescription ?? null,
      products: input.brandContext?.products ?? [],
      features: input.brandContext?.keyFeatures ?? [],
      uniqueSellingPoints: input.brandContext?.uniqueSellingPoints ?? [],
      location: input.brandContext?.extractedInsights?.find((item) => item.category.toLowerCase().includes("location"))?.description ?? null,
      keywords: input.brandContext?.keywords ?? [],
      tone: input.brandContext?.brandTone ?? [],
    },
    campaign: {
      objective: input.calendarPost.objective,
      contentTheme: input.calendarPost.contentTheme,
      contentPillar: context.contentPillar,
      format: context.recommendedFormat,
      platform: input.project.configuration.platform ?? "INSTAGRAM",
      targetAudience: context.targetAudience ?? null,
      communicationTone: context.communicationTone,
      variation: "Use a distinct angle without changing the facts provided.",
    },
    constraints: [
      "Use the provided business and product details as the primary source of truth.",
      "Do not invent features, locations, amenities, claims, offers, dates, or customer results.",
      "If a detail is missing, write around it without presenting an unknown detail as fact.",
      "Make every field specific to this business and campaign rather than generic industry copy.",
    ],
  };
}
