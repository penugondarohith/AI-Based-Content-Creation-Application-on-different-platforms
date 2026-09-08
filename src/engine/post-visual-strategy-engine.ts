export function buildPostVisualStrategy({
  industry,
  postNumber,
  productName,
}: {
  industry: string;
  postNumber: number;
  productName?: string;
}) {
  const strategyMap: Record<string, string[]> = {
    Perfume: [
      "Hero product shot",
      "Fragrance mood portrait",
      "Ingredient storytelling",
      "Luxury lifestyle moment",
      "Launch campaign hero",
    ],
    "Real Estate": [
      "Property exterior",
      "Luxury interior",
      "Amenities showcase",
      "Location advantage",
      "Investment opportunity",
    ],
    "Jewellery": [
      "Hero product detail",
      "Lifestyle styling",
      "Craftsmanship close-up",
      "Occasion story",
      "Luxury gift moment",
    ],
    "FMCG / Food": [
      "Product hero shot",
      "Ingredient close-up",
      "Lifestyle use case",
      "Flavor highlight",
      "Packaging detail",
    ],
  };

  const options = strategyMap[industry] ?? strategyMap["FMCG / Food"];
  const concept = options[(postNumber - 1) % options.length] ?? options[0];

  return {
    concept,
    productName: productName ?? "featured product",
    summary: `${concept} for ${productName ?? "the featured product"}`,
  };
}
