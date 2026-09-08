"use client";

import { motion } from "framer-motion";
import type { BrandInsight } from "@/types/brand-context";
import type { ReferenceFile } from "@/types/reference-file";
import { SourceAttribution } from "./source-attribution";

export function BrandInsightCard({
  insight,
  files,
}: {
  insight: BrandInsight;
  files: ReferenceFile[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border bg-surface p-4 transition hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-block rounded bg-primary-soft px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary">
            {insight.category}
          </span>
          <h4 className="mt-2 text-sm font-semibold">{insight.title}</h4>
          <p className="mt-1.5 text-xs leading-5 text-muted">
            {insight.description}
          </p>
        </div>

        {insight.confidence !== undefined && (
          <span className="shrink-0 rounded-full bg-surface-muted px-2 py-0.5 text-[9px] font-medium text-muted">
            {Math.round(insight.confidence * 100)}%
          </span>
        )}
      </div>

      <div className="mt-3 border-t border-border pt-2">
        <SourceAttribution sourceFileId={insight.sourceFileId} files={files} />
      </div>
    </motion.div>
  );
}
