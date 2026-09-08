"use client";

import { useMemo } from "react";
import type { ComposedPost } from "@/types/composed-post";

const ratioMap = {
  "1:1": { width: 1080, height: 1080 },
  "4:5": { width: 1080, height: 1350 },
  "9:16": { width: 900, height: 1600 },
  "16:9": { width: 1600, height: 900 },
} as const;

export function PostRenderer({ post }: { post: ComposedPost }) {
  const { width, height } = ratioMap[post.aspectRatio] ?? ratioMap["4:5"];

  const overlayStyle = useMemo(() => {
    switch (post.composition.overlayStyle) {
      case "GRADIENT":
        return "linear-gradient(180deg, rgba(10,14,30,0.1), rgba(10,14,30,0.68))";
      case "DARK_OVERLAY":
        return "rgba(10,15,26,0.64)";
      case "LIGHT_OVERLAY":
        return "rgba(255,255,255,0.22)";
      case "BLUR_PANEL":
        return "rgba(17,24,39,0.28)";
      case "BRAND_PANEL":
        return "rgba(24,16,44,0.52)";
      default:
        return "transparent";
    }
  }, [post.composition.overlayStyle]);

  const textAlign = (() => {
    switch (post.composition.textPosition) {
      case "LEFT":
        return "left";
      case "RIGHT":
        return "right";
      case "CENTER":
        return "center";
      case "TOP":
        return "left";
      default:
        return "left";
    }
  })();

  const positioning = (() => {
    switch (post.composition.textPosition) {
      case "TOP":
        return { top: 64, left: 52 };
      case "CENTER":
        return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      case "RIGHT":
        return { right: 52, top: "50%", transform: "translateY(-50%)" };
      case "LEFT":
        return { left: 52, top: "50%", transform: "translateY(-50%)" };
      default:
        return { left: 52, bottom: 64 };
    }
  })();

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
      style={{ width: "100%", maxWidth: width, aspectRatio: `${width} / ${height}` }}
    >
      <img
        src={post.composition.backgroundImageUrl || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"}
        alt={post.composition.headline || "Generated post creative"}
        className="h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: overlayStyle }}
      />

      <div
        className="absolute z-10 max-w-[72%] text-white"
        style={{
          ...positioning,
          textAlign,
          width: post.composition.textPosition === "CENTER" ? "70%" : "58%",
        }}
      >
        <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 backdrop-blur-[1px]">
          <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-white/80">
            {post.composition.brandName || "ContentForge AI"}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">
            {post.composition.headline || "Campaign story"}
          </h3>
          {post.composition.subheadline && (
            <p className="mt-3 text-sm text-white/80 md:text-base">
              {post.composition.subheadline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
