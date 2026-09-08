import type { ContentFormat } from "@/types/content-configuration";
import { BookOpen, Camera, Image, Lightbulb, MessageCircle, Sparkles, Star } from "lucide-react";

export const contentFormats: Array<{ id: ContentFormat; name: string; description: string; icon: typeof Camera }> = [
  { id: "INSTAGRAM_POST", name: "Instagram Post", description: "A focused, single-frame social post.", icon: Image },
  { id: "INSTAGRAM_CAROUSEL", name: "Instagram Carousel", description: "A sequence built to reward a swipe.", icon: Camera },
  { id: "PROMOTIONAL_CONTENT", name: "Promotional Content", description: "Clear content for an offer or launch.", icon: Sparkles },
  { id: "EDUCATIONAL_CONTENT", name: "Educational Content", description: "Useful ideas that build authority.", icon: Lightbulb },
  { id: "STORYTELLING", name: "Storytelling", description: "Narratives that make the brand memorable.", icon: BookOpen },
  { id: "PRODUCT_HIGHLIGHT", name: "Product Highlight", description: "A closer look at what makes it special.", icon: Star },
  { id: "LIFESTYLE_CONTENT", name: "Lifestyle Content", description: "Show the world your product belongs in.", icon: MessageCircle },
];