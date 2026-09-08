import type { ContentConfiguration, ContentDuration } from "@/types/content-configuration";

export const recommendedPostCounts: Record<ContentDuration, 3 | 6 | 12> = { ONE_WEEK: 3, TWO_WEEKS: 6, ONE_MONTH: 12 };
export const durationLabels: Record<ContentDuration, string> = { ONE_WEEK: "1 Week", TWO_WEEKS: "2 Weeks", ONE_MONTH: "1 Month" };
export const durationPostLabels: Record<ContentDuration, string> = { ONE_WEEK: "3 Posts", TWO_WEEKS: "6 Posts", ONE_MONTH: "12 Posts" };

export function getPlanInsight(configuration: ContentConfiguration) {
  const weeks = configuration.duration === "ONE_WEEK" ? 1 : configuration.duration === "TWO_WEEKS" ? 2 : 4;
  const frequency = configuration.postCount / weeks;
  const level = frequency < 1 ? "LOW" : frequency < 2.5 ? "MEDIUM" : frequency <= 3.5 ? "RECOMMENDED" : "HIGH";
  const text = level === "HIGH" ? "High-frequency publishing plan" : `Approximately ${Number.isInteger(frequency) ? frequency : frequency.toFixed(1)} posts per week`;
  return { level, text };
}