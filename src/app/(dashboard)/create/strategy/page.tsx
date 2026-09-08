import { CreateProjectHeader } from "@/components/create-project/create-project-header";
import { ProjectStepper } from "@/components/create-project/project-stepper";
import { StrategyWorkspace } from "@/components/create-project/content-strategy/strategy-workspace";
export default function StrategyPage() { return <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><CreateProjectHeader /><ProjectStepper activeStep={4} /><div className="mt-10"><StrategyWorkspace /></div></div>; }