export type VariationKind = "STORY" | "QUESTION" | "STATEMENT" | "EMOTION" | "CURIOSITY";
export function variationIndex(seed: number) { return seed % 5; }