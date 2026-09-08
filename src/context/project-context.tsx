"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, startTransition } from "react";
import type { ReactNode } from "react";
import { industries } from "@/config/industries";
import type { IndustryId } from "@/types/industry";
import type { ContentConfiguration } from "@/types/content-configuration";
import type { ReferenceFile } from "@/types/reference-file";
import type { BrandContext } from "@/types/brand-context";
import type { ContentStrategy } from "@/types/content-strategy";
import type { GeneratedContent } from "@/types/generated-content";
import type { CategoryDetails } from "@/types/category-details";
import { recommendedPostCounts } from "@/lib/content-configuration";
import { useAuth } from "@/context/auth-context";
import { getProjects, recordProjectActivity, saveProject } from "@/services/project-service";
import type { Project } from "@/types/project";

const defaultConfiguration: ContentConfiguration = {
  duration: "ONE_MONTH",
  postCount: 12,
  isCustomPostCount: false,
  primaryGoal: null,
  contentFormats: [],
  targetAudience: null,
  customAudience: "",
  tonePreferences: [],
  platform: "INSTAGRAM",
};

type ProjectContextValue = {
  industryId: IndustryId;
  configuration: ContentConfiguration;
  referenceFiles: ReferenceFile[];
  brandContext: BrandContext | null;
  categoryDetails: CategoryDetails | null;
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
  setCategoryDetails: (details: CategoryDetails | null) => void;
  updateBrandContext: (update: Partial<BrandContext>) => void;
  setContentStrategy: (strategy: ContentStrategy | null) => void;
  setProjectStatus: (status: "CONFIGURING" | "STRATEGY_READY" | "CONTENT_GENERATING" | "CONTENT_READY") => void;
  upsertGeneratedContent: (content: GeneratedContent) => void;
  removeGeneratedContent: (id: string) => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? "anonymous";
  const hydratedUserId = useRef<string | null>(null);
  const [industryId, setIndustryId] = useState<IndustryId>(industries[1].id);
  const [configuration, setConfiguration] = useState(defaultConfiguration);
  const [referenceFiles, setReferenceFiles] = useState<ReferenceFile[]>([]);
  const [brandContext, setBrandContextState] = useState<BrandContext | null>(null);
  const [categoryDetails, setCategoryDetailsState] = useState<CategoryDetails | null>(null);
  const [contentStrategy, setContentStrategyState] = useState<ContentStrategy | null>(() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(window.localStorage.getItem(`contentforge_content_strategy_${userId}`) ?? "null") as ContentStrategy | null; } catch { return null; }
  });
  const [projectStatus, setProjectStatus] = useState<"CONFIGURING" | "STRATEGY_READY" | "CONTENT_GENERATING" | "CONTENT_READY">("CONFIGURING");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem(`contentforge_generated_content_${userId}`) ?? "[]") as GeneratedContent[]; } catch { return []; }
  });

  useEffect(() => {
    if (!user || typeof window === "undefined") return;
    const storedProject = getProjects(user.id).find((project) => project.id === `project_current_${user.id}`);
    hydratedUserId.current = user.id;
    if (storedProject) {
      startTransition(() => {
        setIndustryId(storedProject.industry);
        setConfiguration(storedProject.configuration);
        setReferenceFiles(storedProject.referenceFiles);
        setBrandContextState(storedProject.brandContext);
        setCategoryDetailsState(storedProject.categoryDetails ?? null);
        setContentStrategyState(storedProject.contentStrategy);
        setGeneratedContent(storedProject.generatedContent);
        setProjectStatus(storedProject.status === "CONTENT_READY" ? "CONTENT_READY" : storedProject.contentStrategy ? "STRATEGY_READY" : "CONFIGURING");
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user || hydratedUserId.current !== user.id || typeof window === "undefined") return;
    if (!brandContext && !categoryDetails && !contentStrategy && generatedContent.length === 0) return;
    window.localStorage.setItem(`contentforge_generated_content_${user.id}`, JSON.stringify(generatedContent));
    if (contentStrategy) window.localStorage.setItem(`contentforge_content_strategy_${user.id}`, JSON.stringify(contentStrategy));
    const project: Project = {
      id: `project_current_${user.id}`,
      userId: user.id,
      name: brandContext?.brandName ? `${brandContext.brandName} Campaign` : `${industries.find((item) => item.id === industryId)?.name ?? "Content"} Campaign`,
      industry: industryId,
      configuration,
      referenceFiles,
      brandContext,
      categoryDetails,
      contentStrategy,
      generatedContent,
      status: projectStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(project);
  }, [user, industryId, configuration, referenceFiles, brandContext, categoryDetails, contentStrategy, generatedContent, projectStatus]);

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
      if (user) recordProjectActivity(user.id, `project_current_${user.id}`, strategy ? "STRATEGY_READY" : "PROJECT_UPDATED", strategy ? "Content strategy completed" : "Content strategy reset");
    },
    [user]
  );
  const setCategoryDetails = useCallback((details: CategoryDetails | null) => setCategoryDetailsState(details), []);

  const upsertGeneratedContent = useCallback((content: GeneratedContent) => {
    setGeneratedContent((current) => [...current.filter((item) => item.id !== content.id), content].sort((a, b) => a.postNumber - b.postNumber));
    setProjectStatus("CONTENT_READY");
    if (user) recordProjectActivity(user.id, `project_current_${user.id}`, "CONTENT_GENERATED", `Generated post ${content.postNumber}`);
  }, [user]);
  const removeGeneratedContent = useCallback((id: string) => setGeneratedContent((current) => current.filter((item) => item.id !== id)), []);

  const value = useMemo(
    () => ({
      industryId,
      configuration,
      referenceFiles,
      brandContext,
      categoryDetails,
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
      setCategoryDetails,
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
      categoryDetails,
      contentStrategy,
      projectStatus,
      generatedContent,
      addReferenceFile,
      removeReferenceFile,
      updateReferenceFile,
      setBrandContext,
      setCategoryDetails,
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