"use client";

import { SUPPORTED_FORMAT_BADGES } from "@/config/file-upload";

export function SupportedFileTypes() {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {SUPPORTED_FORMAT_BADGES.map((format) => (
        <span
          key={format}
          className="rounded-md bg-surface-muted px-2 py-1 text-[10px] font-medium tracking-wide text-muted"
        >
          {format}
        </span>
      ))}
    </div>
  );
}
