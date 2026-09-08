import { CreateProjectHeader } from "@/components/create-project/create-project-header";
import { ProjectStepper } from "@/components/create-project/project-stepper";
import { StrategyWorkspace } from "@/components/create-project/content-strategy/strategy-workspace";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function StrategyPage() { return <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><CreateProjectHeader /><ProjectStepper activeStep={5} /><div className="mt-10"><StrategyWorkspace /></div><div className="mt-8 flex justify-end"><Link href="/create/generate" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-strong">Continue to Content Studio <ArrowRight size={15} /></Link></div></div>; }