import type { IndustryId } from "./industry";

export type ProjectStatus = "DRAFT" | "CONFIGURING" | "READY" | "GENERATING" | "COMPLETED";

export type Project = {
  id: string;
  name: string;
  industry: IndustryId;
  duration: string;
  postCount: number;
  contentGoal: string;
  contentFormats: string[];
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};