export type ContentDuration = "ONE_WEEK" | "TWO_WEEKS" | "ONE_MONTH";
export type ContentGoal = "BRAND_AWARENESS" | "AUDIENCE_ENGAGEMENT" | "LEAD_GENERATION" | "SALES_CONVERSION" | "PRODUCT_PROMOTION" | "COMMUNITY_BUILDING";
export type ContentFormat = "INSTAGRAM_POST" | "INSTAGRAM_CAROUSEL" | "PROMOTIONAL_CONTENT" | "EDUCATIONAL_CONTENT" | "STORYTELLING" | "PRODUCT_HIGHLIGHT" | "LIFESTYLE_CONTENT";
export type AudienceType = "GENERAL_CONSUMERS" | "YOUNG_PROFESSIONALS" | "LUXURY_CONSUMERS" | "FAMILIES" | "INVESTORS" | "STUDENTS" | "CUSTOM_AUDIENCE";
export type TonePreference = "PROFESSIONAL" | "FRIENDLY" | "LUXURY" | "BOLD" | "MINIMAL" | "PLAYFUL" | "EMOTIONAL" | "INSPIRATIONAL" | "EDUCATIONAL" | "PREMIUM";

export interface ContentConfiguration {
  duration: ContentDuration;
  postCount: 3 | 6 | 12;
  isCustomPostCount: boolean;
  primaryGoal: ContentGoal | null;
  contentFormats: ContentFormat[];
  targetAudience: AudienceType | null;
  customAudience: string;
  tonePreferences: TonePreference[];
}