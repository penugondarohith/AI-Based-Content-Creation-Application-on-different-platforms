export type CategoryQuestionFieldType =
  | "TEXT"
  | "TEXTAREA"
  | "SELECT"
  | "MULTI_SELECT"
  | "DATE"
  | "NUMBER";

export interface CategoryQuestion {
  id: string;
  label: string;
  description?: string;
  fieldType: CategoryQuestionFieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
}

export interface CategoryQuestionStep {
  id: string;
  title: string;
  description?: string;
  questionIds: string[];
}
