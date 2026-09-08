import type { ContentGenerationInput } from "@/types/content-generation-input";
import type { GeneratedContent, GeneratedPostContent } from "@/types/generated-content";
import { buildGenerationContext } from "@/engine/generation-context-builder";
import { generateCta } from "@/engine/cta-generator";
import { generateHashtags } from "@/engine/hashtag-engine";
import { generateVisualDirection } from "@/engine/visual-direction-engine";
import { checkContentQuality } from "@/engine/content-quality-engine";
import { buildLlmContentContext } from "@/engine/llm-content-context-builder";
import { buildUserContentContext } from "@/engine/user-content-context-builder";
import type { ContentGenerationProvider } from "./content-generation-provider";

const hookSets: Record<string, string[]> = { Jewellery: ["Some moments deserve more than words.", "What makes a piece become an heirloom?", "Craftsmanship is the detail you feel."], "Real Estate": ["More than a home. A smarter investment.", "What would better living look like?", "A better address changes the everyday."], Perfume: ["Not just a fragrance. A feeling that stays.", "What mood will you leave behind?", "Some memories begin with a single note."], "FMCG / Food": ["One bite. One familiar feeling.", "What makes a daily moment worth sharing?", "Good food makes room for connection."] };
export class MockContentGenerationProvider implements ContentGenerationProvider { async generateContent(input: ContentGenerationInput, variation = 0): Promise<GeneratedPostContent> { const context = buildGenerationContext(input); const userContext = buildUserContentContext(input.categoryDetails ?? input.project.categoryDetails); const name = userContext?.businessName ?? context.brandName ?? context.industry.name; const product = userContext?.productOrProjectName ?? input.brandContext?.products?.[0] ?? context.contentPillar; const value = userContext?.uniqueSellingPoints[0] ?? userContext?.features[0] ?? input.brandContext?.uniqueSellingPoints?.[0] ?? context.industry.focusAreas[0]; const audience = userContext?.targetAudience.join(" and ") ?? context.targetAudience ?? "people who value thoughtful choices"; const hooks = hookSets[context.industry.name] ?? hookSets["FMCG / Food"]; const hook = hooks[variation % hooks.length]; const detail = userContext?.campaignObjective ? ` Built around the campaign objective: ${userContext.campaignObjective}.` : ""; const caption = `${hook}\n\n${name} presents ${product}. ${context.contentTheme} comes to life through ${product}, with ${value} at the centre for ${audience}.${detail}\n\nEvery detail is shaped by the information provided for this campaign, with ${context.communicationTone.slice(0, 2).join(" and ").toLowerCase()} at the centre.`; const content: GeneratedPostContent = { title: `${product}: ${context.contentTheme}`, hook, caption, callToAction: generateCta(input), hashtags: generateHashtags(input), visualDirection: generateVisualDirection(input) }; return content; } }
export class LlmContentGenerationProvider implements ContentGenerationProvider {
	constructor(private readonly fallback: ContentGenerationProvider) {}

	async generateContent(input: ContentGenerationInput, variation = 0): Promise<GeneratedPostContent> {
		try {
			const response = await fetch("/api/generate-content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ context: buildLlmContentContext(input), variation }) });
			if (!response.ok) return this.fallback.generateContent(input, variation);
			const content = await response.json() as GeneratedPostContent;
			return content;
		} catch {
			return this.fallback.generateContent(input, variation);
		}
	}
}
export function createGeneratedContent(input: ContentGenerationInput, content: GeneratedPostContent): GeneratedContent { const context = buildGenerationContext(input); const now = new Date().toISOString(); return { id: `generated-${input.calendarPost.id}`, projectId: input.project.id, calendarPostId: input.calendarPost.id, postNumber: input.calendarPost.postNumber, status: "READY", content, generationContext: context, qualityReport: checkContentQuality(content, context), createdAt: now, updatedAt: now }; }
export const contentGenerationService = new LlmContentGenerationProvider(new MockContentGenerationProvider());