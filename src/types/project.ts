import type { IndustryId } from "./industry";
import type { ContentConfiguration } from "./content-configuration";

export type ProjectStatus = "DRAFT" | "CONFIGURING" | "READY" | "GENERATING" | "COMPLETED";

export type Project = {
  id: string;
  name: string;
  industry: IndustryId;
  configuration: ContentConfiguration;
  brandContext?: unknown;
  referenceFiles?: unknown[];
  contentStrategy?: unknown;
  generatedPosts?: unknown[];
  qualityScores?: Record<string, number>;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};