import type { ContentGoal } from "@/types/content-configuration";
import type { StrategyPillarCandidate } from "@/config/content-strategy-profiles";

export function normalizeWeights(candidates: StrategyPillarCandidate[], goal: ContentGoal | null, goalWeights: Record<string, number> = {}, variation = 0) {
  const weighted = candidates.map((candidate, index) => ({ candidate, weight: candidate.weight + (goal ? goalWeights[candidate.title] ?? 0 : 0) + ((index + variation) % 3 === 0 ? 1 : 0) }));
  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  const raw = weighted.map((item) => (item.weight / total) * 100);
  const percentages = raw.map((value) => Math.floor(value));
  let remaining = 100 - percentages.reduce((sum, value) => sum + value, 0);
  const order = raw.map((value, index) => ({ index, remainder: value - percentages[index] })).sort((a, b) => b.remainder - a.remainder);
  for (let index = 0; index < order.length && remaining > 0; index += 1, remaining -= 1) percentages[order[index].index] += 1;
  return weighted.map((item, index) => ({ ...item.candidate, percentage: percentages[index] }));
}