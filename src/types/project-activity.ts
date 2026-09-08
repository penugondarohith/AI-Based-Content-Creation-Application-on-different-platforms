export type ProjectActivityType = "PROJECT_CREATED" | "STRATEGY_READY" | "CONTENT_GENERATED" | "CONTENT_APPROVED" | "PROJECT_UPDATED";

export type ProjectActivity = {
  id: string;
  userId: string;
  projectId: string;
  type: ProjectActivityType;
  label: string;
  createdAt: string;
};
