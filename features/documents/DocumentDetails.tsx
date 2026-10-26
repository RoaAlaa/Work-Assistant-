import { Button } from "@/components/ui/Button";
import { formatBytes, formatDateTime } from "@/lib/format";
import type { WorkDocument } from "@/types/document";

type DocumentDetailsProps = {
  document: WorkDocument;
  onClose: () => void;
};

export function DocumentDetails({ document, onClose }: DocumentDetailsProps) {
  return (
    <div className="flex flex-col gap-3">
      <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">Name</dt>
          <dd className="font-medium text-slate-900">{document.name}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Type</dt>
          <dd>{document.fileType}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Size</dt>
          <dd>{formatBytes(document.sizeBytes)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Added</dt>
          <dd>{formatDateTime(document.uploadedAt)}</dd>
        </div>
      </dl>
      {document.localPreviewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={document.localPreviewUrl}
          alt={`Preview of ${document.name}`}
          className="max-h-64 rounded-md border border-slate-200 object-contain"
        />
      ) : (
        <p className="rounded-md bg-slate-50 px-3 py-4 text-sm text-slate-600">
          Preview, parsing, and embeddings are not connected. Implement extractDocumentText()
          when you are ready.
        </p>
      )}
      <div className="flex justify-end">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
