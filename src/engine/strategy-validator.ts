import type { ContentStrategy } from "@/types/content-strategy";
export function validateStrategy(strategy: ContentStrategy) {
  const pillarPercentage = strategy.contentPillars.reduce((sum, pillar) => sum + pillar.percentage, 0);
  const pillarPosts = strategy.contentPillars.reduce((sum, pillar) => sum + pillar.postCount, 0);
  const calendarPosts = strategy.calendarBlueprint.posts.length;
  const errors: string[] = [];
  if (!strategy.primaryObjective) errors.push("Primary objective is missing.");
  if (pillarPercentage !== 100) errors.push("Content pillar percentages must equal 100%.");
  if (pillarPosts !== strategy.publishingPlan.totalPosts) errors.push("Pillar post distribution does not match the campaign volume.");
  if (calendarPosts !== strategy.publishingPlan.totalPosts) errors.push("Calendar blueprint does not match the campaign volume.");
  strategy.calendarBlueprint.posts.forEach((post) => { if (!post.contentPillarId || !post.contentTheme || !post.objective || !post.recommendedFormat) errors.push(`Post ${post.postNumber} is incomplete.`); });
  return { valid: errors.length === 0, errors };
}