"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, LayoutDashboard, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: LayoutDashboard },
  { label: "Create Campaign", href: "/create", icon: Sparkles },
  { label: "Content", href: "/create/generate", icon: Sparkles },
  { label: "Analytics", href: "/analytics", icon: LayoutDashboard },
];

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const firstName = user?.name.split(" ")[0] ?? "there";
  const initials = user?.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() ?? "CF";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setProfileOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const logout = () => {
    signOut();
    router.replace("/sign-in?toast=signed-out");
  };

  const isActive = (href: string) => {
    const target = href.split("#")[0];
    return target === "/create/generate" ? pathname.startsWith("/create/generate") : pathname === target || (target !== "/dashboard" && pathname.startsWith(`${target}/`));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-[1600px] items-center gap-4 px-5 lg:px-8">
        <Link href="/dashboard" className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-[-.02em]" onClick={() => setMobileOpen(false)}>
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-white"><Sparkles size={15} /></span>
          <span>CONTENTFORGE <span className="font-normal text-muted">AI</span></span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navigation.map(({ label, href, icon: Icon }) => (
            <Link key={label} href={href} className={cn("inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted transition hover:bg-surface-muted hover:text-foreground", isActive(href) && "bg-primary-soft text-primary-strong")}>
              <Icon size={14} />{label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button type="button" aria-label="Notifications" className="rounded-lg p-2 text-muted transition hover:bg-surface-muted hover:text-foreground"><Bell size={17} /></button>
          <div className="relative">
            <button type="button" onClick={() => setProfileOpen((open) => !open)} aria-expanded={profileOpen} aria-label={`Open profile menu for ${firstName}`} className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-surface-muted">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#f2dfcf] text-xs font-semibold text-[#784d2e]">{initials}</span>
              <span className="hidden text-left sm:block"><span className="block text-xs font-medium">{firstName}</span><span className="block max-w-28 truncate text-[10px] text-muted">{user?.email}</span></span>
              <ChevronDown size={14} className="hidden text-muted sm:block" />
            </button>
            {profileOpen && <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-border bg-surface p-2 shadow-xl">
              <div className="border-b border-border px-3 py-2"><p className="text-sm font-medium">{user?.name}</p><p className="mt-1 truncate text-xs text-muted">{user?.email}</p></div>
              <Link href="/profile" onClick={() => setProfileOpen(false)} className="mt-1 block rounded-lg px-3 py-2 text-xs text-muted hover:bg-surface-muted">Profile</Link>
              <Link href="/settings" onClick={() => setProfileOpen(false)} className="block rounded-lg px-3 py-2 text-xs text-muted hover:bg-surface-muted">Account Settings</Link>
              <button type="button" onClick={logout} className="block w-full rounded-lg px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50">Logout</button>
            </div>}
          </div>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} className="rounded-lg p-2 text-muted hover:bg-surface-muted lg:hidden">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && <nav aria-label="Mobile navigation" className="border-t border-border px-5 py-3 lg:hidden">
        <div className="mx-auto max-w-[1600px] space-y-1">
          {navigation.map(({ label, href, icon: Icon }) => <Link key={label} href={href} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-muted hover:bg-surface-muted", isActive(href) && "bg-primary-soft font-medium text-primary-strong")}><Icon size={16} />{label}</Link>)}
        </div>
      </nav>}
    </header>
  );
}