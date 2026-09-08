"use client";

import { CheckCircle2, Loader2, AlertCircle, Upload } from "lucide-react";
import type { ReferenceFileStatus } from "@/types/reference-file";

const statusConfig: Record<
  ReferenceFileStatus,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  UPLOADED: {
    label: "Uploaded",
    color: "text-primary",
    bg: "bg-primary-soft",
    icon: Upload,
  },
  PROCESSING: {
    label: "Analyzing...",
    color: "text-warning",
    bg: "bg-amber-50",
    icon: Loader2,
  },
  READY: {
    label: "Ready",
    color: "text-success",
    bg: "bg-emerald-50",
    icon: CheckCircle2,
  },
  ERROR: {
    label: "Error",
    color: "text-danger",
    bg: "bg-red-50",
    icon: AlertCircle,
  },
};

export function UploadStatus({ status }: { status: ReferenceFileStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${config.bg} ${config.color}`}
    >
      <Icon
        size={12}
        className={status === "PROCESSING" ? "animate-spin" : ""}
      />
      {config.label}
    </span>
  );
}
