"use client";

import Link from "next/link";
import { ArrowLeft, Check, Download } from "lucide-react";
import { useProject } from "@/context/project-context";
import { CreateProjectHeader } from "@/components/create-project/create-project-header";
import { ProjectStepper } from "@/components/create-project/project-stepper";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-3 text-xl font-semibold">{value}</p>
    </div>
  );
}

export default function ReviewPage() {
  const { generatedContent } = useProject();

  const visualCount = generatedContent.filter((item) => item.generatedImage?.status === "READY").length;
  const textCount = generatedContent.filter((item) => item.status === "READY" || item.status === "EDITED").length;
  const qualityCount = generatedContent.filter((item) => item.qualityReport && item.qualityReport.score >= 70).length;
  const total = Math.max(generatedContent.length, 1);
  const readiness = Math.round((textCount / total) * 40 + (visualCount / total) * 35 + (qualityCount / total) * 25);

  const exportCampaign = (type: "json" | "csv") => {
    const payload =
      type === "json"
        ? JSON.stringify(generatedContent, null, 2)
        : [
            "postNumber,contentStatus,visualStatus,imageUrl",
            ...generatedContent.map(
              (item) =>
                `${item.postNumber},${item.status},${item.generatedImage?.status ?? "NOT_GENERATED"},${item.generatedImage?.imageUrl ?? ""}`
            ),
          ].join("\n");

    const link = document.createElement("a");
    link.href = `data:text/${type === "json" ? "json" : "csv"};charset=utf-8,${encodeURIComponent(payload)}`;
    link.download = `contentforge-campaign.${type}`;
    link.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
      <CreateProjectHeader />
      <ProjectStepper activeStep={5} />

      <div className="mt-10">
        <div className="rounded-xl bg-[#222149] p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-violet-200">Phase 6</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Campaign Review &amp; Export</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                Review your complete campaign, finalize your content, organize your publishing plan, and prepare your campaign for export.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/45">Campaign readiness</p>
              <p className="mt-1 text-4xl font-semibold">
                {readiness}
                <span className="text-base text-white/45"> / 100</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Metric label="Text content" value={`${textCount} ready`} />
          <Metric label="Visual completion" value={`${visualCount} ready`} />
          <Metric label="Quality reviewed" value={`${qualityCount} checked`} />
        </div>

        <section className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="border-b border-border px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Campaign posts</p>
            <h3 className="mt-1 text-lg font-semibold">Text + visual readiness</h3>
          </div>

          {generatedContent.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted">
              Your campaign is empty. Generate content in the studio before reviewing it here.
            </div>
          ) : (
            generatedContent.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 border-b border-border px-5 py-4 last:border-0 sm:flex-row sm:items-center"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-xs font-semibold text-primary">
                  {String(item.postNumber).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.content.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    Content {item.status} · Visual {item.generatedImage?.status ?? "NOT_GENERATED"}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted">
                  {item.qualityReport ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
                      <Check size={12} /> Score {item.qualityReport.score}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-amber-700">
                      Pending review
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/create/generate"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <ArrowLeft size={15} /> Back to content studio
          </Link>
          <button
            type="button"
            onClick={() => exportCampaign("csv")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <Download size={15} /> Export CSV
          </button>
          <button
            type="button"
            onClick={() => exportCampaign("json")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-strong"
          >
            <Download size={15} /> Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}
