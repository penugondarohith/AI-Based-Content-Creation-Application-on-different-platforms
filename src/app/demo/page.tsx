"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { loadDemoProject } from "@/services/demo-project-service";
import { PostRenderer } from "@/components/post-composer/post-renderer";
import type { ComposedPost } from "@/types/composed-post";

const demoSteps = [
  { id: 1, title: "Industry Intelligence", description: "ContentForge maps the market context and product positioning." },
  { id: 2, title: "Campaign Configuration", description: "The system aligns objective, audience, and content formats." },
  { id: 3, title: "Brand Knowledge", description: "Brand voice, tone, and product signals are captured." },
  { id: 4, title: "Content Strategy", description: "A structured content calendar and pillar mix are established." },
  { id: 5, title: "Content Generation", description: "Campaign hooks, captions, and CTA frameworks are generated." },
  { id: 6, title: "AI Visual Generation", description: "Visual directions are transformed into supporting creative assets." },
  { id: 7, title: "Campaign Review", description: "The content is assessed for quality and strategic fit." },
  { id: 8, title: "Platform Optimization", description: "Each post is adapted for the right channel and format." },
  { id: 9, title: "Performance Intelligence", description: "Signals and recommendations are surfaced for optimization." },
];

export default function DemoPage() {
  const demo = useMemo(() => loadDemoProject(), []);
  const [step, setStep] = useState(1);
  const [selectedPost, setSelectedPost] = useState(0);
  const [platform, setPlatform] = useState("Instagram");

  const current = demoSteps[step - 1];
  const content = demo.generatedContent[selectedPost] ?? demo.generatedContent[0];
  const post: ComposedPost = {
    id: "demo-composed-post",
    projectId: demo.project.id,
    generatedContentId: content.id,
    generatedImageId: content.generatedImage?.id,
    status: "READY",
    template: "EDITORIAL",
    aspectRatio: "4:5",
    imageUrl: content.generatedImage?.imageUrl,
    composition: {
      backgroundImageUrl: content.generatedImage?.imageUrl,
      headline: content.content.hook,
      subheadline: content.content.callToAction,
      brandName: demo.brandContext.brandName,
      textPosition: "LEFT",
      overlayStyle: "GRADIENT",
      visualStyle: content.content.visualDirection.concept,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const goNext = () => setStep((prev) => Math.min(prev + 1, demoSteps.length));
  const goPrev = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <main className="min-h-screen bg-[#0e1222] text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-300">Explore ContentForge AI</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">Experience the complete AI-powered campaign workflow</h1>
          </div>
          <Link href="/" className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-white/30 hover:text-white">Back to home</Link>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <button type="button" onClick={goPrev} className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10">Previous</button>
          <button type="button" onClick={goNext} className="rounded-lg bg-violet-500 px-4 py-3 text-sm font-medium text-white hover:bg-violet-400">Next step</button>
          <button type="button" className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10">Reset demo</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-violet-300">Demo progress</p>
            <div className="mt-5 space-y-3">
              {demoSteps.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                    item.id === step ? "border-violet-400 bg-violet-500/15" : "border-white/10 bg-transparent"
                  }`}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[.18em] text-white/45">0{item.id}</p>
                    <p className="mt-1 text-sm font-medium text-white">{item.title}</p>
                  </div>
                  {item.id <= step && <CheckCircle2 size={16} className="text-emerald-300" />}
                </button>
              ))}
            </div>
          </aside>

          <motion.section
            key={step}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-violet-300">Demo simulation</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{current.title}</h2>
              </div>
              <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">Step {step}/9</span>
            </div>

            <p className="max-w-3xl text-base leading-7 text-white/70">{current.description}</p>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
              <div className="rounded-2xl border border-white/10 bg-[#11182d] p-4">
                <p className="text-xs uppercase tracking-[.2em] text-white/50">Example data</p>
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[.2em] text-white/45">Brand</p>
                    <p className="mt-2 text-xl font-semibold">{demo.brandContext.brandName}</p>
                    <p className="mt-2 text-sm text-white/65">{demo.brandContext.brandDescription}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[.2em] text-white/45">Campaign goal</p>
                    <p className="mt-2 text-lg font-medium">{demo.project.goal}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#11182d] p-4">
                <p className="text-xs uppercase tracking-[.2em] text-white/50">Live generated output</p>
                <div className="mt-4 flex justify-center">
                  <PostRenderer post={post} />
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-violet-300">Post explorer</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Generated posts</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <BarChart3 size={16} className="text-violet-300" /> Demo performance data
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {demo.generatedContent.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPost(index)}
                className={`overflow-hidden rounded-2xl border text-left transition ${index === selectedPost ? "border-violet-400 bg-violet-500/10" : "border-white/10 bg-[#11182d]"}`}
              >
                <img src={item.generatedImage?.imageUrl} alt={item.content.title} className="h-44 w-full object-cover" />
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-[.18em] text-white/45">Post 0{item.postNumber}</p>
                  <p className="mt-2 font-medium text-white">{item.content.title}</p>
                  <p className="mt-2 text-xs text-white/60">{item.content.visualDirection.subjectFocus}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-[10px] uppercase tracking-[.2em] text-violet-300">Platform optimization</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Instagram", "LinkedIn", "Facebook", "X"].map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setPlatform(entry)}
                  className={`rounded-full px-3 py-2 text-xs ${platform === entry ? "bg-violet-500 text-white" : "border border-white/10 bg-transparent text-white/70"}`}
                >
                  {entry}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-[#11182d] p-4">
              <p className="text-[10px] uppercase tracking-[.2em] text-white/45">Optimized content</p>
              <p className="mt-3 text-lg font-medium">{platform}</p>
              <p className="mt-3 text-sm leading-7 text-white/70">{demo.platformContent.find((item) => item.platform === platform)?.caption}</p>
              <p className="mt-3 text-sm text-violet-200">CTA: {demo.platformContent.find((item) => item.platform === platform)?.cta}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-[10px] uppercase tracking-[.2em] text-violet-300">Analytics</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#11182d] p-4"><p className="text-[10px] uppercase text-white/45">Reach</p><p className="mt-2 text-2xl font-semibold">{demo.performance.totalReach}</p></div>
              <div className="rounded-xl border border-white/10 bg-[#11182d] p-4"><p className="text-[10px] uppercase text-white/45">Engagement</p><p className="mt-2 text-2xl font-semibold">{demo.performance.engagement}</p></div>
              <div className="rounded-xl border border-white/10 bg-[#11182d] p-4"><p className="text-[10px] uppercase text-white/45">ER</p><p className="mt-2 text-2xl font-semibold">{demo.performance.engagementRate}</p></div>
              <div className="rounded-xl border border-white/10 bg-[#11182d] p-4"><p className="text-[10px] uppercase text-white/45">Top</p><p className="mt-2 text-lg font-semibold">{demo.performance.topPlatform}</p></div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[.2em] text-violet-300">Take product tour</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Ready to build your own campaign?</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/sign-up" className="rounded-lg bg-violet-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-400">Create account</Link>
              <Link href="/" className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:border-white/30">Back to demo</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
