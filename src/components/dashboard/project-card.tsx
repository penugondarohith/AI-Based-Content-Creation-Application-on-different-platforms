import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { getIndustry } from "@/config/industries";
import { durationLabels } from "@/lib/content-configuration";

const statusStyles = { READY: "bg-emerald-50 text-success", STRATEGY_READY: "bg-emerald-50 text-success", CONTENT_READY: "bg-emerald-50 text-success", CONTENT_GENERATING: "bg-violet-50 text-violet-700", DRAFT: "bg-amber-50 text-warning", CONFIGURING: "bg-primary-soft text-primary", GENERATING: "bg-violet-50 text-violet-700", COMPLETED: "bg-sky-50 text-sky-700" };

export function ProjectCard({ project }: { project: Project }) {
  const industry = getIndustry(project.industry);
  const projectHref = `/create?projectId=${encodeURIComponent(project.id)}`;
  return <Link href={projectHref} aria-label={`View project ${project.name}`} className="group block rounded-xl border border-border bg-surface p-5 outline-none transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg text-xl" style={{ backgroundColor: `${industry.color}18`, color: industry.color }}>{industry.icon}</span><div><h3 className="text-sm font-semibold">{project.name}</h3><p className="mt-1 text-[11px] uppercase tracking-wider text-muted">{industry.shortName}</p></div></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${statusStyles[project.status]}`}>{project.status.replaceAll("_", " ")}</span></div><div className="mt-6 flex gap-6 text-xs text-muted"><span>{durationLabels[project.configuration.duration]}</span><span>{project.configuration.postCount} posts</span><span>{project.generatedContent.length} generated</span></div><div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-xs text-muted">Updated {new Date(project.updatedAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</span><span className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-primary/20 transition duration-200 hover:bg-primary-strong hover:shadow-md hover:shadow-primary/25"><span>View Project</span><ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" /></span></div></Link>;
}
