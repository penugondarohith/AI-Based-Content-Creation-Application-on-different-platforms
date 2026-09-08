import type { CategoryQuestion } from "@/types/category-question";

export type IndustryQuestionConfig = {
  industry: string;
  category: string;
  questions: CategoryQuestion[];
};

export const industryQuestionConfig: Record<string, IndustryQuestionConfig> = {
  PERFUME: {
    industry: "Perfume",
    category: "Product Details",
    questions: [
      { id: "brandName", label: "Company / Brand Name", fieldType: "TEXT", required: true, placeholder: "Dior", helpText: "Primary brand or company behind the product." },
      { id: "productName", label: "Perfume Name", fieldType: "TEXT", required: true, placeholder: "Sauvage", helpText: "The exact perfume or fragrance being promoted." },
      { id: "launchDate", label: "Launch Date", fieldType: "DATE", required: true, placeholder: "September 2026" },
      { id: "perfumeType", label: "Perfume Type", fieldType: "SELECT", required: true, options: ["Eau de Parfum", "Eau de Toilette", "Parfum", "Body Mist", "Unisex"], placeholder: "Select type" },
      { id: "targetAudience", label: "Target Audience", fieldType: "SELECT", required: true, options: ["Men", "Women", "Unisex", "Young Adults", "Luxury Buyers"], placeholder: "Select audience" },
      { id: "topNotes", label: "Top Notes", fieldType: "TEXT", required: false, placeholder: "Bergamot, pepper" },
      { id: "middleNotes", label: "Middle Notes", fieldType: "TEXT", required: false, placeholder: "Lavender, sandalwood" },
      { id: "baseNotes", label: "Base Notes", fieldType: "TEXT", required: false, placeholder: "Amber, musk" },
      { id: "fragranceFamily", label: "Fragrance Family", fieldType: "SELECT", required: false, options: ["Floral", "Woody", "Fresh", "Citrus", "Oriental", "Spicy", "Gourmand", "Aquatic"], placeholder: "Select family" },
      { id: "keyFeatures", label: "Key Features", fieldType: "MULTI_SELECT", required: false, options: ["Long Lasting", "Premium Ingredients", "Luxury Bottle Design", "Natural Ingredients", "Limited Edition", "Travel Friendly", "Alcohol Free", "Strong Projection"], placeholder: "Select key features" },
      { id: "bottleShape", label: "Bottle Shape", fieldType: "TEXT", required: false, placeholder: "Rectangular glass bottle" },
      { id: "bottleColor", label: "Bottle Color", fieldType: "TEXT", required: false, placeholder: "Amber glass" },
      { id: "bottleMaterial", label: "Bottle Material", fieldType: "TEXT", required: false, placeholder: "Glass" },
      { id: "capStyle", label: "Cap Style", fieldType: "TEXT", required: false, placeholder: "Gold metallic cap" },
      { id: "visualDescription", label: "Visual Description", fieldType: "TEXTAREA", required: false, placeholder: "Transparent rectangular glass bottle with a gold metallic cap and a subtle amber liquid.", helpText: "Describe the product appearance for accurate image generation." },
      { id: "launchType", label: "Launch Type", fieldType: "SELECT", required: false, options: ["New Product Launch", "Seasonal Campaign", "Brand Awareness", "Luxury Promotion", "Limited Edition"], placeholder: "Select launch type" },
      { id: "campaignMessage", label: "Campaign Message", fieldType: "TEXTAREA", required: false, placeholder: "Experience confidence in every moment." },
    ],
  },
  REAL_ESTATE: {
    industry: "Real Estate",
    category: "Property Details",
    questions: [
      { id: "propertyName", label: "Property / Project Name", fieldType: "TEXT", required: true, placeholder: "Aster Heights" },
      { id: "builderName", label: "Builder / Company Name", fieldType: "TEXT", required: true, placeholder: "Aster Realty" },
      { id: "propertyType", label: "Property Type", fieldType: "SELECT", required: true, options: ["Apartment", "Villa", "Independent House", "Commercial Space", "Office", "Plot", "Luxury Residence"], placeholder: "Choose property type" },
      { id: "propertyStatus", label: "Property Status", fieldType: "SELECT", required: true, options: ["Upcoming", "Under Construction", "Ready to Move", "Resale"], placeholder: "Select status" },
      { id: "city", label: "City", fieldType: "TEXT", required: true, placeholder: "Hyderabad" },
      { id: "area", label: "Area / Locality", fieldType: "TEXT", required: true, placeholder: "Madhapur" },
      { id: "state", label: "State", fieldType: "TEXT", required: false, placeholder: "Telangana" },
      { id: "country", label: "Country", fieldType: "TEXT", required: false, placeholder: "India" },
      { id: "nearbyLandmarks", label: "Nearby Landmarks", fieldType: "TEXTAREA", required: false, placeholder: "5 minutes from Metro Station\n10 minutes from Airport\nNear International School" },
      { id: "bedrooms", label: "Number of Bedrooms", fieldType: "NUMBER", required: false, placeholder: "3" },
      { id: "bathrooms", label: "Number of Bathrooms", fieldType: "NUMBER", required: false, placeholder: "3" },
      { id: "propertySize", label: "Property Size", fieldType: "TEXT", required: false, placeholder: "1800 sq ft" },
      { id: "numberOfFloors", label: "Number of Floors", fieldType: "NUMBER", required: false, placeholder: "2" },
      { id: "parkingAvailability", label: "Parking Availability", fieldType: "SELECT", required: false, options: ["Yes", "No"], placeholder: "Select option" },
      { id: "amenities", label: "Amenities", fieldType: "MULTI_SELECT", required: false, options: ["Swimming Pool", "Gym", "Clubhouse", "Children's Play Area", "Security", "Garden", "Jogging Track", "Parking", "Lift", "Smart Home", "Power Backup", "Sports Court", "Rooftop Area"], placeholder: "Select amenities" },
      { id: "customAmenities", label: "Custom Amenities", fieldType: "TEXTAREA", required: false, placeholder: "Private cinema, library lounge" },
      { id: "uniqueFeatures", label: "What makes this property special?", fieldType: "TEXTAREA", required: false, placeholder: "Skyline view, premium interiors, gated community, and smart home technology." },
      { id: "targetAudience", label: "Target Audience", fieldType: "MULTI_SELECT", required: false, options: ["Families", "Working Professionals", "Luxury Buyers", "Investors", "First-Time Buyers"], placeholder: "Select target audience" },
    ],
  },
  JEWELLERY: {
    industry: "Jewellery",
    category: "Product Details",
    questions: [
      { id: "brandName", label: "Brand Name", fieldType: "TEXT", required: true, placeholder: "Aurora Atelier" },
      { id: "productName", label: "Product Name", fieldType: "TEXT", required: true, placeholder: "Solstice Ring" },
      { id: "jewelleryType", label: "Jewellery Type", fieldType: "SELECT", required: true, options: ["Ring", "Necklace", "Bracelet", "Earrings", "Bangle", "Pendant"], placeholder: "Select type" },
      { id: "material", label: "Material", fieldType: "TEXT", required: false, placeholder: "18k gold" },
      { id: "metalType", label: "Metal Type", fieldType: "TEXT", required: false, placeholder: "Gold" },
      { id: "stoneType", label: "Stone Type", fieldType: "TEXT", required: false, placeholder: "Diamond" },
      { id: "designStyle", label: "Design Style", fieldType: "TEXT", required: false, placeholder: "Minimal sculptural" },
      { id: "occasion", label: "Occasion", fieldType: "TEXT", required: false, placeholder: "Anniversary, gifting" },
      { id: "priceCategory", label: "Price Category", fieldType: "TEXT", required: false, placeholder: "Premium luxury" },
      { id: "productFeatures", label: "Product Features", fieldType: "MULTI_SELECT", required: false, options: ["Handcrafted", "Limited Edition", "Customizable", "Gift Ready", "Ethically Sourced", "Signature Detail"], placeholder: "Choose features" },
      { id: "uniqueSellingPoint", label: "Unique Selling Point", fieldType: "TEXTAREA", required: false, placeholder: "Hand-set stones with a signature sculptural silhouette." },
      { id: "visualDescription", label: "Visual Description", fieldType: "TEXTAREA", required: false, placeholder: "A sculptural gold ring with a radiant diamond center and a soft studio backdrop." },
      { id: "targetAudience", label: "Target Audience", fieldType: "TEXT", required: false, placeholder: "Luxury gift buyers" },
    ],
  },
  FMCG_FOOD: {
    industry: "FMCG / Food",
    category: "Product Details",
    questions: [
      { id: "companyName", label: "Company Name", fieldType: "TEXT", required: true, placeholder: "Cedar Foods" },
      { id: "productName", label: "Product Name", fieldType: "TEXT", required: true, placeholder: "Sunrise Granola" },
      { id: "productCategory", label: "Product Category", fieldType: "TEXT", required: true, placeholder: "Breakfast cereal" },
      { id: "ingredients", label: "Ingredients", fieldType: "TEXTAREA", required: false, placeholder: "Oats, almonds, dried berries, coconut" },
      { id: "keyFeatures", label: "Key Features", fieldType: "MULTI_SELECT", required: false, options: ["High Protein", "No Added Sugar", "Gluten Free", "Organic", "Family Friendly", "Ready To Eat"], placeholder: "Select features" },
      { id: "flavor", label: "Flavor", fieldType: "TEXT", required: false, placeholder: "Coconut berry" },
      { id: "packagingType", label: "Packaging Type", fieldType: "TEXT", required: false, placeholder: "Resealable pouch" },
      { id: "packageSize", label: "Package Size", fieldType: "TEXT", required: false, placeholder: "500g" },
      { id: "targetAudience", label: "Target Audience", fieldType: "TEXT", required: false, placeholder: "Health-conscious families" },
      { id: "priceRange", label: "Price Range", fieldType: "TEXT", required: false, placeholder: "₹399 - ₹499" },
      { id: "launchDate", label: "Launch Date", fieldType: "DATE", required: false, placeholder: "September 2026" },
      { id: "productBenefits", label: "Product Benefits", fieldType: "TEXTAREA", required: false, placeholder: "Energy-rich snack with natural ingredients." },
      { id: "uniqueSellingPoint", label: "Unique Selling Point", fieldType: "TEXTAREA", required: false, placeholder: "Slow-roasted for a crunchy texture and clean flavor." },
      { id: "visualDescription", label: "Visual Description", fieldType: "TEXTAREA", required: false, placeholder: "Bright, crisp product shot with ingredients and clean package styling." },
    ],
  },
};

export const getCategoryQuestions = (industry: string) => {
  return industryQuestionConfig[industry]?.questions ?? [];
};
