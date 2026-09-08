"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { industries } from "@/config/industries";
import type { IndustryId } from "@/types/industry";
import type { ContentConfiguration } from "@/types/content-configuration";
import type { ReferenceFile } from "@/types/reference-file";
import type { BrandContext } from "@/types/brand-context";
import type { ContentStrategy } from "@/types/content-strategy";
import type { GeneratedContent } from "@/types/generated-content";
import { recommendedPostCounts } from "@/lib/content-configuration";

const defaultConfiguration: ContentConfiguration = {
  duration: "ONE_MONTH",
  postCount: 12,
  isCustomPostCount: false,
  primaryGoal: null,
  contentFormats: [],
  targetAudience: null,
  customAudience: "",
  tonePreferences: [],
};

type ProjectContextValue = {
  industryId: IndustryId;
  configuration: ContentConfiguration;
  referenceFiles: ReferenceFile[];
  brandContext: BrandContext | null;
  contentStrategy: ContentStrategy | null;
  projectStatus: "CONFIGURING" | "STRATEGY_READY" | "CONTENT_GENERATING" | "CONTENT_READY";
  generatedContent: GeneratedContent[];
  setIndustry: (id: IndustryId) => void;
  updateConfiguration: (update: Partial<ContentConfiguration>) => void;
  setDuration: (duration: ContentConfiguration["duration"]) => void;
  addReferenceFile: (file: ReferenceFile) => void;
  removeReferenceFile: (id: string) => void;
  updateReferenceFile: (id: string, update: Partial<ReferenceFile>) => void;
  setBrandContext: (context: BrandContext | null) => void;
  updateBrandContext: (update: Partial<BrandContext>) => void;
  setContentStrategy: (strategy: ContentStrategy | null) => void;
  setProjectStatus: (status: "CONFIGURING" | "STRATEGY_READY" | "CONTENT_GENERATING" | "CONTENT_READY") => void;
  upsertGeneratedContent: (content: GeneratedContent) => void;
  removeGeneratedContent: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [industryId, setIndustryId] = useState<IndustryId>(industries[1].id);
  const [configuration, setConfiguration] = useState(defaultConfiguration);
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([]);
  const [brandContext, setBrandContextState] = useState<BrandContext | null>(null);
  const [contentStrategy, setContentStrategyState] = useState<ContentStrategy | null>(() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(window.localStorage.getItem("contentforge_content_strategy") ?? "null") as ContentStrategy | null; } catch { return null; }
  });
  const [projectStatus, setProjectStatus] = useState<"CONFIGURING" | "STRATEGY_READY" | "CONTENT_GENERATING" | "CONTENT_READY">("CONFIGURING");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("contentforge_generated_content") ?? "[]") as GeneratedContent[]; } catch { return []; }
  });

  useEffect(() => { window.localStorage.setItem("contentforge_generated_content", JSON.stringify(generatedContent)); }, [generatedContent]);
  useEffect(() => { if (contentStrategy) window.localStorage.setItem("contentforge_content_strategy", JSON.stringify(contentStrategy)); }, [contentStrategy]);

  const addReferenceFile = useCallback(
    (file: ReferenceFile) => setReferenceFiles((prev) => [...prev, file]),
    []
  );

  const removeReferenceFile = useCallback(
    (id: string) => setReferenceFiles((prev) => prev.filter((f) => f.id !== id)),
    []
  );

  const updateReferenceFile = useCallback(
    (id: string, update: Partial<ReferenceFile>) =>
      setReferenceFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...update } : f))
      ),
    []
  );

  const setBrandContext = useCallback(
    (context: BrandContext | null) => setBrandContextState(context),
    []
  );

  const updateBrandContext = useCallback(
    (update: Partial<BrandContext>) =>
      setBrandContextState((prev) => (prev ? { ...prev, ...update } : null)),
    []
  );

  const setContentStrategy = useCallback(
    (strategy: ContentStrategy | null) => {
      setContentStrategyState(strategy);
      setProjectStatus(strategy ? "STRATEGY_READY" : "CONFIGURING");
    },
    []
  );

  const upsertGeneratedContent = useCallback((content: GeneratedContent) => {
    setGeneratedContent((current) => [...current.filter((item) => item.id !== content.id), content].sort((a, b) => a.postNumber - b.postNumber));
    setProjectStatus("CONTENT_READY");
  }, []);
  const removeGeneratedContent = useCallback((id: string) => setGeneratedContent((current) => current.filter((item) => item.id !== id)), []);

  const value = useMemo(
    () => ({
      industryId,
      configuration,
      referenceFiles,
      brandContext,
      contentStrategy,
      projectStatus,
      generatedContent,
      setIndustry: setIndustryId,
      updateConfiguration: (update: Partial<ContentConfiguration>) =>
        setConfiguration((current) => ({ ...current, ...update })),
      setDuration: (duration: ContentConfiguration["duration"]) =>
        setConfiguration((current) => ({
          ...current,
          duration,
          postCount: recommendedPostCounts[duration],
          isCustomPostCount: false,
        })),
      addReferenceFile,
      removeReferenceFile,
      updateReferenceFile,
      setBrandContext,
      updateBrandContext,
      setContentStrategy,
      setProjectStatus,
      upsertGeneratedContent,
      removeGeneratedContent,
    }),
    [
      industryId,
      configuration,
      referenceFiles,
      brandContext,
      contentStrategy,
      projectStatus,
      generatedContent,
      addReferenceFile,
      removeReferenceFile,
      updateReferenceFile,
      setBrandContext,
      updateBrandContext,
      setContentStrategy,
      setProjectStatus,
      upsertGeneratedContent,
      removeGeneratedContent,
    ]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject() {
  const value = useContext(ProjectContext);
  if (!value) throw new Error("useProject must be used inside ProjectProvider");
  return value;
}