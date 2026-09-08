import type { IndustryId } from "@/types/industry";
import type { ReferenceFile } from "@/types/reference-file";
import type {
  BrandContext,
  BrandInsight,
  BrandContextCompleteness,
  ReferenceCoverageLevel,
  ReferenceCoverageResult,
} from "@/types/brand-context";

// ---------------------------------------------------------------------------
// Industry-aware mock extraction data
// ---------------------------------------------------------------------------

interface MockExtractionData {
  brandNames: string[];
  products: string[][];
  keyFeatures: string[][];
  audiences: string[];
  tones: string[][];
  usps: string[][];
  keywords: string[][];
  descriptions: string[];
  insightCategories: { category: string; title: string; description: string }[];
}

const INDUSTRY_MOCK_DATA: Record<IndustryId, MockExtractionData> = {
  JEWELLERY: {
    brandNames: ["Aurelia Jewels", "Maison Lumière", "Celestine Fine Jewellery"],
    products: [
      ["Diamond Rings", "Gold Necklaces", "Luxury Bracelets"],
      ["Platinum Earrings", "Sapphire Pendants", "Pearl Collections"],
      ["Engagement Rings", "Wedding Bands", "Statement Pieces"],
    ],
    keyFeatures: [
      ["Handcrafted", "Premium Materials", "Certified Diamonds"],
      ["Heritage Craftsmanship", "Ethically Sourced", "Custom Designs"],
      ["Limited Editions", "Hallmarked Gold", "GIA Certified"],
    ],
    audiences: ["Luxury Consumers", "Affluent Women 25–50", "Gifting Buyers"],
    tones: [
      ["Luxury", "Elegant", "Emotional"],
      ["Sophisticated", "Timeless", "Romantic"],
      ["Premium", "Aspirational", "Intimate"],
    ],
    usps: [
      ["Handcrafted Designs", "Certified Quality", "Timeless Luxury"],
      ["Bespoke Service", "Heritage Atelier", "Lifetime Warranty"],
      ["Exclusive Collections", "Master Artisans", "Conflict-Free Diamonds"],
    ],
    keywords: [
      ["luxury jewellery", "handcrafted", "diamond", "gold", "bridal"],
      ["fine jewellery", "engagement ring", "premium", "artisan", "gemstone"],
    ],
    descriptions: [
      "A premium jewellery brand focused on handcrafted luxury designs, combining heritage craftsmanship with contemporary elegance.",
      "An exclusive fine jewellery maison creating timeless pieces with ethically sourced gemstones and precious metals.",
    ],
    insightCategories: [
      { category: "Craftsmanship", title: "Artisan Heritage", description: "Strong emphasis on handcrafted quality and traditional goldsmithing techniques passed through generations." },
      { category: "Materials", title: "Premium Sourcing", description: "All gemstones are certified and ethically sourced, with GIA-graded diamonds and hallmarked precious metals." },
      { category: "Positioning", title: "Luxury Market Placement", description: "Brand positions itself in the premium luxury segment, targeting high-net-worth individuals seeking exclusive designs." },
      { category: "Occasions", title: "Celebration Moments", description: "Products are strongly associated with life milestones — engagements, weddings, anniversaries, and gifting." },
    ],
  },

  REAL_ESTATE: {
    brandNames: ["The Foundry Residences", "Skyline Estates", "Azure Living"],
    products: [
      ["3 BHK Apartments", "Penthouses", "Studio Apartments"],
      ["Luxury Villas", "Townhouses", "Premium Floors"],
      ["Commercial Spaces", "Retail Shops", "Office Suites"],
    ],
    keyFeatures: [
      ["Prime Location", "World-Class Amenities", "Smart Home Integration"],
      ["Landscaped Gardens", "Rooftop Infinity Pool", "24/7 Concierge"],
      ["RERA Registered", "Vastu Compliant", "Green Building Certified"],
    ],
    audiences: ["Property Investors", "Homebuyers 30–55", "NRI Investors"],
    tones: [
      ["Professional", "Aspirational", "Trustworthy"],
      ["Premium", "Confident", "Inviting"],
      ["Sophisticated", "Reassuring", "Visionary"],
    ],
    usps: [
      ["Prime Location", "Premium Amenities", "High ROI Potential"],
      ["Award-Winning Design", "Trusted Developer", "On-Time Delivery"],
      ["Smart Living", "Sustainable Design", "Community Lifestyle"],
    ],
    keywords: [
      ["luxury apartments", "real estate", "investment", "premium living", "amenities"],
      ["property", "residential", "homebuyer", "gated community", "smart home"],
    ],
    descriptions: [
      "A premium residential development offering luxury apartments with world-class amenities in a prime urban location.",
      "An exclusive real estate project combining architectural excellence with sustainable living in a thriving neighbourhood.",
    ],
    insightCategories: [
      { category: "Location", title: "Strategic Positioning", description: "Located in a premium micro-market with excellent connectivity to business districts, airports, and lifestyle destinations." },
      { category: "Amenities", title: "Lifestyle Infrastructure", description: "Features over 40 lifestyle amenities including infinity pool, clubhouse, co-working spaces, and landscaped parks." },
      { category: "Investment", title: "Capital Appreciation", description: "The location has shown consistent 12–15% year-on-year appreciation, making it an attractive investment proposition." },
      { category: "Configuration", title: "Space Planning", description: "Units range from efficient studios to expansive penthouses, with Vastu-compliant layouts and premium finishes." },
    ],
  },

  PERFUME: {
    brandNames: ["Sillage No. 04", "Maison Éclat", "Noir Essence"],
    products: [
      ["Eau de Parfum", "Eau de Toilette", "Perfume Oils"],
      ["Discovery Sets", "Travel Sprays", "Scented Candles"],
      ["Limited Edition Fragrances", "Bespoke Blends", "Attar Collection"],
    ],
    keyFeatures: [
      ["French Perfumery", "Long-Lasting", "Natural Ingredients"],
      ["Niche Fragrance House", "Handblended", "Cruelty-Free"],
      ["Artisanal Crafting", "Rare Ingredients", "Signature Bottles"],
    ],
    audiences: ["Fragrance Connoisseurs", "Luxury Lifestyle Consumers", "Young Professionals 25–40"],
    tones: [
      ["Sensory", "Sophisticated", "Mysterious"],
      ["Elegant", "Poetic", "Intimate"],
      ["Bold", "Evocative", "Luxurious"],
    ],
    usps: [
      ["Master Perfumer Crafted", "100% Natural Essences", "72-Hour Longevity"],
      ["Niche Exclusivity", "Handcrafted Bottles", "Personalised Engraving"],
      ["Sustainable Sourcing", "French Heritage", "Unisex Appeal"],
    ],
    keywords: [
      ["luxury perfume", "fragrance", "niche", "eau de parfum", "scent"],
      ["artisanal", "sillage", "olfactory", "notes", "attar"],
    ],
    descriptions: [
      "A niche fragrance house creating masterfully blended perfumes with rare natural ingredients, rooted in French perfumery tradition.",
      "An artisanal perfume brand that crafts evocative scent stories, combining heritage techniques with contemporary olfactory art.",
    ],
    insightCategories: [
      { category: "Fragrance Notes", title: "Olfactory Architecture", description: "Complex scent structures with distinct top, heart, and base notes creating a multi-layered sensory experience." },
      { category: "Mood", title: "Emotional Resonance", description: "Each fragrance is designed to evoke specific moods — from serene confidence to bold sensuality." },
      { category: "Craftsmanship", title: "Artisanal Process", description: "Every batch is handblended by master perfumers using traditional maceration techniques for optimal depth." },
      { category: "Personality", title: "Wearer Identity", description: "Fragrances are positioned as extensions of personal identity rather than mere accessories." },
    ],
  },

  FMCG_FOOD: {
    brandNames: ["Harvest Kitchen", "Pure & Simple Foods", "Golden Crust Bakery"],
    products: [
      ["Organic Snacks", "Cold-Pressed Juices", "Protein Bars"],
      ["Ready Meals", "Sauces & Dips", "Breakfast Cereals"],
      ["Artisan Breads", "Gourmet Cookies", "Health Supplements"],
    ],
    keyFeatures: [
      ["100% Natural", "No Preservatives", "Rich in Nutrients"],
      ["Farm-to-Table", "Gluten-Free Options", "Sustainably Packaged"],
      ["Award-Winning Taste", "Family Recipe", "Quick Preparation"],
    ],
    audiences: ["Health-Conscious Consumers", "Families with Children", "Young Professionals"],
    tones: [
      ["Appetizing", "Friendly", "Relatable"],
      ["Wholesome", "Energetic", "Fun"],
      ["Trustworthy", "Fresh", "Inviting"],
    ],
    usps: [
      ["Farm-Fresh Ingredients", "No Artificial Additives", "Delicious & Healthy"],
      ["Quick & Convenient", "Family Approved", "Sustainably Sourced"],
      ["Award-Winning Recipes", "Affordable Premium", "Nutrition First"],
    ],
    keywords: [
      ["healthy food", "organic", "natural", "snack", "nutrition"],
      ["wholesome", "farm fresh", "preservative free", "family", "convenient"],
    ],
    descriptions: [
      "A health-focused food brand creating delicious, preservative-free products using farm-fresh ingredients for everyday nutrition.",
      "A modern FMCG brand combining great taste with wholesome nutrition, making healthy eating accessible and enjoyable for families.",
    ],
    insightCategories: [
      { category: "Ingredients", title: "Clean Label Promise", description: "All products feature transparent ingredient lists with no artificial preservatives, colours, or flavours." },
      { category: "Taste", title: "Flavour Innovation", description: "Award-winning recipes developed by food scientists and chefs to deliver exceptional taste without compromising nutrition." },
      { category: "Convenience", title: "Modern Lifestyle Fit", description: "Products designed for busy lifestyles — quick preparation, portable packaging, and versatile consumption occasions." },
      { category: "Health Benefits", title: "Nutritional Excellence", description: "Fortified with essential vitamins and minerals, high protein options, and balanced macronutrient profiles." },
    ],
  },
};

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

let insightIdCounter = 0;

/**
 * Simulates AI-powered reference intelligence extraction.
 * Returns industry-aware mock data that varies per invocation.
 *
 * In production this would call an AI/NLP backend service.
 */
export async function extractReferenceIntelligence(
  file: ReferenceFile,
  industryId: IndustryId
): Promise<Partial<BrandContext>> {
  // Simulate extraction latency
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

  const data = INDUSTRY_MOCK_DATA[industryId];
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const insights: BrandInsight[] = data.insightCategories
    .slice(0, 2 + Math.floor(Math.random() * 3))
    .map((ic) => {
      insightIdCounter += 1;
      return {
        id: `insight-${Date.now()}-${insightIdCounter}`,
        category: ic.category,
        title: ic.title,
        description: ic.description,
        confidence: 0.7 + Math.random() * 0.25,
        sourceFileId: file.id,
      };
    });

  return {
    brandName: pick(data.brandNames),
    brandDescription: pick(data.descriptions),
    industry: industryId,
    products: pick(data.products),
    keyFeatures: pick(data.keyFeatures),
    targetAudience: pick(data.audiences),
    brandTone: pick(data.tones),
    uniqueSellingPoints: pick(data.usps),
    keywords: pick(data.keywords),
    extractedInsights: insights,
    sourceFileIds: [file.id],
  };
}

// ---------------------------------------------------------------------------
// Intelligence merging
// ---------------------------------------------------------------------------

/**
 * Merges newly extracted intelligence into the existing brand context.
 * Deduplicates array fields and preserves user edits (existing values take priority for scalar fields).
 */
export function mergeIntelligence(
  existing: BrandContext,
  extracted: Partial<BrandContext>
): BrandContext {
  const mergeArrays = (a: string[], b: string[] | undefined): string[] => {
    if (!b) return a;
    const set = new Set(a.map((s) => s.toLowerCase()));
    const merged = [...a];
    for (const item of b) {
      if (!set.has(item.toLowerCase())) {
        merged.push(item);
        set.add(item.toLowerCase());
      }
    }
    return merged;
  };

  return {
    brandName: existing.brandName || extracted.brandName || "",
    brandDescription: existing.brandDescription || extracted.brandDescription || "",
    industry: existing.industry || extracted.industry || "JEWELLERY",
    products: mergeArrays(existing.products, extracted.products),
    keyFeatures: mergeArrays(existing.keyFeatures, extracted.keyFeatures),
    targetAudience: existing.targetAudience || extracted.targetAudience || "",
    brandTone: mergeArrays(existing.brandTone, extracted.brandTone),
    uniqueSellingPoints: mergeArrays(existing.uniqueSellingPoints, extracted.uniqueSellingPoints),
    keywords: mergeArrays(existing.keywords, extracted.keywords),
    extractedInsights: [
      ...existing.extractedInsights,
      ...(extracted.extractedInsights ?? []),
    ],
    sourceFileIds: [
      ...new Set([
        ...existing.sourceFileIds,
        ...(extracted.sourceFileIds ?? []),
      ]),
    ],
  };
}

// ---------------------------------------------------------------------------
// Reference coverage scoring
// ---------------------------------------------------------------------------

/**
 * Calculates a deterministic reference coverage score based on which
 * brand context fields are populated.
 *
 * Scoring:
 *   Brand Name:   +10
 *   Products:     +20
 *   Key Features: +15
 *   Audience:     +15
 *   Brand Tone:   +15
 *   USP:          +15
 *   Keywords:     +10
 *   ─────────────────
 *   Total:        100
 */
export function calculateReferenceCoverage(
  context: BrandContext
): ReferenceCoverageResult {
  let score = 0;

  const has = {
    brandName: context.brandName.trim().length > 0,
    products: context.products.length > 0,
    keyFeatures: context.keyFeatures.length > 0,
    targetAudience: context.targetAudience.trim().length > 0,
    brandTone: context.brandTone.length > 0,
    uniqueSellingPoints: context.uniqueSellingPoints.length > 0,
    keywords: context.keywords.length > 0,
  };

  if (has.brandName) score += 10;
  if (has.products) score += 20;
  if (has.keyFeatures) score += 15;
  if (has.targetAudience) score += 15;
  if (has.brandTone) score += 15;
  if (has.uniqueSellingPoints) score += 15;
  if (has.keywords) score += 10;

  let level: ReferenceCoverageLevel;
  if (score >= 85) level = "EXCELLENT";
  else if (score >= 65) level = "HIGH";
  else if (score >= 40) level = "MEDIUM";
  else level = "LOW";

  return { score, level, breakdown: has };
}

// ---------------------------------------------------------------------------
// Completeness check
// ---------------------------------------------------------------------------

/**
 * Returns a field-by-field completeness check for the brand context.
 */
export function getContextCompleteness(
  context: BrandContext
): BrandContextCompleteness {
  return {
    brandIdentity:
      context.brandName.trim().length > 0 &&
      context.brandDescription.trim().length > 0,
    products: context.products.length > 0,
    audience: context.targetAudience.trim().length > 0,
    brandTone: context.brandTone.length > 0,
    uniqueSellingPoints: context.uniqueSellingPoints.length > 0,
    keywords: context.keywords.length > 0,
  };
}

// ---------------------------------------------------------------------------
// Empty brand context factory
// ---------------------------------------------------------------------------

/**
 * Creates an empty BrandContext for a given industry.
 */
export function createEmptyBrandContext(industryId: IndustryId): BrandContext {
  return {
    brandName: "",
    brandDescription: "",
    industry: industryId,
    products: [],
    keyFeatures: [],
    targetAudience: "",
    brandTone: [],
    uniqueSellingPoints: [],
    keywords: [],
    extractedInsights: [],
    sourceFileIds: [],
  };
}
