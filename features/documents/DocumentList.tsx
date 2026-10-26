import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatBytes, formatDate } from "@/lib/format";
import type { DocumentStatus, WorkDocument } from "@/types/document";

type DocumentListProps = {
  documents: WorkDocument[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function statusTone(status: DocumentStatus) {
  if (status === "selected-locally") {
    return "blue" as const;
  }
  if (status === "processing-unavailable") {
    return "amber" as const;
  }
  return "neutral" as const;
}

function statusLabel(status: DocumentStatus) {
  if (status === "selected-locally") {
    return "Selected locally";
  }
  if (status === "processing-unavailable") {
    return "Processing unavailable";
  }
  return "Listed (mock)";
}

export function DocumentList({ documents, selectedId, onSelect }: DocumentListProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Size</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr
              key={document.id}
              className={selectedId === document.id ? "bg-blue-50" : "border-t border-slate-100"}
            >
              <td className="px-4 py-3 font-medium text-slate-900">{document.name}</td>
              <td className="px-4 py-3 text-slate-600">{document.fileType}</td>
              <td className="px-4 py-3 text-slate-600">{formatBytes(document.sizeBytes)}</td>
              <td className="px-4 py-3 text-slate-600">{formatDate(document.uploadedAt)}</td>
              <td className="px-4 py-3">
                <Badge tone={statusTone(document.status)}>{statusLabel(document.status)}</Badge>
              </td>
              <td className="px-4 py-3">
                <Button size="sm" variant="ghost" onClick={() => onSelect(document.id)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
