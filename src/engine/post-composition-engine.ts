import type { BrandContext } from "@/types/brand-context";
import type { GeneratedContent } from "@/types/generated-content";
import type { ImageAspectRatio } from "@/types/generated-image";
import type { PostComposition, OverlayStyle, TextPosition } from "@/types/composed-post";
import type { PostTemplate } from "@/types/post-template";
import { getBrandStyle } from "@/engine/brand-style-engine";
import { selectHeadline } from "@/engine/post-headline-engine";

export function buildPostComposition({
  generatedContent,
  template,
  aspectRatio,
  brandContext,
  customHeadline,
  textPosition,
  overlayStyle,
}: {
  generatedContent: GeneratedContent;
  template?: PostTemplate;
  aspectRatio?: ImageAspectRatio;
  brandContext?: BrandContext | null;
  customHeadline?: string;
  textPosition?: TextPosition;
  overlayStyle?: OverlayStyle;
}): PostComposition {
  const brand = getBrandStyle(brandContext);
  const headline = customHeadline || selectHeadline(
    generatedContent.content.hook,
    generatedContent.content.title,
    72,
  );

  const selectedTemplate = template ?? "EDITORIAL";
  const layout: Record<PostTemplate, { textPosition: TextPosition; overlayStyle: OverlayStyle }> = {
    MINIMAL: { textPosition: "BOTTOM", overlayStyle: "LIGHT_OVERLAY" },
    EDITORIAL: { textPosition: "LEFT", overlayStyle: "GRADIENT" },
    PRODUCT_FOCUS: { textPosition: "BOTTOM", overlayStyle: "DARK_OVERLAY" },
    LUXURY: { textPosition: "CENTER", overlayStyle: "BRAND_PANEL" },
    BOLD: { textPosition: "TOP", overlayStyle: "DARK_OVERLAY" },
    STORYTELLING: { textPosition: "LEFT", overlayStyle: "GRADIENT" },
  };

  const resolvedTextPosition = textPosition ?? layout[selectedTemplate].textPosition;
  const resolvedOverlayStyle = overlayStyle ?? layout[selectedTemplate].overlayStyle;

  return {
    backgroundImageUrl: generatedContent.generatedImage?.imageUrl,
    headline,
    subheadline: generatedContent.content.callToAction || "Discover the story behind the campaign.",
    brandName: brand.brandName,
    logoUrl: undefined,
    textPosition: resolvedTextPosition,
    overlayStyle: resolvedOverlayStyle,
    visualStyle: generatedContent.generatedImage?.prompt.visualStyle || brand.primaryStyle,
  };
}
