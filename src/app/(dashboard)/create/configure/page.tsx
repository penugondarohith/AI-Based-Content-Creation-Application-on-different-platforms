import { CreateProjectHeader } from "@/components/create-project/create-project-header";
import { ProjectStepper } from "@/components/create-project/project-stepper";
import { ConfigurationWorkspace } from "@/components/create-project/content-configuration/configuration-workspace";
export default function ConfigurePage() { return <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><CreateProjectHeader /><ProjectStepper activeStep={2} /><div className="mt-10"><ConfigurationWorkspace /></div></div>; }