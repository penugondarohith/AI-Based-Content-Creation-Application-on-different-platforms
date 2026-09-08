"use client";
import { useRouter } from "next/navigation";
import { CreateProjectHeader } from "@/components/create-project/create-project-header";
import { IndustryCard } from "@/components/create-project/industry-card";
import { IndustryDnaPanel } from "@/components/create-project/industry-dna-panel";
import { ProjectStepper } from "@/components/create-project/project-stepper";
import { industries, getIndustry } from "@/config/industries";
import { useProject } from "@/context/project-context";

export default function CreatePage() { const router = useRouter(); const { industryId, setIndustry } = useProject(); const selected = getIndustry(industryId); return <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><CreateProjectHeader /><ProjectStepper activeStep={1} /><div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]"><section><div className="mb-6"><h2 className="text-2xl font-semibold tracking-[-.03em]">Choose your industry</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted">Your selected industry will shape the tone, vocabulary, audience, and content strategy.</p></div><div className="grid gap-3 sm:grid-cols-2">{industries.map((industry) => <IndustryCard key={industry.id} industry={industry} selected={selected.id === industry.id} onSelect={() => setIndustry(industry.id)} />)}</div><div className="mt-6 flex items-center gap-2 rounded-lg border border-dashed border-border p-4 text-xs text-muted"><span className="flex size-6 items-center justify-center rounded-full bg-surface-muted">i</span> Choose an industry first. Your selection will stay with you as you configure the strategy.</div></section><IndustryDnaPanel industry={selected} onContinue={() => router.push("/create/configure")} /></div></div>; }