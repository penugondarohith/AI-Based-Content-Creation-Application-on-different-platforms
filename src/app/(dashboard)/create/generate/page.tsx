import { CreateProjectHeader } from "@/components/create-project/create-project-header";
import { ProjectStepper } from "@/components/create-project/project-stepper";
import { ContentStudioWorkspace } from "@/components/content-studio/content-studio-workspace";
export default function GeneratePage() { return <div className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8"><CreateProjectHeader /><ProjectStepper activeStep={6} /><div className="mt-8"><ContentStudioWorkspace /></div></div>; }