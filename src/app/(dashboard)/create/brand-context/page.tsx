"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { getIndustry } from "@/config/industries";
import { CreateProjectHeader } from "@/components/create-project/create-project-header";
import { ProjectStepper } from "@/components/create-project/project-stepper";
import { useProject } from "@/context/project-context";

function parseList(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function BrandContextPage() {
  const router = useRouter();
  const { industryId, brandContext, setBrandContext } = useProject();
  const industry = getIndustry(industryId);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    brandName: brandContext?.brandName ?? "",
    brandDescription: brandContext?.brandDescription ?? "",
    products: brandContext?.products.join("\n") ?? "",
    keyFeatures: brandContext?.keyFeatures.join(", ") ?? "",
    targetAudience: brandContext?.targetAudience ?? "",
    brandTone: brandContext?.brandTone.join(", ") ?? "",
    uniqueSellingPoints: brandContext?.uniqueSellingPoints.join("\n") ?? "",
    keywords: brandContext?.keywords.join(", ") ?? "",
  });

  const completed = useMemo(() => {
    return [form.brandName, form.brandDescription, form.products, form.targetAudience].every(Boolean);
  }, [form]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const continueFlow = () => {
    if (!form.brandName.trim()) {
      setError("Please tell us the company or brand name before continuing.");
      return;
    }

    if (!form.brandDescription.trim()) {
      setError("Please add a short description of the company or product.");
      return;
    }

    if (!form.products.trim()) {
      setError("Please list at least one main product or offering.");
      return;
    }

    setBrandContext({
      brandName: form.brandName.trim(),
      brandDescription: form.brandDescription.trim(),
      industry: industryId,
      products: parseList(form.products),
      keyFeatures: parseList(form.keyFeatures),
      targetAudience: form.targetAudience.trim(),
      brandTone: parseList(form.brandTone),
      uniqueSellingPoints: parseList(form.uniqueSellingPoints),
      keywords: parseList(form.keywords),
      extractedInsights: [],
      sourceFileIds: [],
    });

    setError("");
    router.push("/create/strategy");
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8">
      <CreateProjectHeader />
      <ProjectStepper activeStep={4} />

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Phase 3</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">Tell us about your company</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Before we generate campaign content, give us the brand and product details that should shape the strategy.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">Company or brand name</label>
            <input
              value={form.brandName}
              onChange={(event) => updateField("brandName", event.target.value)}
              placeholder="Example: Maison Éclat"
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">Short brand description</label>
            <textarea
              value={form.brandDescription}
              onChange={(event) => updateField("brandDescription", event.target.value)}
              placeholder="What is the company known for?"
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">Main products or services</label>
            <textarea
              value={form.products}
              onChange={(event) => updateField("products", event.target.value)}
              placeholder="One per line or comma separated"
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Primary audience</label>
            <input
              value={form.targetAudience}
              onChange={(event) => updateField("targetAudience", event.target.value)}
              placeholder="Luxury buyers, families, investors..."
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Brand tone</label>
            <input
              value={form.brandTone}
              onChange={(event) => updateField("brandTone", event.target.value)}
              placeholder="Premium, confident, elegant"
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Key features</label>
            <input
              value={form.keyFeatures}
              onChange={(event) => updateField("keyFeatures", event.target.value)}
              placeholder="Handcrafted, limited edition, eco-conscious"
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Unique selling points</label>
            <textarea
              value={form.uniqueSellingPoints}
              onChange={(event) => updateField("uniqueSellingPoints", event.target.value)}
              placeholder="One per line or comma separated"
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground">Brand keywords</label>
            <input
              value={form.keywords}
              onChange={(event) => updateField("keywords", event.target.value)}
              placeholder="luxury, craftsmanship, modern, premium"
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/create/configure" className="inline-flex items-center gap-2 text-sm font-medium text-muted">
            <ArrowLeft size={15} /> Back to configuration
          </Link>

          <button
            type="button"
            onClick={continueFlow}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!completed}
          >
            Build content strategy <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
