import type { Project } from "./project";
import type { CalendarBlueprintPost, ContentStrategy } from "./content-strategy";
import type { BrandContext } from "./brand-context";
import type { IndustryConfig } from "./industry";
export interface ContentGenerationInput { project: Project; calendarPost: CalendarBlueprintPost; industryDNA: IndustryConfig; brandContext: BrandContext | null; contentStrategy: ContentStrategy; }