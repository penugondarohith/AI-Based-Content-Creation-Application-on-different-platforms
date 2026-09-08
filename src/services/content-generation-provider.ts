import type { ContentGenerationInput } from "@/types/content-generation-input";
import type { GeneratedPostContent } from "@/types/generated-content";
export interface ContentGenerationProvider { generateContent(input: ContentGenerationInput, variation?: number): Promise<GeneratedPostContent>; }