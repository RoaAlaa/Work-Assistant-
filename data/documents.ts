import type { WorkDocument } from "@/types/document";

export const mockDocuments: WorkDocument[] = [
  {
    id: "doc-1",
    name: "Q3-operations-summary.pdf",
    fileType: "PDF",
    sizeBytes: 482_110,
    uploadedAt: "2026-10-20T11:00:00.000Z",
    status: "listed",
  },
  {
    id: "doc-2",
    name: "vendor-invoices-october.csv",
    fileType: "CSV",
    sizeBytes: 64_220,
    uploadedAt: "2026-10-18T08:30:00.000Z",
    status: "listed",
  },
  {
    id: "doc-3",
    name: "onboarding-checklist.docx",
    fileType: "DOCX",
    sizeBytes: 91_004,
    uploadedAt: "2026-10-12T15:45:00.000Z",
    status: "processing-unavailable",
  },
];
