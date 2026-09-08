"use client";

import { templateMeta, type PostTemplate } from "@/types/post-template";

export function TemplateSelector({
  value,
  onChange,
}: {
  value: PostTemplate;
  onChange: (value: PostTemplate) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Object.entries(templateMeta).map(([key, meta]) => {
        const template = key as PostTemplate;
        const selected = value === template;

        return (
          <button
            key={template}
            type="button"
            onClick={() => onChange(template)}
            className={`rounded-xl border p-3 text-left transition ${
              selected
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-surface hover:bg-surface-muted"
            }`}
          >
            <div
              className="mb-3 h-20 rounded-lg border border-border"
              style={{ background: `linear-gradient(135deg, ${meta.accent}, #111827)` }}
            />
            <p className="text-sm font-semibold">{meta.label}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{meta.description}</p>
          </button>
        );
      })}
    </div>
  );
}
