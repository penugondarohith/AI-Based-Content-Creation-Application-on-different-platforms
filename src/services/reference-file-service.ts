import type { ReferenceFile, ReferenceFileType } from "@/types/reference-file";
import { MAX_FILE_SIZE, MAX_FILES } from "@/config/file-upload";
import { detectFileType } from "@/lib/file-type-detector";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates a file against type, size, duplicate, and count constraints.
 */
export function validateFile(
  file: File,
  existingFiles: ReferenceFile[]
): FileValidationResult {
  // 1. File type
  const detectedType = detectFileType(file);
  if (!detectedType) {
    return {
      valid: false,
      error: `Unsupported file format. "${file.name}" is not a supported file type.`,
    };
  }

  // 2. File size
  if (file.size > MAX_FILE_SIZE) {
    const maxMb = Math.round(MAX_FILE_SIZE / (1024 * 1024));
    return {
      valid: false,
      error: `This file exceeds the maximum upload size of ${maxMb} MB.`,
    };
  }

  // 3. Duplicate detection (by name + size)
  const isDuplicate = existingFiles.some(
    (existing) => existing.name === file.name && existing.size === file.size
  );
  if (isDuplicate) {
    return {
      valid: false,
      error: `"${file.name}" has already been added.`,
    };
  }

  // 4. Max file count
  if (existingFiles.length >= MAX_FILES) {
    return {
      valid: false,
      error: `You can upload a maximum of ${MAX_FILES} files per project.`,
    };
  }

  return { valid: true };
}

// ---------------------------------------------------------------------------
// File creation
// ---------------------------------------------------------------------------

let fileIdCounter = 0;

/**
 * Creates a ReferenceFile metadata object from a native File.
 */
export function createReferenceFile(file: File): ReferenceFile {
  const type = detectFileType(file) as ReferenceFileType;
  fileIdCounter += 1;

  return {
    id: `ref-${Date.now()}-${fileIdCounter}`,
    name: file.name,
    type,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
    status: "UPLOADED",
    uploadedAt: new Date().toISOString(),
    previewUrl: type === "IMAGE" ? URL.createObjectURL(file) : undefined,
  };
}

// ---------------------------------------------------------------------------
// Mock processing pipeline
// ---------------------------------------------------------------------------

/**
 * Simulates server-side file processing.
 * Returns the file with updated status after a simulated delay.
 *
 * In production this would be an API call to a backend service.
 */
export async function processFile(
  refFile: ReferenceFile
): Promise<ReferenceFile> {
  // Simulate processing time (1.5–3 seconds)
  const delay = 1500 + Math.random() * 1500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate a small chance of error (5 %)
  if (Math.random() < 0.05) {
    return { ...refFile, status: "ERROR" };
  }

  return {
    ...refFile,
    status: "READY",
    extractionSummary: `Processed ${refFile.name} — content extracted successfully.`,
  };
}
