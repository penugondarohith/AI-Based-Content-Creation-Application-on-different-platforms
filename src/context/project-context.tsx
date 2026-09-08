"use client";
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { industries } from "@/config/industries";
import type { IndustryId } from "@/types/industry";
import type { ContentConfiguration } from "@/types/content-configuration";
import { recommendedPostCounts } from "@/lib/content-configuration";

const defaultConfiguration: ContentConfiguration = { duration: "ONE_MONTH", postCount: 12, isCustomPostCount: false, primaryGoal: null, contentFormats: [], targetAudience: null, customAudience: "", tonePreferences: [] };
type ProjectContextValue = { industryId: IndustryId; configuration: ContentConfiguration; setIndustry: (id: IndustryId) => void; updateConfiguration: (update: Partial<ContentConfiguration>) => void; setDuration: (duration: ContentConfiguration["duration"]) => void };
const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) { const [industryId, setIndustryId] = useState<IndustryId>(industries[1].id); const [configuration, setConfiguration] = useState(defaultConfiguration); const value = useMemo(() => ({ industryId, configuration, setIndustry: setIndustryId, updateConfiguration: (update: Partial<ContentConfiguration>) => setConfiguration((current) => ({ ...current, ...update })), setDuration: (duration: ContentConfiguration["duration"]) => setConfiguration((current) => ({ ...current, duration, postCount: recommendedPostCounts[duration], isCustomPostCount: false })) }), [industryId, configuration]); return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>; }
export function useProject() { const value = useContext(ProjectContext); if (!value) throw new Error("useProject must be used inside ProjectProvider"); return value; }