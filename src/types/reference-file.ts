export type ReferenceFileType =
  | "PDF"
  | "DOCUMENT"
  | "PRESENTATION"
  | "SPREADSHEET"
  | "TEXT"
  | "IMAGE";

export type ReferenceFileStatus =
  | "UPLOADED"
  | "PROCESSING"
  | "READY"
  | "ERROR";

export interface ReferenceFile {
  id: string;
  name: string;
  type: ReferenceFileType;
  mimeType: string;
  size: number;
  status: ReferenceFileStatus;
  uploadedAt: string;
  previewUrl?: string;
  extractedText?: string;
  extractionSummary?: string;
  metadata?: Record<string, unknown>;
}
