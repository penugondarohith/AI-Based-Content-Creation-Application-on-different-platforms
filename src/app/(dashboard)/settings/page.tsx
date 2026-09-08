"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";

type Preferences = { emailUpdates: boolean; weeklyDigest: boolean; reducedMotion: boolean; saveDrafts: boolean };
const defaultPreferences: Preferences = { emailUpdates: true, weeklyDigest: false, reducedMotion: false, saveDrafts: true };

export default function SettingsPage() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [saved, setSaved] = useState(false);
  const storageKey = user ? `contentforge_preferences_${user.id}` : "contentforge_preferences";

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        startTransition(() => setPreferences({ ...defaultPreferences, ...JSON.parse(stored) as Partial<Preferences> }));
      }
    } catch {
      startTransition(() => setPreferences(defaultPreferences));
    }
  }, [storageKey]);

  const update = (key: keyof Preferences, value: boolean) => {
    const next = { ...preferences, [key]: value };
    setPreferences(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8"><div className="flex items-center gap-3"><Link href="/dashboard" className="rounded-lg p-2 text-muted hover:bg-surface-muted" aria-label="Back to dashboard"><ArrowLeft size={17} /></Link><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Account</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em]">Settings</h1></div></div><div className="mt-8 space-y-5"><section className="rounded-xl border border-border bg-surface p-6"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Account settings</p><h2 className="mt-2 text-lg font-semibold">Your account</h2><p className="mt-2 text-sm text-muted">Signed in as {user?.email}. Update your name and profile details from <Link href="/profile" className="font-medium text-primary">Profile</Link>.</p></section><section className="rounded-xl border border-border bg-surface p-6"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Application preferences</p><h2 className="mt-2 text-lg font-semibold">Workspace behavior</h2><div className="mt-5 divide-y divide-border">{([["saveDrafts", "Save generated drafts", "Keep generated content in this browser for your next visit."], ["reducedMotion", "Reduce motion", "Use fewer interface transitions."], ["emailUpdates", "Email updates", "Enable email update preference for future integrations."], ["weeklyDigest", "Weekly digest", "Enable a weekly content summary preference."]] as const).map(([key, label, description]) => <label key={key} className="flex cursor-pointer items-center justify-between gap-5 py-4 first:pt-0 last:pb-0"><span><span className="block text-sm font-medium">{label}</span><span className="mt-1 block text-xs text-muted">{description}</span></span><input type="checkbox" checked={preferences[key]} onChange={(event) => update(key, event.target.checked)} className="size-4 accent-primary" /></label>)}</div></section><section className="rounded-xl border border-border bg-surface p-6"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Privacy and data</p><h2 className="mt-2 text-lg font-semibold">Local workspace storage</h2><p className="mt-2 text-sm leading-6 text-muted">This prototype stores profile, preferences, strategy, and generated content in your browser. Guest sessions are cleared when you log out.</p>{saved && <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-emerald-700"><Check size={14} /> Preference saved</p>}</section></div></div>;
}
