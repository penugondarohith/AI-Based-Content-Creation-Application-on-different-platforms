"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getIndustry } from "@/config/industries";
import { useProject } from "@/context/project-context";
import { ContentDurationSelector } from "./content-duration-selector";
import { PostVolumeSelector } from "./post-volume-selector";
import { ContentGoalSelector } from "./content-goal-selector";
import { ContentFormatSelector } from "./content-format-selector";
import { AudienceSelector } from "./audience-selector";
import { ToneSelector } from "./tone-selector";
import { PlatformSelector } from "./platform-selector";
import { StrategySummary } from "./strategy-summary";
import { NavigationControls } from "../navigation-controls";

export function ConfigurationWorkspace() {
  const router = useRouter();
  const { industryId, configuration, updateConfiguration, setDuration } = useProject();
  const industry = getIndustry(industryId);
  const [error, setError] = useState("");
  const validate = () => {
    if (!configuration.primaryGoal) return "Choose a primary content goal to continue.";
    if (!configuration.contentFormats.length) return "Select at least one content format to continue.";
    if (!configuration.targetAudience) return "Choose a target audience to continue.";
    if (configuration.targetAudience === "CUSTOM_AUDIENCE" && !configuration.customAudience.trim()) return "Describe your custom audience to continue.";
    return "";
  };
  const continueFlow = () => {
    const message = validate();
    if (message) { setError(message); return; }
    setError("");
    router.push("/create/category-details");
  };
  return <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"><section className="space-y-9"><div className="rounded-xl border border-border bg-surface p-5 sm:p-7"><div className="mb-8 flex items-start justify-between gap-4"><div><h2 className="text-2xl font-semibold tracking-[-.03em]">Configure Your Content Strategy</h2><p className="mt-2 max-w-xl text-sm leading-6 text-muted">Define the duration, content objectives, formats, and audience for your campaign.</p></div><span className="hidden rounded-lg bg-primary-soft px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-primary sm:block">{industry.name} strategy</span></div><div className="space-y-9"><ContentDurationSelector value={configuration.duration} onChange={setDuration} /><PostVolumeSelector duration={configuration.duration} value={configuration.postCount} custom={configuration.isCustomPostCount} onChange={(postCount) => updateConfiguration({ postCount, isCustomPostCount: postCount !== ({ ONE_WEEK: 3, TWO_WEEKS: 6, ONE_MONTH: 12 } as const)[configuration.duration] })} /><ContentGoalSelector value={configuration.primaryGoal} onChange={(primaryGoal) => updateConfiguration({ primaryGoal })} /><ContentFormatSelector value={configuration.contentFormats} onChange={(contentFormats) => updateConfiguration({ contentFormats })} /><AudienceSelector value={configuration.targetAudience} customAudience={configuration.customAudience} onChange={(targetAudience) => updateConfiguration({ targetAudience })} onCustomAudienceChange={(customAudience) => updateConfiguration({ customAudience })} /><ToneSelector industryTone={industry.tone} value={configuration.tonePreferences} onChange={(tonePreferences) => updateConfiguration({ tonePreferences })} /><PlatformSelector value={configuration.platform ?? "INSTAGRAM"} onChange={(platform) => updateConfiguration({ platform })} /></div>{error && <p role="alert" className="mt-8 rounded-lg border border-danger/20 bg-red-50 px-3 py-2.5 text-xs text-danger">{error}</p>}<div className="mt-8"><NavigationControls onBack={() => router.push("/create")} onContinue={continueFlow} /></div></div></section><StrategySummary configuration={configuration} industry={industry} /></div>;
}
