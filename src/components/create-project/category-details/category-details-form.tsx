"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Plus } from "lucide-react";
import { getIndustry } from "@/config/industries";
import { getQuestionsForIndustry } from "@/engine/category-question-engine";
import { industryQuestionConfig } from "@/config/industry-question-config";
import { useProject } from "@/context/project-context";
import type { CategoryQuestion } from "@/types/category-question";

function empty(value: unknown) {
  return Array.isArray(value) ? value.length === 0 : value === undefined || value === null || String(value).trim() === "";
}

export function CategoryDetailsForm() {
  const router = useRouter();
  const { industryId, categoryDetails, setCategoryDetails } = useProject();
  const config = industryQuestionConfig[industryId];
  const industry = getIndustry(industryId);
  const questions = getQuestionsForIndustry(industryId);
  const steps = useMemo(() => {
    const configured = config?.steps ?? [];
    return configured.map((step) => ({ ...step, questionIds: step.questionIds.length ? step.questionIds : questions.map((question) => question.id) }));
  }, [config, questions]);
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<Record<string, unknown>>(categoryDetails?.data ?? {});
  const [error, setError] = useState("");
  const step = steps[stepIndex];
  const stepQuestions = questions.filter((question) => step?.questionIds.includes(question.id));

  const update = (id: string, value: unknown) => setData((current) => ({ ...current, [id]: value }));
  const validate = () => {
    const missing = stepQuestions.find((question) => question.required && empty(data[question.id]));
    return missing ? `${missing.label} is required.` : "";
  };
  const next = () => {
    const message = validate();
    if (message) { setError(message); return; }
    setError("");
    if (stepIndex < steps.length - 1) setStepIndex((current) => current + 1);
    else {
      const now = new Date().toISOString();
      setCategoryDetails({ id: categoryDetails?.id ?? "category_details", projectId: categoryDetails?.projectId ?? "project_current", industry: industryId, category: config?.category, data, createdAt: categoryDetails?.createdAt ?? now, updatedAt: now });
      router.push("/create/strategy");
    }
  };
  const back = () => stepIndex > 0 ? setStepIndex((current) => current - 1) : router.push("/create/configure");
  const field = (question: CategoryQuestion) => {
    const value = data[question.id];
    if (question.fieldType === "SELECT") return <select value={String(value ?? "")} onChange={(event) => update(question.id, event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary"><option value="">{question.placeholder ?? "Select an option"}</option>{question.options?.map((option) => <option key={option} value={option}>{option}</option>)}</select>;
    if (question.fieldType === "MULTI_SELECT") return <div className="mt-2 flex flex-wrap gap-2">{question.options?.map((option) => { const selected = Array.isArray(value) && value.includes(option); return <button key={option} type="button" onClick={() => update(question.id, selected ? (value as string[]).filter((item) => item !== option) : [...(Array.isArray(value) ? value : []), option])} className={`rounded-full border px-3 py-2 text-xs transition ${selected ? "border-primary bg-primary-soft text-primary-strong" : "border-border text-muted hover:border-primary/40"}`}>{selected ? <Check size={12} className="mr-1 inline" /> : <Plus size={12} className="mr-1 inline" />}{option}</button>; })}</div>;
    const type = question.fieldType === "DATE" ? "date" : question.fieldType === "NUMBER" ? "number" : "text";
    const input = question.fieldType === "TEXTAREA" ? <textarea value={String(value ?? "")} onChange={(event) => update(question.id, event.target.value)} placeholder={question.placeholder} rows={4} className="mt-2 w-full resize-y rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary" /> : <input type={type} value={String(value ?? "")} onChange={(event) => update(question.id, question.fieldType === "NUMBER" ? Number(event.target.value) : event.target.value)} placeholder={question.placeholder} className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary" />;
    return <label key={question.id} className="block text-sm font-medium">{question.label}{question.required && <span className="ml-1 text-primary">*</span>}{question.helpText && <span className="mt-1 block text-xs font-normal text-muted">{question.helpText}</span>}{input}</label>;
  };

  if (!step) return null;
  return <section className="rounded-xl border border-border bg-surface p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-primary">{industry.name} details</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.03em]">{step.title}</h2><p className="mt-2 text-sm text-muted">Step {stepIndex + 1} of {steps.length}. These details guide every generated post.</p></div><span className="rounded-lg bg-primary-soft px-3 py-2 text-xs font-semibold text-primary">{Math.round(((stepIndex + 1) / steps.length) * 100)}%</span></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-primary-soft"><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} /></div><div className="mt-8 grid gap-5 md:grid-cols-2">{stepQuestions.map(field)}</div>{stepIndex === steps.length - 1 && <div className="mt-6 rounded-lg border border-primary/20 bg-primary-soft/40 p-4"><p className="text-xs font-semibold uppercase tracking-[.16em] text-primary">Content will be generated using</p><div className="mt-3 grid gap-2 text-xs text-foreground sm:grid-cols-2">{Object.entries(data).filter(([, value]) => !empty(value)).map(([key, value]) => <div key={key}><span className="text-muted">{key.replaceAll(/([A-Z])/g, " $1")}: </span><span className="font-medium">{Array.isArray(value) ? value.join(", ") : String(value)}</span></div>)}</div><p className="mt-3 text-[11px] text-muted">Edit any field above before continuing. These provided facts are the source of truth for generation.</p></div>}{error && <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">{error}</p>}<div className="mt-8 flex items-center justify-between border-t border-border pt-5"><button type="button" onClick={back} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted hover:bg-surface-muted"><ArrowLeft size={15} /> Back</button><button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-strong">{stepIndex === steps.length - 1 ? "Save details" : "Continue"}<ArrowRight size={15} /></button></div></section>;
}
