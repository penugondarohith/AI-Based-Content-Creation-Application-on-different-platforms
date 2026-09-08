"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() { const pathname = usePathname(); return <nav className="fixed inset-x-3 bottom-3 z-20 flex items-center justify-around rounded-xl border border-border bg-surface/95 p-2 shadow-xl backdrop-blur lg:hidden">{mainNavigation.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className={cn("flex min-w-20 flex-col items-center gap-1 rounded-lg px-3 py-2 text-[10px] text-muted", pathname === href && "bg-primary-soft font-medium text-primary-strong")}><Icon size={17} />{label}</Link>)}</nav>; }