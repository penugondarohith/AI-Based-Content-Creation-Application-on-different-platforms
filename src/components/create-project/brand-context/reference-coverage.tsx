"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { ReferenceCoverageResult } from "@/types/brand-context";

const levelStyles: Record<
  ReferenceCoverageResult["level"],
  { color: string; bg: string; ring: string }
> = {
  LOW: { color: "text-danger", bg: "bg-red-50", ring: "stroke-danger" },
  MEDIUM: { color: "text-warning", bg: "bg-amber-50", ring: "stroke-warning" },
  HIGH: { color: "text-success", bg: "bg-emerald-50", ring: "stroke-success" },
  EXCELLENT: { color: "text-primary", bg: "bg-primary-soft", ring: "stroke-primary" },
};

const breakdownLabels: Record<string, string> = {
  brandName: "Brand Name",
  products: "Products",
  keyFeatures: "Key Features",
  targetAudience: "Target Audience",
  brandTone: "Brand Tone",
  uniqueSellingPoints: "USP",
  keywords: "Keywords",
};

export function ReferenceCoverage({
  coverage,
}: {
  coverage: ReferenceCoverageResult;
}) {
  const style = levelStyles[coverage.level];

  // SVG circular progress
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (coverage.score / 100) * circumference;

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
        Reference Coverage
      </h3>

      <div className="mt-5 flex items-center gap-5">
        {/* Circular progress */}
        <div className="relative shrink-0">
          <svg width="88" height="88" viewBox="0 0 88 88">
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              stroke="var(--border)"
              strokeWidth="6"
            />
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              className={style.ring}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 44 44)"
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-lg font-bold ${style.color}`}>
              {coverage.score}%
            </span>
          </div>
        </div>

        <div>
          <span
            className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${style.bg} ${style.color}`}
          >
            {coverage.level}
          </span>
          <p className="mt-2 text-xs leading-5 text-muted">
            Based on uploaded material and available brand information.
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-5 space-y-2 border-t border-border pt-4">
        {Object.entries(coverage.breakdown).map(([key, present]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            {present ? (
              <CheckCircle2 size={14} className="shrink-0 text-success" />
            ) : (
              <AlertTriangle size={14} className="shrink-0 text-warning" />
            )}
            <span className={present ? "text-foreground" : "text-muted"}>
              {breakdownLabels[key] ?? key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
