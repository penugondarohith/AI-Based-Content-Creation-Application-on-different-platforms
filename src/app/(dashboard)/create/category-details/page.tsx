import { CreateProjectHeader } from "@/components/create-project/create-project-header";
import { ProjectStepper } from "@/components/create-project/project-stepper";
import { CategoryDetailsForm } from "@/components/create-project/category-details/category-details-form";

export default function CategoryDetailsPage() {
  return <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8"><CreateProjectHeader /><ProjectStepper activeStep={3} /><div className="mt-10"><CategoryDetailsForm /></div></div>;
}
