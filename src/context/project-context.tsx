"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { industries } from "@/config/industries";
import type { IndustryId } from "@/types/industry";
import type { ContentConfiguration } from "@/types/content-configuration";
import type { ReferenceFile } from "@/types/reference-file";
import type { BrandContext } from "@/types/brand-context";
import type { ContentStrategy } from "@/types/content-strategy";
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
  projectStatus: "CONFIGURING" | "STRATEGY_READY";
  setIndustry: (id: IndustryId) => void;
  updateConfiguration: (update: Partial<ContentConfiguration>) => void;
  setDuration: (duration: ContentConfiguration["duration"]) => void;
  addReferenceFile: (file: ReferenceFile) => void;
  removeReferenceFile: (id: string) => void;
  updateReferenceFile: (id: string, update: Partial<ReferenceFile>) => void;
  setBrandContext: (context: BrandContext | null) => void;
  updateBrandContext: (update: Partial<BrandContext>) => void;
  setContentStrategy: (strategy: ContentStrategy | null) => void;
  setProjectStatus: (status: "CONFIGURING" | "STRATEGY_READY") => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [industryId, setIndustryId] = useState<IndustryId>(industries[1].id);
  const [configuration, setConfiguration] = useState(defaultConfiguration);
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([]);
  const [brandContext, setBrandContextState] = useState<BrandContext | null>(null);
  const [contentStrategy, setContentStrategyState] = useState<ContentStrategy | null>(null);
  const [projectStatus, setProjectStatus] = useState<"CONFIGURING" | "STRATEGY_READY">("CONFIGURING");

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

  const value = useMemo(
    () => ({
      industryId,
      configuration,
      referenceFiles,
      brandContext,
      contentStrategy,
      projectStatus,
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
    }),
    [
      industryId,
      configuration,
      referenceFiles,
      brandContext,
      contentStrategy,
      projectStatus,
      addReferenceFile,
      removeReferenceFile,
      updateReferenceFile,
      setBrandContext,
      updateBrandContext,
      setContentStrategy,
      setProjectStatus,
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