import type { ContentGenerationInput } from "@/types/content-generation-input";
import type { GeneratedImage, ImageAspectRatio } from "@/types/generated-image";
import { buildVisualContext } from "@/engine/visual-context-builder";
import { buildImagePrompt } from "@/engine/image-prompt-builder";
import { getImageVariation } from "@/engine/image-variation-engine";
import { imageGenerationProvider } from "./image-generation-provider";
export async function generateImageForContent(input: ContentGenerationInput, aspectRatio: ImageAspectRatio = "4:5", visualStyle = "Editorial", variation = 0): Promise<GeneratedImage> { const context = buildVisualContext(input); const prompt = buildImagePrompt({ ...context, visualDirection: { ...context.visualDirection, concept: `${context.visualDirection.concept}, ${getImageVariation(variation)}` } }, aspectRatio, visualStyle); return imageGenerationProvider.generateImage({ projectId: input.project.id, generatedContentId: input.project.generatedContent.find((item) => item.calendarPostId === input.calendarPost.id)?.id ?? `generated-${input.calendarPost.id}`, calendarPostId: input.calendarPost.id, prompt }, variation); }