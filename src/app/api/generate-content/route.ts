import { NextResponse } from "next/server";
import type { GeneratedPostContent } from "@/types/generated-content";

function parseJson(value: string): unknown {
  const cleaned = value.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  return JSON.parse(cleaned);
}

function isGeneratedPost(value: unknown): value is GeneratedPostContent {
  if (!value || typeof value !== "object") return false;
  const post = value as Record<string, unknown>;
  return ["title", "hook", "caption", "callToAction"].every((key) => typeof post[key] === "string")
    && Array.isArray(post.hashtags) && post.hashtags.every((item) => typeof item === "string")
    && Boolean(post.visualDirection) && typeof post.visualDirection === "object";
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "LLM is not configured. Add OPENAI_API_KEY to enable personalized generation." }, { status: 503 });
  try {
    const body = await request.json() as { context: unknown; variation?: number };
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are ContentForge AI, a precise content strategist. Return only valid JSON matching the requested schema. Never invent business facts." },
          { role: "user", content: `Create one personalized campaign post from this structured context. Adapt the writing to the requested platform: Instagram should be visual and engaging, LinkedIn professional and informative, Facebook conversational and community-focused, and X short and concise. Return exactly: { title, hook, caption, callToAction, hashtags: string[], visualDirection: { concept, mood: string[], composition, subjectFocus, backgroundSuggestion, typographySuggestion, colorDirection: string[], imagePrompt } }. Use provided names exactly. Prioritize user facts, do not invent unknown facts, and do not replace specific details with generic industry content. Every claim must be supported by the context.\n\n${JSON.stringify(body.context)}\n\nVariation: ${body.variation ?? 0}` },
        ],
      }),
    });
    if (!response.ok) return NextResponse.json({ error: "The configured LLM provider rejected the request." }, { status: 502 });
    const result = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = result.choices?.[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "The LLM returned an empty response." }, { status: 502 });
    const parsed = parseJson(content);
    if (!isGeneratedPost(parsed)) return NextResponse.json({ error: "The LLM response did not match the content schema." }, { status: 502 });
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Unable to generate personalized content right now." }, { status: 500 });
  }
}
