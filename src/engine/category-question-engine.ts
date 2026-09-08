import { getCategoryQuestions } from "@/config/industry-question-config";
import type { CategoryQuestion } from "@/types/category-question";

export function getQuestionsForIndustry(industry: string): CategoryQuestion[] {
  return getCategoryQuestions(industry);
}

export function getCategoryDetailProgress(data: Record<string, unknown>, industry: string) {
  const questions = getQuestionsForIndustry(industry);

  const isMissingValue = (value: unknown) => {
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "string") return value.trim().length === 0;
    if (typeof value === "number") return !Number.isFinite(value);
    return value === undefined || value === null || value === "" || value === false;
  };

  const answered = questions.filter((question) => !isMissingValue(data[question.id])).length;

  const total = questions.length || 1;
  const percent = Math.round((answered / total) * 100);

  return {
    answered,
    total,
    percent,
    missing: questions.filter((question) => isMissingValue(data[question.id])).map((question) => question.label),
  };
}

export function getIndustryCategorySummary(industry: string) {
  const questionSet = getQuestionsForIndustry(industry);
  return {
    industry,
    categoryLabel: questionSet.length ? "Product details" : "General details",
    count: questionSet.length,
  };
}
