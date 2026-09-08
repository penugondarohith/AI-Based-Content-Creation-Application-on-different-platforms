export type ImageAspectRatio = "1:1" | "4:5" | "16:9" | "9:16";
export type GeneratedImageStatus = "NOT_GENERATED" | "GENERATING" | "READY" | "ERROR";
export interface ImageGenerationPrompt { prompt: string; negativePrompt?: string; aspectRatio: ImageAspectRatio; visualStyle: string; mood: string[]; subject: string; composition: string; }
export interface GeneratedImageMetadata { provider: string; model?: string; width?: number; height?: number; generatedAt: string; }
export interface GeneratedImage { id: string; projectId: string; generatedContentId: string; calendarPostId: string; status: GeneratedImageStatus; imageUrl?: string; prompt: ImageGenerationPrompt; metadata?: GeneratedImageMetadata; createdAt: string; updatedAt: string; }