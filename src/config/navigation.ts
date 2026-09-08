import { BarChart3, FolderKanban, LayoutDashboard, Sparkles } from "lucide-react";

export const dashboardStats = [
  { label: "Active projects", value: "12", change: "+3 this month", icon: FolderKanban },
  { label: "Content generated", value: "28", change: "+18% from last month", icon: Sparkles },
  { label: "Content approved", value: "04", change: "2 need attention", icon: BarChart3 },
];