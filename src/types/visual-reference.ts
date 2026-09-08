export type VisualReferenceType = "PRODUCT" | "PROPERTY" | "BRAND_STYLE";

export interface VisualReference {
  id: string;
  projectId: string;
  fileUrl: string;
  type: VisualReferenceType;
  createdAt: string;
}
