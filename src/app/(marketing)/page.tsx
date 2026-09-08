import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { IndustryShowcase } from "@/components/marketing/industry-showcase";
import { Navbar } from "@/components/marketing/navbar";
import { WorkflowSection } from "@/components/marketing/workflow-section";

export default function MarketingPage() { return <><div className="relative"><Navbar /><Hero /></div><IndustryShowcase /><WorkflowSection /><section id="features" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-8 md:grid-cols-2"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-primary">The foundation</p><h2 className="text-4xl font-semibold tracking-[-.04em]">A system designed to get smarter with your brand.</h2></div><div className="grid grid-cols-2 gap-3 text-sm">{["Industry intelligence", "Brand knowledge", "AI content strategy", "Content calendar", "Quality evaluation", "Export-ready plans"].map((item) => <div key={item} className="rounded-lg border border-border bg-surface p-4 text-muted">{item}</div>)}</div></div></section><Footer /></>; }