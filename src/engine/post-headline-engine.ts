export function selectHeadline(
  hook?: string,
  title?: string,
  maxLength = 80,
): string {
  const preferred = hook?.trim() || title?.trim() || "Campaign story";
  if (preferred.length <= maxLength) return preferred;

  const trimmed = preferred.replace(/\s+/g, " ").trim();
  const safeLength = Math.max(28, maxLength - 8);
  const cut = trimmed.slice(0, safeLength).trim();
  const lastSpace = cut.lastIndexOf(" ");

  if (lastSpace > 24) {
    return `${cut.slice(0, lastSpace).trim()}...`;
  }

  return `${cut.trim()}...`;
}
