import type { ContentFormat } from "./content-configuration";
import type { IndustryConfig } from "./industry";
import type { GeneratedImage } from "./generated-image";

export type GeneratedContentStatus = "DRAFT" | "GENERATING" | "READY" | "EDITED" | "ERROR";
export interface VisualDirection { concept: string; mood: string[]; composition: string; subjectFocus: string; backgroundSuggestion: string; typographySuggestion?: string; colorDirection?: string[]; imagePrompt?: string; }
export interface GeneratedPostContent { title: string; hook: string; caption: string; callToAction: string; hashtags: string[]; visualDirection: VisualDirection; }
export interface GenerationContext { industry: IndustryConfig; brandName?: string; contentPillar: string; contentTheme: string; objective: string; recommendedFormat: ContentFormat; targetAudience?: string; communicationTone: string[]; brandKeywords: string[]; uniqueSellingPoints: string[]; }
export interface ContentQualityCheck { id: string; label: string; status: "PASS" | "WARNING" | "FAIL"; message: string; }
export interface ContentQualityReport { score: number; status: "EXCELLENT" | "GOOD" | "NEEDS_REVIEW"; checks: ContentQualityCheck[]; suggestions: string[]; }
export interface GeneratedContent { id: string; projectId: string; calendarPostId: string; postNumber: number; status: GeneratedContentStatus; content: GeneratedPostContent; generationContext: GenerationContext; qualityReport?: ContentQualityReport; generatedImage?: GeneratedImage; createdAt: string; updatedAt: string; }