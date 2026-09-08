import type { ReferenceFileType } from "@/types/reference-file";
import { SUPPORTED_MIME_TYPES, SUPPORTED_EXTENSIONS } from "@/config/file-upload";

/**
 * Detects the ReferenceFileType for a given File object.
 * Uses MIME type as primary detection, file extension as fallback.
 */
export function detectFileType(file: File): ReferenceFileType | null {
  // Primary: MIME type detection
  if (file.type && SUPPORTED_MIME_TYPES[file.type]) {
    return SUPPORTED_MIME_TYPES[file.type];
  }

  // Fallback: extension detection
  const ext = getFileExtension(file.name);
  if (ext && SUPPORTED_EXTENSIONS[ext]) {
    return SUPPORTED_EXTENSIONS[ext];
  }

  return null;
}

/**
 * Checks whether a file's type is supported.
 */
export function isFileTypeSupported(file: File): boolean {
  return detectFileType(file) !== null;
}

/**
 * Extracts the lowercase file extension including the dot.
 * Returns empty string if no extension found.
 */
export function getFileExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot === -1 || lastDot === fileName.length - 1) return "";
  return fileName.slice(lastDot).toLowerCase();
}

/**
 * Formats byte count into a human-readable file size string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);
  return `${size % 1 === 0 ? size : size.toFixed(1)} ${units[i]}`;
}
