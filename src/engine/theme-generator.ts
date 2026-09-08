import type { ContentGoal } from "@/types/content-configuration";
import type { IndustryStrategyProfile } from "@/config/content-strategy-profiles";

export function generateThemes(profile: IndustryStrategyProfile, pillarTitle: string, goal: ContentGoal | null, count: number, variation = 0) {
  const pillar = profile.pillarCandidates.find((candidate) => candidate.title === pillarTitle);
  const themes = pillar?.themes ?? ["A Point of View", "Made for the Moment"];
  const goalSuffix = goal === "SALES_CONVERSION" || goal === "PRODUCT_PROMOTION" ? " in Focus" : " to Remember";
  return Array.from({ length: count }, (_, index) => `${themes[(index + variation) % themes.length]}${index >= themes.length ? goalSuffix : ""}`);
}