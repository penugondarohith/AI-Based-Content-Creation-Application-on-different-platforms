import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-white">
          <span className="flex size-7 items-center justify-center rounded-lg bg-white text-primary">✦</span>
          CONTENTFORGE <span className="font-normal text-white/60">AI</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/65 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#industries" className="transition hover:text-white">Industries</a>
          <a href="#workflow" className="transition hover:text-white">Workflow</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="hidden px-3 py-2 text-sm text-white/70 transition hover:text-white sm:block">Sign in</Link>
          <Link href="/create" className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-primary-strong shadow-lg shadow-black/10 transition hover:bg-primary-soft">
            Create strategy <ArrowUpRight size={15} />
          </Link>
          <button aria-label="Open menu" className="rounded-lg border border-white/15 p-2 text-white md:hidden"><Menu size={18} /></button>
        </div>
      </div>
    </header>
  );
}