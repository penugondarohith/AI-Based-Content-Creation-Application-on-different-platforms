"use client";

import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { startTransition, useEffect, useState } from "react";
import { getProjects } from "@/services/project-service";
import type { Project } from "@/types/project";
import { ProjectCard } from "@/components/dashboard/project-card";

export default function ProjectsPage() {
	const { user } = useAuth();
	const [projects, setProjects] = useState<Project[]>([]);
	useEffect(() => { if (user) startTransition(() => setProjects(getProjects(user.id))); }, [user]);
	return <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Workspace</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.04em]">Projects</h2><p className="mt-2 text-sm text-muted">Your saved content intelligence projects.</p></div><Link href="/create" className="rounded-lg bg-primary px-4 py-2.5 text-xs font-medium text-white hover:bg-primary-strong">New campaign</Link></div>{projects.length === 0 ? <div className="rounded-xl border border-dashed border-border bg-surface px-5 py-16 text-center"><FolderKanban size={28} className="mx-auto text-muted" /><h3 className="mt-4 text-lg font-semibold">No saved projects yet</h3><p className="mx-auto mt-2 max-w-md text-sm text-muted">Start with your company details and ContentForge will keep the campaign workspace here.</p><Link href="/create" className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-strong">Create your first campaign</Link></div> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>}</div>;
}