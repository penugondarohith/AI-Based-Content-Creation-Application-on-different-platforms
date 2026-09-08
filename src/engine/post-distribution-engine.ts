export function distributePosts(percentages: number[], totalPosts: number) {
  const exact = percentages.map((percentage) => (percentage / 100) * totalPosts);
  const counts = exact.map(Math.floor);
  let remaining = totalPosts - counts.reduce((sum, count) => sum + count, 0);
  const order = exact.map((value, index) => ({ index, remainder: value - counts[index] })).sort((a, b) => b.remainder - a.remainder);
  for (let index = 0; index < order.length && remaining > 0; index += 1, remaining -= 1) counts[order[index].index] += 1;
  return counts;
}