import type { ContentFormat, ContentConfiguration } from "./content-configuration";
import type { BrandContext } from "./brand-context";
import type { ReferenceFile } from "./reference-file";
import type { IndustryConfig, IndustryId } from "./industry";
import type { CategoryDetails } from "./category-details";

export interface StrategyInput {
  industry: IndustryConfig;
  industryDNA: IndustryConfig;
  configuration: ContentConfiguration;
  brandContext: BrandContext | null;
  categoryDetails?: CategoryDetails | null;
  referenceFiles: ReferenceFile[];
}

export interface AudienceProfile {
  summary: string;
  primaryAudience: string;
  audienceMotivations: string[];
  audienceInterests: string[];
  audienceNeeds: string[];
}

export interface CommunicationStyle {
  primaryTone: string[];
  vocabularyGuidelines: string[];
  messagingStyle: string[];
  avoid: string[];
}

export interface ContentPillar {
  id: string;
  title: string;
  description: string;
  objective: string;
  industryFocus: string[];
  percentage: number;
  postCount: number;
  recommendedFormats: ContentFormat[];
}

export interface ContentMixItem {
  contentType: string;
  percentage: number;
  postCount: number;
  purpose: string;
}

export interface PublishingPlan {
  duration: string;
  totalPosts: number;
  postsPerWeek: number;
  recommendedDays: string[];
  frequencyLabel: "LOW" | "MEDIUM" | "RECOMMENDED" | "HIGH";
  strategyNotes: string[];
}

export interface CalendarBlueprintPost {
  id: string;
  postNumber: number;
  weekNumber: number;
  suggestedDay: string;
  contentPillarId: string;
  contentTheme: string;
  objective: string;
  recommendedFormat: ContentFormat;
}

export interface CalendarBlueprint {
  posts: CalendarBlueprintPost[];
}

export interface ContentStrategy {
  id: string;
  projectId: string;
  strategyName: string;
  strategySummary: string;
  brandPositioning: string;
  targetAudienceProfile: AudienceProfile;
  communicationStyle: CommunicationStyle;
  primaryObjective: string;
  secondaryObjectives: string[];
  contentPillars: ContentPillar[];
  contentMix: ContentMixItem[];
  publishingPlan: PublishingPlan;
  calendarBlueprint: CalendarBlueprint;
  createdAt: string;
  updatedAt: string;
}

export type StrategyVariation = "A" | "B" | "C";
export type StrategyIndustry = IndustryId;