import type { ContentGoal, ContentFormat } from "@/types/content-configuration";
import type { IndustryId } from "@/types/industry";

export interface StrategyPillarCandidate {
  title: string;
  description: string;
  objective: string;
  industryFocus: string[];
  formats: ContentFormat[];
  weight: number;
  themes: string[];
}

export interface IndustryStrategyProfile {
  communicationGuidelines: { vocabulary: string[]; messaging: string[]; avoid: string[] };
  pillarCandidates: StrategyPillarCandidate[];
  goalWeights: Partial<Record<ContentGoal, Record<string, number>>>;
}

const commonFormats: ContentFormat[] = ["INSTAGRAM_POST", "STORYTELLING", "EDUCATIONAL_CONTENT"];
export const contentStrategyProfiles: Record<IndustryId, IndustryStrategyProfile> = {
  REAL_ESTATE: {
    communicationGuidelines: { vocabulary: ["location", "livability", "value", "future", "connected"], messaging: ["Lead with the life a space enables.", "Balance aspiration with proof and clarity."], avoid: ["Unsubstantiated investment promises", "Overly technical property jargon", "Generic luxury claims"] },
    pillarCandidates: [
      { title: "Property Lifestyle", description: "Show the everyday experience of living in the property.", objective: "Build desire for the lifestyle", industryFocus: ["Lifestyle", "Amenities"], formats: commonFormats, weight: 24, themes: ["A Day in the Life", "Room to Live Better"] },
      { title: "Investment Insights", description: "Make property value and long-term opportunity easier to understand.", objective: "Build buyer confidence", industryFocus: ["Investment", "Location"], formats: ["EDUCATIONAL_CONTENT", "INSTAGRAM_CAROUSEL"], weight: 18, themes: ["The Smarter Move", "Value Beyond the Address"] },
      { title: "Location Advantage", description: "Connect the address to the rhythms and opportunities around it.", objective: "Make the location feel inevitable", industryFocus: ["Location", "Lifestyle"], formats: ["INSTAGRAM_CAROUSEL", "LIFESTYLE_CONTENT"], weight: 18, themes: ["Everything Within Reach", "Your Neighbourhood, Connected"] },
      { title: "Amenities Showcase", description: "Turn features into meaningful experiences and benefits.", objective: "Demonstrate considered living", industryFocus: ["Amenities", "Property USP"], formats: ["INSTAGRAM_POST", "PRODUCT_HIGHLIGHT"], weight: 16, themes: ["Designed Around You", "Details That Change the Day"] },
      { title: "Buyer Education", description: "Answer the questions that make a property decision feel clear.", objective: "Remove decision friction", industryFocus: ["Configuration", "Investment"], formats: ["EDUCATIONAL_CONTENT", "INSTAGRAM_CAROUSEL"], weight: 14, themes: ["Your Buying Checklist", "A Clearer Way Home"] },
    ], goalWeights: { LEAD_GENERATION: { "Investment Insights": 8, "Buyer Education": 7 }, SALES_CONVERSION: { "Amenities Showcase": 8, "Property Lifestyle": 5 } },
  },
  JEWELLERY: {
    communicationGuidelines: { vocabulary: ["timeless", "craftsmanship", "elegance", "celebrate", "precious", "heirloom"], messaging: ["Let the human hand be part of the story.", "Make luxury feel intimate, never distant."], avoid: ["Cheap or discount-focused language", "Overly technical descriptions", "Generic promotional language"] },
    pillarCandidates: [
      { title: "Craftsmanship & Design", description: "Reveal the thought, skill, and detail behind every piece.", objective: "Build trust in the craft", industryFocus: ["Craftsmanship", "Design", "Materials"], formats: ["STORYTELLING", "EDUCATIONAL_CONTENT"], weight: 30, themes: ["Behind the Design", "Made by Many Hands"] },
      { title: "Luxury Lifestyle", description: "Place the jewellery inside an elevated but recognisable way of living.", objective: "Build luxury perception", industryFocus: ["Luxury", "Lifestyle"], formats: ["LIFESTYLE_CONTENT", "INSTAGRAM_POST"], weight: 25, themes: ["Elegance in Everyday Moments", "A Quiet Kind of Luxury"] },
      { title: "Occasion & Gifting", description: "Connect pieces to the moments people want to hold onto.", objective: "Create emotional relevance", industryFocus: ["Occasion", "Gifting", "Emotion"], formats: ["STORYTELLING", "PROMOTIONAL_CONTENT"], weight: 20, themes: ["A Gift for Life's Moments", "Mark the Moment"] },
      { title: "Product Storytelling", description: "Give each piece a point of view, from silhouette to significance.", objective: "Make products memorable", industryFocus: ["Design", "Materials"], formats: ["PRODUCT_HIGHLIGHT", "INSTAGRAM_CAROUSEL"], weight: 15, themes: ["The Story Behind the Sparkle", "Made to Be Remembered"] },
      { title: "Emotional Connection", description: "Build a world around memory, identity, and lasting meaning.", objective: "Deepen brand affinity", industryFocus: ["Emotion", "Gifting"], formats: ["STORYTELLING", "LIFESTYLE_CONTENT"], weight: 10, themes: ["Moments Worth Remembering", "Something Only You Know"] },
    ], goalWeights: { BRAND_AWARENESS: { "Luxury Lifestyle": 8, "Emotional Connection": 6 }, SALES_CONVERSION: { "Product Storytelling": 8, "Occasion & Gifting": 5 }, PRODUCT_PROMOTION: { "Product Storytelling": 10 } },
  },
  PERFUME: {
    communicationGuidelines: { vocabulary: ["sillage", "notes", "mood", "ritual", "evoke", "layered"], messaging: ["Describe the feeling before the formula.", "Invite the audience into a sensory world."], avoid: ["Flat ingredient lists without feeling", "Generic luxury language", "Hard-sell urgency"] },
    pillarCandidates: [
      { title: "Fragrance Discovery", description: "Make the construction and personality of each scent easy to imagine.", objective: "Spark curiosity", industryFocus: ["Fragrance Notes", "Sensory Language"], formats: ["EDUCATIONAL_CONTENT", "INSTAGRAM_CAROUSEL"], weight: 26, themes: ["Meet the Notes", "An Olfactory First Impression"] },
      { title: "Mood & Emotion", description: "Translate scent into memory, atmosphere, and emotion.", objective: "Build sensory connection", industryFocus: ["Mood", "Emotion"], formats: ["STORYTELLING", "LIFESTYLE_CONTENT"], weight: 24, themes: ["A Mood You Can Wear", "The Feeling It Leaves Behind"] },
      { title: "Personality Expression", description: "Show how fragrance becomes part of personal identity.", objective: "Help people find their signature", industryFocus: ["Personality", "Lifestyle"], formats: commonFormats, weight: 20, themes: ["For the Way You Move", "Your Signature, Bottled"] },
      { title: "Lifestyle & Luxury", description: "Build an aspirational world around the fragrance ritual.", objective: "Elevate perception", industryFocus: ["Lifestyle", "Luxury"], formats: ["LIFESTYLE_CONTENT", "INSTAGRAM_POST"], weight: 18, themes: ["The Ritual of Arrival", "Luxury in the Air"] },
      { title: "Occasion-Based Stories", description: "Give different moments their own olfactory point of view.", objective: "Make discovery actionable", industryFocus: ["Occasion", "Mood"], formats: ["STORYTELLING", "PRODUCT_HIGHLIGHT"], weight: 12, themes: ["For Evenings That Linger", "A Scent for the Unexpected"] },
    ], goalWeights: { PRODUCT_PROMOTION: { "Fragrance Discovery": 8 }, BRAND_AWARENESS: { "Mood & Emotion": 8, "Lifestyle & Luxury": 5 } },
  },
  FMCG_FOOD: {
    communicationGuidelines: { vocabulary: ["fresh", "craveable", "wholesome", "simple", "share", "everyday"], messaging: ["Make the product benefit instantly tangible.", "Connect food to real moments, not perfect ones."], avoid: ["Unclear health claims", "Overly polished distance", "Ingredient jargon without benefit"] },
    pillarCandidates: [
      { title: "Taste Experience", description: "Make flavour and enjoyment the first reason to stop and care.", objective: "Spark appetite", industryFocus: ["Taste", "Food Appeal"], formats: ["LIFESTYLE_CONTENT", "INSTAGRAM_POST"], weight: 25, themes: ["The First Bite", "Worth Sharing"] },
      { title: "Product Benefits", description: "Show how the product makes a daily choice better.", objective: "Build product preference", industryFocus: ["Product Benefits", "Convenience"], formats: ["EDUCATIONAL_CONTENT", "PRODUCT_HIGHLIGHT"], weight: 20, themes: ["Good Things, Made Simple", "More From Every Moment"] },
      { title: "Ingredients & Quality", description: "Make sourcing and standards visible without losing appetite.", objective: "Build trust", industryFocus: ["Ingredients", "Product Benefits"], formats: ["EDUCATIONAL_CONTENT", "STORYTELLING"], weight: 20, themes: ["What Goes In Matters", "From Source to Shelf"] },
      { title: "Family Moments", description: "Place the product in warm, recognisable routines and rituals.", objective: "Build familiarity", industryFocus: ["Family", "Consumption Occasions"], formats: ["STORYTELLING", "LIFESTYLE_CONTENT"], weight: 20, themes: ["Made for the Table", "Little Moments, Shared"] },
      { title: "Convenience", description: "Show how easily the product fits into the pace of modern life.", objective: "Drive trial", industryFocus: ["Convenience", "Consumption Occasions"], formats: ["PRODUCT_HIGHLIGHT", "PROMOTIONAL_CONTENT"], weight: 15, themes: ["Ready When You Are", "Good Food, Less Fuss"] },
    ], goalWeights: { SALES_CONVERSION: { "Convenience": 8, "Product Benefits": 6 }, COMMUNITY_BUILDING: { "Family Moments": 8, "Taste Experience": 5 } },
  },
};