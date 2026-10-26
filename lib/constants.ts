export const APP_NAME = "AI Work Assistant";

export const ACCEPTED_DOCUMENT_TYPES: string[] = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
  "text/csv",
  "image/png",
  "image/jpeg",
];

export const ACCEPTED_DOCUMENT_EXTENSIONS: string[] = [
  ".pdf",
  ".docx",
  ".txt",
  ".md",
  ".csv",
  ".png",
  ".jpg",
  ".jpeg",
];

export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024;

export const TASK_CATEGORY_LABELS: Record<string, string> = {
  email: "Email processing",
  documents: "Document processing",
  reporting: "Reporting",
  "data-entry": "Data entry",
};

export const TASK_FREQUENCY_LABELS: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};
