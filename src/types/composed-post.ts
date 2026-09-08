import type { ImageAspectRatio } from "./generated-image";
import type { PostTemplate } from "./post-template";

export type ComposedPostStatus =
  | "NOT_CREATED"
  | "COMPOSING"
  | "READY"
  | "ERROR";

export type TextPosition = "TOP" | "CENTER" | "BOTTOM" | "LEFT" | "RIGHT";

export type OverlayStyle =
  | "NONE"
  | "GRADIENT"
  | "DARK_OVERLAY"
  | "LIGHT_OVERLAY"
  | "BLUR_PANEL"
  | "BRAND_PANEL";

export interface PostComposition {
  backgroundImageUrl?: string;
  headline?: string;
  subheadline?: string;
  brandName?: string;
  logoUrl?: string;
  textPosition: TextPosition;
  overlayStyle: OverlayStyle;
  visualStyle: string;
}

export interface ComposedPost {
  id: string;
  projectId: string;
  generatedContentId: string;
  generatedImageId?: string;
  status: ComposedPostStatus;
  template: PostTemplate;
  aspectRatio: ImageAspectRatio;
  imageUrl?: string;
  composition: PostComposition;
  createdAt: string;
  updatedAt: string;
}
