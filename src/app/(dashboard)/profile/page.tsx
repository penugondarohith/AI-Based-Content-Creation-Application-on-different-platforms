"use client";

import Link from "next/link";
import { ArrowLeft, Check, UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useProject } from "@/context/project-context";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { generatedContent } = useProject();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [age, setAge] = useState(String(user?.age ?? ""));
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture ?? "");
  const [saved, setSaved] = useState(false);
  const isGuest = user?.accountType === "GUEST";

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    if (isGuest) return;
    updateProfile({ name, email, age: Number(age), profilePicture });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return <div className="mx-auto max-w-5xl px-5 py-8 lg:px-8"><div className="flex items-center gap-3"><Link href="/dashboard" className="rounded-lg p-2 text-muted hover:bg-surface-muted" aria-label="Back to dashboard"><ArrowLeft size={17} /></Link><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">Account</p><h1 className="mt-2 text-3xl font-semibold tracking-[-.04em]">Profile</h1></div></div>{isGuest && <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><span>You are using a temporary Guest Mode profile.</span><Link href="/sign-up" className="font-semibold underline">Sign up to save your work</Link></div>}<div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><form onSubmit={save} className="rounded-xl border border-border bg-surface p-6"><div className="flex items-center gap-3 border-b border-border pb-5"><div className="flex size-14 items-center justify-center overflow-hidden rounded-full bg-[#f2dfcf] text-lg font-semibold text-[#784d2e]">{profilePicture ? <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" /> : <UserRound size={23} />}</div><div><h2 className="font-semibold">Personal details</h2><p className="mt-1 text-xs text-muted">Keep your workspace identity up to date.</p></div></div><div className="mt-6 space-y-4"><label className="block text-xs font-medium">Name<input value={name} onChange={(event) => setName(event.target.value)} disabled={isGuest} className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary disabled:opacity-60" /></label><label className="block text-xs font-medium">Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={isGuest} className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary disabled:opacity-60" /></label><label className="block text-xs font-medium">Age<input type="number" min="13" max="120" value={age} onChange={(event) => setAge(event.target.value)} disabled={isGuest} className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary disabled:opacity-60" /></label><label className="block text-xs font-medium">Profile picture URL<input type="url" value={profilePicture} onChange={(event) => setProfilePicture(event.target.value)} disabled={isGuest} placeholder="https://..." className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary disabled:opacity-60" /></label></div><button type="submit" disabled={isGuest} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50">{saved ? <><Check size={15} /> Saved</> : "Save profile"}</button></form><section className="rounded-xl border border-border bg-surface p-6"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-primary">Account overview</p><div className="mt-6 space-y-5"><Info label="Account type" value={isGuest ? "Guest Mode" : "Personal account"} /><Info label="Member since" value={user ? new Date(user.createdAt).toLocaleDateString() : "-"} /><Info label="Content generated" value={String(generatedContent.length)} /><Info label="Saved project data" value={isGuest ? "Temporary" : "Stored locally"} /></div></section></div></div>;
}

function Info({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"><span className="text-sm text-muted">{label}</span><span className="text-right text-sm font-medium">{value}</span></div>; }
