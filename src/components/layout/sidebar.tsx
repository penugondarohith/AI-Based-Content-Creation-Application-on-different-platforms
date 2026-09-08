"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { mainNavigation, utilityNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  return <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface px-3 py-5 lg:flex"><div className="flex items-center gap-2 px-3 text-sm font-semibold tracking-[-.02em]"><span className="flex size-7 items-center justify-center rounded-lg bg-primary text-white">✦</span> CONTENTFORGE <span className="font-normal text-muted">AI</span></div><div className="mt-10 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-muted">Workspace</div><nav className="mt-3 space-y-1">{mainNavigation.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface-muted hover:text-foreground", pathname === href && "bg-primary-soft font-medium text-primary-strong")}><Icon size={17} />{label}</Link>)}</nav><div className="mt-auto"><div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-muted">Support</div>{utilityNavigation.map(({ label, href, icon: Icon }) => <Link key={label} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface-muted hover:text-foreground"><Icon size={17} />{label}</Link>)}<div className="mt-5 flex items-center gap-3 border-t border-border px-3 pt-5"><div className="flex size-8 items-center justify-center rounded-full bg-[#f2dfcf] text-xs font-semibold text-[#784d2e]">{user?.name.charAt(0).toUpperCase()}</div><div className="min-w-0"><div className="truncate text-xs font-medium">{user?.name}</div><div className="truncate text-[11px] text-muted">{user?.email}</div></div><button aria-label="Collapse sidebar" className="ml-auto text-muted"><ChevronLeft size={16} /></button></div></div></aside>;
}