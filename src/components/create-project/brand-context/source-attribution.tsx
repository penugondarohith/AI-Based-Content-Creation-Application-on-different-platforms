"use client";

import { FileText } from "lucide-react";
import type { ReferenceFile } from "@/types/reference-file";

export function SourceAttribution({
  sourceFileId,
  files,
}: {
  sourceFileId?: string;
  files: ReferenceFile[];
}) {
  if (!sourceFileId) return null;

  const file = files.find((f) => f.id === sourceFileId);
  if (!file) return null;

  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-muted">
      <FileText size={10} className="shrink-0" />
      <span className="max-w-[140px] truncate" title={file.name}>
        {file.name}
      </span>
    </span>
  );
}
