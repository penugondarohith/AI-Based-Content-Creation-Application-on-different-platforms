import { demoBrandContext } from "@/demo/demo-brand-context";
import { demoContentStrategy } from "@/demo/demo-content-strategy";
import { demoGeneratedContent } from "@/demo/demo-generated-content";
import { demoPerformanceData } from "@/demo/demo-performance-data";
import { demoPlatformContent } from "@/demo/demo-platform-content";
import { demoProject } from "@/demo/demo-project";

export function loadDemoProject() {
  return {
    project: demoProject,
    brandContext: demoBrandContext,
    contentStrategy: demoContentStrategy,
    generatedContent: demoGeneratedContent,
    platformContent: demoPlatformContent,
    performance: demoPerformanceData,
  };
}

export function resetDemoState() {
  return loadDemoProject();
}
