"use client";

import { BarChart3, CheckCircle2, FileText, FolderKanban } from "lucide-react";
import { useProject } from "@/context/project-context";

export default function AnalyticsPage() {
  const { generatedContent, contentStrategy } = useProject();
  const approved = generatedContent.filter((item) => item.status === "READY").length;
  const edited = generatedContent.filter((item) => item.status === "EDITED").length;
  const qualityReviewed = generatedContent.filter((item) => item.qualityReport).length;
  const planned = contentStrategy?.calendarBlueprint.posts.length ?? 0;

  const metrics = [
    { label: "Planned posts", value: planned, icon: FolderKanban },
    { label: "Content generated", value: generatedContent.length, icon: FileText },
    { label: "Content approved", value: approved, icon: CheckCircle2 },
    { label: "Quality reviewed", value: qualityReviewed, icon: BarChart3 },
  ];

  return <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Performance intelligence</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em]">Content analytics</h1><p className="mt-2 text-sm text-muted">A clear view of campaign progress and content readiness.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{metrics.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-xl border border-border bg-surface p-5"><div className="flex items-center justify-between"><span className="text-sm text-muted">{label}</span><Icon size={17} className="text-primary" /></div><p className="mt-5 text-3xl font-semibold">{value}</p></div>)}</div><section className="mt-8 rounded-xl border border-border bg-surface p-6"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Campaign progress</p><div className="mt-5 h-3 overflow-hidden rounded-full bg-surface-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${planned ? Math.min(100, Math.round((generatedContent.length / planned) * 100)) : 0}%` }} /></div><div className="mt-3 flex justify-between text-xs text-muted"><span>{generatedContent.length} of {planned} posts generated</span><span>{edited} edited</span></div></section></div>;
}
