"use client";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const pipeline = ["Industry DNA", "Brand Intelligence", "Content Strategy", "Content Calendar"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#161735] text-white">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto grid min-h-[700px] max-w-7xl items-center gap-16 px-5 pb-20 pt-36 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pb-24">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-7 flex items-center gap-2 text-sm text-violet-200"><Sparkles size={15} /> Industry-aware intelligence for modern brands</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="max-w-2xl text-5xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">Create content that <span className="text-violet-300">understands</span> your industry.</motion.h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">ContentForge AI transforms industry knowledge, brand context, and content strategy into high-quality social media content.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/create" className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-primary-strong transition hover:bg-violet-100">Create content strategy <ArrowRight size={16} /></Link>
            <Link href="/demo" className="rounded-lg border border-white/15 px-5 py-3 text-sm text-white/75 transition hover:border-white/30 hover:text-white">Explore demo</Link>
            <a href="#workflow" className="rounded-lg border border-white/15 px-5 py-3 text-sm text-white/75 transition hover:border-white/30 hover:text-white">Explore platform</a>
          </div>
          <div className="mt-11 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/45"><span className="flex items-center gap-2"><Check size={14} className="text-violet-300" /> Industry-specific by design</span><span className="flex items-center gap-2"><Check size={14} className="text-violet-300" /> Built for brand teams</span></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .18 }} className="relative mx-auto w-full max-w-[470px]">
          <div className="absolute -inset-8 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative rounded-2xl border border-white/15 bg-white/[.07] p-4 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 px-2 pb-4"><span className="text-xs text-white/50">CONTENT INTELLIGENCE LAYER</span><span className="flex items-center gap-1.5 text-[10px] text-emerald-300"><i className="size-1.5 rounded-full bg-emerald-300" /> LIVE SYSTEM</span></div>
            <div className="space-y-2 py-5">{pipeline.map((item, index) => <div key={item} className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-violet-200">0{index + 1}</span><div className="flex flex-1 items-center justify-between rounded-lg border border-white/10 bg-white/[.04] px-4 py-3"><span className="text-sm text-white/85">{item}</span><span className="text-[10px] uppercase tracking-wider text-white/35">{index === 3 ? "Ready" : "Mapped"}</span></div></div>)}</div>
            <div className="rounded-xl bg-white px-4 py-4 text-primary-strong"><div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-primary/70"><span>Strategy preview</span><span>84% clarity</span></div><p className="text-sm font-medium">A considered point of view, ready for the calendar.</p><div className="mt-3 h-1 rounded-full bg-primary-soft"><div className="h-full w-[84%] rounded-full bg-primary" /></div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}