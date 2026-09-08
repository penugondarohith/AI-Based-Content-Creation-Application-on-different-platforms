import type { Project } from "@/types/project";
import type { ProjectActivity, ProjectActivityType } from "@/types/project-activity";

const projectKey = (userId: string) => `contentforge_projects_${userId}`;
const activityKey = (userId: string) => `contentforge_activities_${userId}`;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? JSON.stringify(fallback)) as T;
  } catch {
    return fallback;
  }
}

export function getProjects(userId: string): Project[] {
  return read<Project[]>(projectKey(userId), []);
}

export function saveProject(project: Project): void {
  if (typeof window === "undefined") return;
  const projects = getProjects(project.userId);
  const next = [...projects.filter((item) => item.id !== project.id), project].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  window.localStorage.setItem(projectKey(project.userId), JSON.stringify(next));
}

export function getActivities(userId: string): ProjectActivity[] {
  return read<ProjectActivity[]>(activityKey(userId), []);
}

export function recordProjectActivity(userId: string, projectId: string, type: ProjectActivityType, label: string): void {
  if (typeof window === "undefined") return;
  const activity: ProjectActivity = { id: `${type.toLowerCase()}_${Date.now()}`, userId, projectId, type, label, createdAt: new Date().toISOString() };
  const activities = [activity, ...getActivities(userId)].slice(0, 30);
  window.localStorage.setItem(activityKey(userId), JSON.stringify(activities));
}

export function clearGuestWorkspace(userId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(projectKey(userId));
  window.localStorage.removeItem(activityKey(userId));
  window.localStorage.removeItem(`contentforge_preferences_${userId}`);
}
