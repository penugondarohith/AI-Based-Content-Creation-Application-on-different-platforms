import type { BrandContext } from "@/types/brand-context";
import type { ComposedPost, OverlayStyle, PostComposition, TextPosition } from "@/types/composed-post";
import type { GeneratedContent } from "@/types/generated-content";
import type { ImageAspectRatio } from "@/types/generated-image";
import type { PostTemplate } from "@/types/post-template";
import { buildPostComposition } from "@/engine/post-composition-engine";

export class PostCompositionService {
  createComposition({
    generatedContent,
    brandContext,
    template = "EDITORIAL",
    aspectRatio = "4:5",
    customHeadline,
    textPosition,
    overlayStyle,
  }: {
    generatedContent: GeneratedContent;
    brandContext?: BrandContext | null;
    template?: PostTemplate;
    aspectRatio?: ImageAspectRatio;
    customHeadline?: string;
    textPosition?: TextPosition;
    overlayStyle?: OverlayStyle;
  }): ComposedPost {
    const now = new Date().toISOString();
    const composition = buildPostComposition({
      generatedContent,
      template,
      aspectRatio,
      brandContext,
      customHeadline,
      textPosition,
      overlayStyle,
    });

    return {
      id: `composed-${generatedContent.id}`,
      projectId: generatedContent.projectId,
      generatedContentId: generatedContent.id,
      generatedImageId: generatedContent.generatedImage?.id,
      status: "READY",
      template,
      aspectRatio,
      imageUrl: generatedContent.generatedImage?.imageUrl,
      composition,
      createdAt: now,
      updatedAt: now,
    };
  }

  updateComposition(
    post: ComposedPost,
    update: Partial<PostComposition>,
  ): ComposedPost {
    return {
      ...post,
      composition: { ...post.composition, ...update },
      updatedAt: new Date().toISOString(),
    };
  }

  setTemplate(post: ComposedPost, template: PostTemplate): ComposedPost {
    return { ...post, template, updatedAt: new Date().toISOString() };
  }

  setTextPosition(post: ComposedPost, textPosition: TextPosition): ComposedPost {
    return this.updateComposition(post, { textPosition });
  }

  setOverlay(post: ComposedPost, overlayStyle: OverlayStyle): ComposedPost {
    return this.updateComposition(post, { overlayStyle });
  }

  regenerateVisual(post: ComposedPost, imageUrl?: string): ComposedPost {
    return {
      ...post,
      imageUrl: imageUrl ?? post.imageUrl,
      updatedAt: new Date().toISOString(),
    };
  }
}

export const postCompositionService = new PostCompositionService();
