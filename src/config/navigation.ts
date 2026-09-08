import { BarChart3, CircleHelp, FolderKanban, LayoutDashboard, Settings2, Sparkles } from "lucide-react";

export const mainNavigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Create Strategy", href: "/create", icon: Sparkles },
];
export const utilityNavigation = [
  { label: "Settings", href: "#", icon: Settings2 },
  { label: "Help center", href: "#", icon: CircleHelp },
];
export const dashboardStats = [
  { label: "Total projects", value: "12", change: "+3 this month", icon: FolderKanban },
  { label: "Draft strategies", value: "04", change: "2 need attention", icon: BarChart3 },
  { label: "Generated plans", value: "28", change: "+18% from last month", icon: Sparkles },
];