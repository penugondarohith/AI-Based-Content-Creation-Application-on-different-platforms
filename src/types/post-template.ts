export const postTemplates = [
  "MINIMAL",
  "EDITORIAL",
  "PRODUCT_FOCUS",
  "LUXURY",
  "BOLD",
  "STORYTELLING",
] as const;

export type PostTemplate = (typeof postTemplates)[number];

export const templateMeta: Record<
  PostTemplate,
  { label: string; description: string; accent: string }
> = {
  MINIMAL: {
    label: "Minimal",
    description: "Large visual, clean typography, minimal overlay.",
    accent: "#c7d2fe",
  },
  EDITORIAL: {
    label: "Editorial",
    description: "Premium magazine composition with a strong hierarchy.",
    accent: "#f5d0fe",
  },
  PRODUCT_FOCUS: {
    label: "Product Focus",
    description: "Large product emphasis with a supporting headline.",
    accent: "#bfdbfe",
  },
  LUXURY: {
    label: "Luxury",
    description: "Elegant spacing and premium overlays.",
    accent: "#fef3c7",
  },
  BOLD: {
    label: "Bold",
    description: "High-contrast headline and campaign energy.",
    accent: "#fecaca",
  },
  STORYTELLING: {
    label: "Storytelling",
    description: "Narrative-led composition with a warm editorial tone.",
    accent: "#bbf7d0",
  },
};
