import { contentStrategyProfiles } from "@/config/content-strategy-profiles";
import { audiences } from "@/config/audiences";
import { contentFormats } from "@/config/content-formats";
import { durationLabels, getPlanInsight } from "@/lib/content-configuration";
import type { ContentStrategy, StrategyInput, StrategyVariation, AudienceProfile, CommunicationStyle } from "@/types/content-strategy";
import type { ContentFormat } from "@/types/content-configuration";
import { normalizeWeights } from "@/engine/strategy-weight-engine";
import { distributePosts } from "@/engine/post-distribution-engine";
import { scheduleCalendar } from "@/engine/calendar-scheduler";
import { validateStrategy } from "@/engine/strategy-validator";
import type { ContentStrategyProvider } from "./content-strategy-provider";

const goalNames: Record<string, string> = { BRAND_AWARENESS: "Brand Awareness", AUDIENCE_ENGAGEMENT: "Audience Engagement", LEAD_GENERATION: "Lead Generation", SALES_CONVERSION: "Sales & Conversion", PRODUCT_PROMOTION: "Product Promotion", COMMUNITY_BUILDING: "Community Building" };
const formatNames: Record<string, string> = Object.fromEntries(contentFormats.map((format) => [format.id, format.name]));

export class MockContentStrategyProvider implements ContentStrategyProvider {
  async generateStrategy(input: StrategyInput, variation: StrategyVariation = "A") {
    const profile = contentStrategyProfiles[input.industry.id];
    const variationIndex = variation.charCodeAt(0) - 65;
    const goal = input.configuration.primaryGoal;
    const selectedFormats: ContentFormat[] = input.configuration.contentFormats.length ? input.configuration.contentFormats : ["INSTAGRAM_POST"];
    const candidates = normalizeWeights(profile.pillarCandidates, goal, goal ? profile.goalWeights[goal] : {}, variationIndex);
    const postCounts = distributePosts(candidates.map((candidate) => candidate.percentage), input.configuration.postCount);
    const pillars = candidates.map((candidate, index) => ({ ...candidate, id: `pillar-${index + 1}`, postCount: postCounts[index], recommendedFormats: (candidate.formats.filter((format) => selectedFormats.includes(format)).length ? candidate.formats.filter((format) => selectedFormats.includes(format)) : [selectedFormats[index % selectedFormats.length]]) as ContentFormat[] }));
    const audience = this.generateAudience(input);
    const communication = this.generateCommunication(input, profile);
    const publishingPlan = this.generatePublishingPlan(input);
    const contentMix = selectedFormats.map((format, index) => { const percentage = Math.floor(100 / selectedFormats.length) + (index < 100 % selectedFormats.length ? 1 : 0); return { contentType: formatNames[format], percentage, postCount: 0, purpose: index === 0 ? "Anchor the strategy with a clear point of view" : "Add variety and reinforce the campaign objective" }; });
    const mixCounts = distributePosts(contentMix.map((item) => item.percentage), input.configuration.postCount);
    const mix = contentMix.map((item, index) => ({ ...item, postCount: mixCounts[index] }));
    const objectiveLabel = goalNames[goal ?? "BRAND_AWARENESS"];
    const strategy: ContentStrategy = { id: `strategy-${Date.now()}`, projectId: "project_current", strategyName: `${input.industry.name} ${objectiveLabel} Strategy`, strategySummary: `A ${durationLabels[input.configuration.duration].toLowerCase()} content strategy focused on ${objectiveLabel.toLowerCase()} through ${pillars.slice(0, 3).map((pillar) => pillar.title.toLowerCase()).join(", ")}, and a considered content mix.`, brandPositioning: input.brandContext?.brandDescription || `${input.industry.name} brand positioned through ${input.industry.focusAreas.slice(0, 3).join(", ").toLowerCase()} and a distinctive point of view.`, targetAudienceProfile: audience, communicationStyle: communication, primaryObjective: objectiveLabel, secondaryObjectives: input.industry.contentGoals, contentPillars: pillars, contentMix: mix, publishingPlan, calendarBlueprint: { posts: [] }, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    strategy.calendarBlueprint.posts = scheduleCalendar(strategy.contentPillars, input.configuration.duration, input.configuration.postCount, goal, profile, variationIndex);
    const validation = validateStrategy(strategy);
    if (!validation.valid) throw new Error(validation.errors.join(" "));
    return strategy;
  }

  private generateAudience(input: StrategyInput): AudienceProfile { const selected = input.configuration.targetAudience === "CUSTOM_AUDIENCE" ? input.configuration.customAudience : audiences.find((audience) => audience.id === input.configuration.targetAudience)?.name ?? "People who value relevant, thoughtful content"; const brandAudience = input.brandContext?.targetAudience; return { summary: brandAudience ? `${selected}, with a strong affinity for ${brandAudience.toLowerCase()}.` : `${selected} looking for a more meaningful relationship with ${input.industry.name.toLowerCase()}.`, primaryAudience: selected, audienceMotivations: ["Discover relevant ideas", "Feel confident in their choices", "Find brands with a point of view"], audienceInterests: input.industry.focusAreas.slice(0, 4), audienceNeeds: ["Clarity without noise", "Proof of quality", "A reason to remember the brand"] }; }
  private generateCommunication(input: StrategyInput, profile: typeof contentStrategyProfiles[keyof typeof contentStrategyProfiles]): CommunicationStyle { return { primaryTone: [...input.industry.tone, ...input.configuration.tonePreferences].filter((tone, index, tones) => tones.indexOf(tone) === index).slice(0, 6), vocabularyGuidelines: [...profile.communicationGuidelines.vocabulary, ...(input.brandContext?.keywords ?? [])].slice(0, 8), messagingStyle: profile.communicationGuidelines.messaging, avoid: profile.communicationGuidelines.avoid }; }
  private generatePublishingPlan(input: StrategyInput) { const insight = getPlanInsight(input.configuration); const postsPerWeek = input.configuration.duration === "ONE_WEEK" ? input.configuration.postCount : input.configuration.duration === "TWO_WEEKS" ? input.configuration.postCount / 2 : input.configuration.postCount / 4; return { duration: durationLabels[input.configuration.duration], totalPosts: input.configuration.postCount, postsPerWeek, recommendedDays: input.configuration.postCount <= 3 ? ["Monday", "Wednesday", "Friday"] : ["Monday", "Wednesday", "Friday", "Saturday"], frequencyLabel: insight.level as "LOW" | "MEDIUM" | "RECOMMENDED" | "HIGH", strategyNotes: ["Keep a consistent visual and verbal point of view.", `Prioritize ${input.industry.focusAreas.slice(0, 2).join(" and ").toLowerCase()} in early posts.`, "Leave room for community response and iteration."] }; }
}

export const contentStrategyService = new MockContentStrategyProvider();