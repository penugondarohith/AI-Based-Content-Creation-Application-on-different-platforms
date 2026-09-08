import type { ReferenceFileType } from "@/types/reference-file";

/** Maximum file size in bytes (10 MB) */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Maximum number of files per project */
export const MAX_FILES = 10;

/** Maps MIME types to ReferenceFileType */
export const SUPPORTED_MIME_TYPES: Record<string, ReferenceFileType> = {
  "application/pdf": "PDF",
  "application/msword": "DOCUMENT",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCUMENT",
  "application/vnd.ms-powerpoint": "PRESENTATION",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PRESENTATION",
  "application/vnd.ms-excel": "SPREADSHEET",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "SPREADSHEET",
  "text/plain": "TEXT",
  "image/jpeg": "IMAGE",
  "image/png": "IMAGE",
};

/** Maps file extensions (lowercase, with dot) to ReferenceFileType */
export const SUPPORTED_EXTENSIONS: Record<string, ReferenceFileType> = {
  ".pdf": "PDF",
  ".doc": "DOCUMENT",
  ".docx": "DOCUMENT",
  ".ppt": "PRESENTATION",
  ".pptx": "PRESENTATION",
  ".xls": "SPREADSHEET",
  ".xlsx": "SPREADSHEET",
  ".txt": "TEXT",
  ".jpg": "IMAGE",
  ".jpeg": "IMAGE",
  ".png": "IMAGE",
};

/** Human-readable labels for each file type category */
export const FILE_TYPE_LABELS: Record<ReferenceFileType, string> = {
  PDF: "PDF Document",
  DOCUMENT: "Document",
  PRESENTATION: "Presentation",
  SPREADSHEET: "Spreadsheet",
  TEXT: "Text File",
  IMAGE: "Image",
};

/** Display badges shown in the upload zone */
export const SUPPORTED_FORMAT_BADGES = [
  "PDF",
  "DOCX",
  "PPTX",
  "XLSX",
  "TXT",
  "JPG",
  "PNG",
] as const;
