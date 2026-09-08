import type { Platform } from "@/types/content-configuration";

const platforms: Array<{ id: Platform; label: string; description: string }> = [
  { id: "INSTAGRAM", label: "Instagram", description: "Visual and engaging" },
  { id: "LINKEDIN", label: "LinkedIn", description: "Professional and informative" },
  { id: "FACEBOOK", label: "Facebook", description: "Conversational and community-led" },
  { id: "X", label: "X", description: "Short and concise" },
];

export function PlatformSelector({ value, onChange }: { value: Platform; onChange: (value: Platform) => void }) {
  return <div><div className="mb-3"><h3 className="text-sm font-semibold">Primary platform</h3><p className="mt-1 text-xs text-muted">The content will be adapted to this channel.</p></div><div className="grid gap-2 sm:grid-cols-4">{platforms.map((platform) => <button key={platform.id} type="button" onClick={() => onChange(platform.id)} className={`rounded-lg border p-3 text-left transition ${value === platform.id ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40"}`}><span className={`block text-xs font-semibold ${value === platform.id ? "text-primary-strong" : ""}`}>{platform.label}</span><span className="mt-1 block text-[10px] text-muted">{platform.description}</span></button>)}</div></div>;
}
