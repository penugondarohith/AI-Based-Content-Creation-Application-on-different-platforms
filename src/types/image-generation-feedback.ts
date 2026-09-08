export interface ImageGenerationFeedback {
  focus?: string[];
  realism?: "LOW" | "MEDIUM" | "HIGH";
  styleAdjustments?: string[];
  avoid?: string[];
}
