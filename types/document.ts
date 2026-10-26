export type DocumentStatus = "selected-locally" | "listed" | "processing-unavailable";

export interface WorkDocument {
  id: string;
  name: string;
  fileType: string;
  sizeBytes: number;
  uploadedAt: string;
  status: DocumentStatus;
  /** Temporary browser preview URL for files chosen in this session. */
  localPreviewUrl?: string;
}
