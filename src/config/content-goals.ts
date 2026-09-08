import type { ContentGoal } from "@/types/content-configuration";
import { BarChart3, Heart, Megaphone, Radio, ShoppingBag, Users } from "lucide-react";

export const contentGoals: Array<{ id: ContentGoal; name: string; description: string; icon: typeof BarChart3 }> = [
  { id: "BRAND_AWARENESS", name: "Brand Awareness", description: "Help more people discover and remember your brand.", icon: Radio },
  { id: "AUDIENCE_ENGAGEMENT", name: "Audience Engagement", description: "Start conversations and build a more active community.", icon: Heart },
  { id: "LEAD_GENERATION", name: "Lead Generation", description: "Encourage potential customers to take the next step.", icon: Users },
  { id: "SALES_CONVERSION", name: "Sales & Conversion", description: "Create content that supports a clear purchase decision.", icon: BarChart3 },
  { id: "PRODUCT_PROMOTION", name: "Product Promotion", description: "Give a product, service, or offer its moment in the spotlight.", icon: ShoppingBag },
  { id: "COMMUNITY_BUILDING", name: "Community Building", description: "Create belonging around the ideas your brand stands for.", icon: Megaphone },
];