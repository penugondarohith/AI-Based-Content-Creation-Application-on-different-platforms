import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Topbar } from "@/components/layout/topbar";
import { ProjectProvider } from "@/context/project-context";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ProjectProvider><div className="flex min-h-screen bg-background pb-20 lg:pb-0"><Sidebar /><div className="min-w-0 flex-1"><Topbar title="Content workspace" /><main>{children}</main></div><MobileNav /></div></ProjectProvider>;
}