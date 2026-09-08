export type IndustryId = "REAL_ESTATE" | "JEWELLERY" | "PERFUME" | "FMCG_FOOD";

export type IndustryConfig = {
  id: IndustryId;
  name: string;
  shortName: string;
  description: string;
  strategyLabel?: string;
  icon: string;
  color: string;
  tone: string[];
  focusAreas: string[];
  contentGoals: string[];
};