import { AppNavbar } from "@/components/layout/app-navbar";
import { ProjectProvider } from "@/context/project-context";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ProtectedRoute><ProjectProvider><div className="min-h-screen bg-background"><AppNavbar /><main>{children}</main></div></ProjectProvider></ProtectedRoute>;
}