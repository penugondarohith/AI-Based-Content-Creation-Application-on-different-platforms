"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useProject } from "@/context/project-context";
import { getIndustry } from "@/config/industries";
import type { Project } from "@/types/project";
import type { GeneratedContent, GeneratedPostContent } from "@/types/generated-content";
import { contentGenerationService, createGeneratedContent } from "@/services/content-generation-service";
import { checkContentQuality } from "@/engine/content-quality-engine";
import { CampaignPostSidebar } from "./campaign-post-sidebar";
import { ContentEditor } from "./content-editor";
import { ContentPreview } from "./content-preview";
import { GenerationIntelligenceSidebar } from "./generation-intelligence-sidebar";
import { EmptyContentState } from "./empty-content-state";
import { GenerationProgress } from "./generation-progress";
import { ImageGenerationPanel } from "./image-generation-panel";
import type { ImageAspectRatio } from "@/types/generated-image";
import { generateImageForContent } from "@/services/image-generation-service";

export function ContentStudioWorkspace() {
  const { industryId, configuration, referenceFiles, brandContext, contentStrategy, generatedContent, upsertGeneratedContent, setProjectStatus } = useProject();
  const [selectedId, setSelectedId] = useState(contentStrategy?.calendarBlueprint.posts[0]?.id ?? "");
  const [draft, setDraft] = useState<GeneratedContent | null>(null);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<{ completed: number; current: string } | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const industry = getIndustry(industryId);
  const posts = contentStrategy?.calendarBlueprint.posts ?? [];
  const selectedPost = posts.find((post) => post.id === selectedId) ?? posts[0];
  const selectedItem = draft?.calendarPostId === selectedPost?.id ? draft : generatedContent.find((item) => item.calendarPostId === selectedPost?.id);
  const project = useMemo<Project>(() => ({ id: "project_current", userId: "current-user", name: `${industry.name} Campaign`, industry: industryId, configuration, referenceFiles, brandContext, contentStrategy, generatedContent, status: "STRATEGY_READY", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }), [industry.name, industryId, configuration, referenceFiles, brandContext, contentStrategy, generatedContent]);

  const generateOne = async (post = selectedPost, variation = 0) => {
    if (!post || !contentStrategy) return;
    setGenerating(true);
    setProjectStatus("CONTENT_GENERATING");
    try {
      const input = { project, calendarPost: post, industryDNA: industry, brandContext, contentStrategy };
      const content = await contentGenerationService.generateContent(input, variation);
      const generated = createGeneratedContent(input, content);

      try {
        const image = await generateImageForContent(input, generated.content.visualDirection?.composition ? "4:5" : "4:5", "Editorial", variation);
        const generatedWithImage = { ...generated, generatedImage: image, updatedAt: new Date().toISOString() };
        upsertGeneratedContent(generatedWithImage);
        setDraft(generatedWithImage);
      } catch {
        upsertGeneratedContent(generated);
        setDraft(generated);
      }

      setSelectedId(post.id);
    } finally { setGenerating(false); }
  };

  const generateAll = async () => {
    if (!contentStrategy) return;
    setProgress({ completed: 0, current: posts[0]?.contentTheme ?? "campaign" });
    for (let index = 0; index < posts.length; index += 1) {
      await generateOne(posts[index], index);
      setProgress({ completed: index + 1, current: posts[index + 1]?.contentTheme ?? "campaign complete" });
    }
    setProgress(null);
  };

  const updateDraft = (content: GeneratedPostContent) => {
    if (selectedItem) setDraft({ ...selectedItem, content, status: "EDITED", updatedAt: new Date().toISOString() });
  };
  const saveDraft = () => {
    if (draft) upsertGeneratedContent({ ...draft, qualityReport: checkContentQuality(draft.content, draft.generationContext), status: "EDITED", updatedAt: new Date().toISOString() });
  };
  const generateVisual = async (ratio: ImageAspectRatio = "4:5", style = "Editorial", post = selectedPost, variation = 0) => {
    if (!post || !contentStrategy) return;
    const current = generatedContent.find((item) => item.calendarPostId === post.id) ?? (draft?.calendarPostId === post.id ? draft : null);
    if (!current) return;
    setImageLoading(true);
    try {
      const input = { project, calendarPost: post, industryDNA: industry, brandContext, contentStrategy };
      const image = await generateImageForContent(input, ratio, style, variation);
      const updated = { ...current, generatedImage: image, updatedAt: new Date().toISOString() };
      upsertGeneratedContent(updated);
      setDraft(updated);
    } finally { setImageLoading(false); }
  };
  const generateAllVisuals = async () => {
    if (!contentStrategy) return;
    setProgress({ completed: 0, current: posts[0]?.contentTheme ?? "campaign" });
    for (let index = 0; index < posts.length; index += 1) {
      const item = generatedContent.find((content) => content.calendarPostId === posts[index].id);
      if (item) await generateVisual(item.generatedImage?.prompt.aspectRatio ?? "4:5", item.generatedImage?.prompt.visualStyle ?? "Editorial", posts[index], index);
      setProgress({ completed: index + 1, current: posts[index + 1]?.contentTheme ?? "campaign complete" });
    }
    setProgress(null);
  };

  if (!contentStrategy || posts.length === 0) {
    return <div className="space-y-5"><Link href="/create/strategy" className="inline-flex items-center gap-2 text-xs font-medium text-primary"><ArrowLeft size={14} /> Back to Content Strategy</Link><div className="rounded-xl border border-border bg-surface p-10 text-center"><h2 className="text-2xl font-semibold tracking-[-.03em]">Complete your content strategy before generating campaign content.</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">Your Content Studio will unlock when the strategy and calendar blueprint are ready.</p><Link href="/create/strategy" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-strong">Back to Content Strategy <ArrowRight size={15} /></Link></div></div>;
  }

  return <div className="space-y-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Content studio</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em]">Generate, refine, and validate</h1><p className="mt-2 text-sm text-muted">Strategy-aligned content for {industry.name}.</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => void generateAllVisuals()} className="rounded-lg border border-border px-3 py-2 text-xs text-muted hover:bg-surface-muted">Generate campaign visuals</button><Link href="/create/strategy" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted hover:bg-surface-muted"><ArrowLeft size={14} /> Strategy</Link><Link href="/create/review" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white hover:bg-primary-strong">Campaign review <ArrowRight size={14} /></Link></div></div>{progress && <GenerationProgress completed={progress.completed} total={posts.length} current={progress.current} /> }<div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)_280px]"><CampaignPostSidebar posts={posts} generated={generatedContent} selectedId={selectedPost?.id ?? ""} onSelect={(id) => { setSelectedId(id); setDraft(null); }} /><main className="min-w-0 space-y-5">{selectedItem ? <><ContentEditor item={selectedItem} onChange={updateDraft} onSave={saveDraft} onRegenerate={() => void generateOne(selectedPost, (selectedItem.postNumber + 1) % 3)} /><ImageGenerationPanel image={(draft ?? selectedItem).generatedImage} loading={imageLoading} onGenerate={(ratio, style) => void generateVisual(ratio, style, selectedPost, ((draft ?? selectedItem).generatedImage?.metadata?.generatedAt.length ?? 0) % 3)} /><ContentPreview item={draft ?? selectedItem} /></> : <EmptyContentState onGenerateFirst={() => void generateOne()} onGenerateAll={() => void generateAll()} />}{selectedItem && <button type="button" disabled={generating} onClick={() => void generateOne()} className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white disabled:opacity-50">{generating ? "Creating strategy-aligned content..." : "Generate selected post"}</button>}</main>{selectedItem ? <GenerationIntelligenceSidebar item={draft ?? selectedItem} onRecheck={() => draft && setDraft({ ...draft, qualityReport: checkContentQuality(draft.content, draft.generationContext) })} /> : <div className="hidden lg:block" />}</div></div>;
}
