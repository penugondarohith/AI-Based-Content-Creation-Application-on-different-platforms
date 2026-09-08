import type { ImageGenerationInput } from "@/types/image-generation-input";
import type { GeneratedImage } from "@/types/generated-image";

export interface ImageGenerationProvider {
  generateImage(input: ImageGenerationInput, variation?: number): Promise<GeneratedImage>;
}

const dimensions = { "1:1": [1024, 1024], "4:5": [1024, 1280], "16:9": [1280, 720], "9:16": [720, 1280] } as const;

function buildPalette(visualStyle: string, variation: number): readonly [string, string, string] {
  const palettes = {
    Cinematic: [["#120f2d", "#7c3aed", "#f5d0fe"], ["#1b102f", "#ec4899", "#fbbf24"], ["#071b2d", "#38bdf8", "#dbeafe"]],
    Minimal: [["#f8fafc", "#cbd5e1", "#4f46e5"], ["#f5f3ff", "#ddd6fe", "#7c3aed"], ["#f8fafc", "#bfdbfe", "#2563eb"]],
    Default: [["#20163f", "#a855f7", "#f8d8b5"], ["#1f2937", "#c084fc", "#fde68a"], ["#171a2d", "#ff7a59", "#fbbf24"]],
  } as const;

  const selected =
    visualStyle === "Cinematic"
      ? palettes.Cinematic
      : visualStyle === "Minimal"
        ? palettes.Minimal
        : palettes.Default;

  return selected[variation % selected.length];
}

function formatSubjectLabel(subject: string) {
  const cleaned = subject.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  return cleaned.length > 22 ? `${cleaned.slice(0, 22).trim()}...` : cleaned.toUpperCase();
}

export class MockImageGenerationProvider implements ImageGenerationProvider {
  async generateImage(input: ImageGenerationInput, variation = 0): Promise<GeneratedImage> {
    const [width, height] = dimensions[input.prompt.aspectRatio];
    const subject = (input.prompt.subject || "Premium product").replace(/[<>&"']/g, "");
    const [bgA, accentA, accentB] = buildPalette(input.prompt.visualStyle, variation);
    const mood = input.prompt.mood?.[0] ?? "Premium";
    const label = formatSubjectLabel(subject);
    const shift = variation % 3;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="${bgA}"/>
            <stop offset="55%" stop-color="${accentA}"/>
            <stop offset="100%" stop-color="${accentB}"/>
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.88)"/>
            <stop offset="35%" stop-color="rgba(255,255,255,0.28)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
          </radialGradient>
          <linearGradient id="card" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="rgba(255,255,255,0.16)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0.04)"/>
          </linearGradient>
          <filter id="blur"><feGaussianBlur stdDeviation="38"/></filter>
        </defs>

        <rect width="${width}" height="${height}" fill="url(#bg)"/>
        <circle cx="${width * (0.64 + shift * 0.08)}" cy="${height * 0.28}" r="${Math.min(width, height) * 0.25}" fill="url(#glow)"/>
        <circle cx="${width * 0.25}" cy="${height * 0.78}" r="${Math.min(width, height) * 0.2}" fill="rgba(255,255,255,0.12)" filter="url(#blur)"/>

        <g opacity="0.9">
          <path d="M ${width * 0.18} ${height * 0.67} Q ${width * 0.32} ${height * (0.42 + shift * 0.03)} ${width * 0.46} ${height * 0.67} L ${width * 0.52} ${height * 0.67} Q ${width * 0.68} ${height * (0.36 + shift * 0.03)} ${width * 0.82} ${height * 0.67} " fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="${Math.max(2, width / 220)}" stroke-linecap="round"/>
          <rect x="${width * 0.38}" y="${height * 0.18}" width="${width * 0.26}" height="${height * 0.48}" rx="${Math.min(width, height) * 0.06}" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.45)" stroke-width="3"/>
          <rect x="${width * 0.41}" y="${height * 0.26}" width="${width * 0.20}" height="${height * 0.32}" rx="${Math.min(width, height) * 0.04}" fill="rgba(255,255,255,0.18)"/>
        </g>

        <rect x="${width * 0.12}" y="${height * 0.72}" width="${width * 0.76}" height="${height * 0.18}" rx="${Math.min(width, height) * 0.04}" fill="url(#card)" stroke="rgba(255,255,255,0.22)"/>

        <text x="${width * 0.15}" y="${height * 0.82}" fill="rgba(255,255,255,0.72)" font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(16, width / 42)}" letter-spacing="4">${mood.toUpperCase()}</text>
        <text x="${width * 0.15}" y="${height * 0.9}" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(30, width / 24)}" font-weight="700">${label}</text>
      </svg>
    `;

    const now = new Date().toISOString();

    return {
      id: `image-${input.generatedContentId}-${Date.now()}`,
      projectId: input.projectId,
      generatedContentId: input.generatedContentId,
      calendarPostId: input.calendarPostId,
      status: "READY",
      imageUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
      prompt: input.prompt,
      metadata: {
        provider: "mock",
        model: "premium-editorial-v1",
        width,
        height,
        generatedAt: now,
      },
      createdAt: now,
      updatedAt: now,
    };
  }
}

export const imageGenerationProvider = new MockImageGenerationProvider();
