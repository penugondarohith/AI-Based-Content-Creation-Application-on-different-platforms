import type { CalendarBlueprintPost, ContentPillar } from "@/types/content-strategy";
import type { ContentGoal, ContentFormat, ContentDuration } from "@/types/content-configuration";
import type { IndustryStrategyProfile } from "@/config/content-strategy-profiles";
import { generateThemes } from "./theme-generator";

const days = ["Monday", "Wednesday", "Friday", "Tuesday", "Thursday", "Saturday", "Sunday"];
export function scheduleCalendar(pillars: ContentPillar[], duration: ContentDuration, totalPosts: number, goal: ContentGoal | null, profile: IndustryStrategyProfile, variation = 0): CalendarBlueprintPost[] {
  const weeks = duration === "ONE_WEEK" ? 1 : duration === "TWO_WEEKS" ? 2 : 4;
  const queues = pillars.flatMap((pillar) => Array.from({ length: pillar.postCount }, () => pillar));
  const themes = new Map<string, string[]>();
  pillars.forEach((pillar) => themes.set(pillar.id, generateThemes(profile, pillar.title, goal, pillar.postCount, variation)));
  return Array.from({ length: totalPosts }, (_, index) => {
    const pillar = queues[index] ?? pillars[index % pillars.length];
    const pillarThemes = themes.get(pillar.id) ?? ["A Strategic Moment"];
    const weekNumber = Math.min(weeks, Math.floor(index / Math.ceil(totalPosts / weeks)) + 1);
    return { id: `blueprint-${index + 1}`, postNumber: index + 1, weekNumber, suggestedDay: days[(index * 2 + variation) % days.length], contentPillarId: pillar.id, contentTheme: pillarThemes[index % pillarThemes.length], objective: pillar.objective, recommendedFormat: pillar.recommendedFormats[index % pillar.recommendedFormats.length] as ContentFormat };
  });
}