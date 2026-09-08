"use client";

import { useMemo, useState } from "react";
import { Download, Sparkles } from "lucide-react";
import type { ComposedPost, OverlayStyle, TextPosition } from "@/types/composed-post";
import type { GeneratedContent } from "@/types/generated-content";
import type { ImageAspectRatio } from "@/types/generated-image";
import { postCompositionService } from "@/services/post-composition-service";
import { TemplateSelector } from "@/components/post-composer/template-selector";
import { PostPreview } from "@/components/post-composer/post-preview";
import type { PostTemplate } from "@/types/post-template";

export function PostComposerWorkspace({ item }: { item: GeneratedContent }) {
  const [template, setTemplate] = useState<PostTemplate>("EDITORIAL");
  const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>("4:5");
  const [textPosition, setTextPosition] = useState<TextPosition>("LEFT");
  const [overlayStyle, setOverlayStyle] = useState<OverlayStyle>("GRADIENT");
  const [headline, setHeadline] = useState(item.content.hook || item.content.title);

  const composedPost = useMemo<ComposedPost>(() => {
    return postCompositionService.createComposition({
      generatedContent: item,
      template,
      aspectRatio,
      customHeadline: headline,
      textPosition,
      overlayStyle,
      brandContext: null,
    });
  }, [item, template, aspectRatio, headline, textPosition, overlayStyle]);

  const exportPost = () => {
    const link = document.createElement("a");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const [width, height] = aspectRatio === "1:1" ? [1080, 1080] : aspectRatio === "16:9" ? [1600, 900] : aspectRatio === "9:16" ? [900, 1600] : [1080, 1350];

    canvas.width = width;
    canvas.height = height;

    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#171a2f");
    gradient.addColorStop(1, "#7c3aed");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      ctx.fillStyle = "rgba(10, 10, 18, 0.38)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 46px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText((headline || "Campaign story").slice(0, 80), 70, height - 180);
      ctx.font = "500 24px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillText("ContentForge AI", 70, height - 120);
      link.href = canvas.toDataURL("image/png");
      link.download = `contentforge-post-${item.postNumber}-${aspectRatio.replace(":", "-")}.png`;
      link.click();
    };
    img.src = item.generatedImage?.imageUrl || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-primary">
            <Sparkles size={14} /> Post design
          </p>
          <h2 className="mt-2 text-xl font-semibold">Compose a final social post</h2>
        </div>
        <button type="button" onClick={exportPost} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-strong">
          <Download size={14} /> Download post
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-xs font-medium">Template</p>
            <TemplateSelector value={template} onChange={setTemplate} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-xs font-medium">
              Aspect ratio
              <select value={aspectRatio} onChange={(event) => setAspectRatio(event.target.value as ImageAspectRatio)} className="mt-1.5 w-full rounded-lg border border-border bg-surface-muted p-3 text-sm text-foreground">
                <option value="1:1">1:1</option>
                <option value="4:5">4:5</option>
                <option value="9:16">9:16</option>
                <option value="16:9">16:9</option>
              </select>
            </label>

            <label className="block text-xs font-medium">
              Text position
              <select value={textPosition} onChange={(event) => setTextPosition(event.target.value as TextPosition)} className="mt-1.5 w-full rounded-lg border border-border bg-surface-muted p-3 text-sm text-foreground">
                <option value="TOP">Top</option>
                <option value="CENTER">Center</option>
                <option value="BOTTOM">Bottom</option>
                <option value="LEFT">Left</option>
                <option value="RIGHT">Right</option>
              </select>
            </label>
          </div>

          <label className="block text-xs font-medium">
            Headline
            <input value={headline} onChange={(event) => setHeadline(event.target.value)} className="mt-1.5 w-full rounded-lg border border-border bg-surface-muted p-3 text-sm text-foreground outline-none focus:border-primary" />
          </label>

          <label className="block text-xs font-medium">
            Overlay style
            <select value={overlayStyle} onChange={(event) => setOverlayStyle(event.target.value as OverlayStyle)} className="mt-1.5 w-full rounded-lg border border-border bg-surface-muted p-3 text-sm text-foreground">
              <option value="NONE">None</option>
              <option value="GRADIENT">Gradient</option>
              <option value="DARK_OVERLAY">Dark overlay</option>
              <option value="LIGHT_OVERLAY">Light overlay</option>
              <option value="BLUR_PANEL">Blur panel</option>
              <option value="BRAND_PANEL">Brand panel</option>
            </select>
          </label>
        </div>

        <div>
          <PostPreview post={composedPost} />
        </div>
      </div>
    </section>
  );
}
