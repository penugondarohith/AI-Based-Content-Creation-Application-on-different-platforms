import type { IndustryId } from "./industry";
import type { ContentConfiguration } from "./content-configuration";
import type { BrandContext } from "./brand-context";
import type { ReferenceFile } from "./reference-file";
import type { ContentStrategy } from "./content-strategy";

export type ProjectStatus = "DRAFT" | "CONFIGURING" | "READY" | "STRATEGY_READY" | "GENERATING" | "COMPLETED";

export type Project = {
  id: string;
  userId: string;
  name: string;
  industry: IndustryId;
  configuration: ContentConfiguration;
  referenceFiles: ReferenceFile[];
  brandContext: BrandContext | null;
  contentStrategy: ContentStrategy | null;
  generatedPosts?: unknown[];
  qualityScores?: Record<string, number>;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};