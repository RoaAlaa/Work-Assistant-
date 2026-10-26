"use client";

import { useMemo, useState } from "react";
import { mockDocuments } from "@/data/documents";
import { uploadDocument } from "@/lib/ai/documents";
import {
  ACCEPTED_DOCUMENT_EXTENSIONS,
  ACCEPTED_DOCUMENT_TYPES,
  MAX_DOCUMENT_SIZE_BYTES,
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Input } from "@/components/ui/Input";
import { LoadingState } from "@/components/ui/LoadingState";
import { Notice } from "@/components/ui/Notice";
import { Select } from "@/components/ui/Select";
import { DocumentDetails } from "@/features/documents/DocumentDetails";
import { DocumentList } from "@/features/documents/DocumentList";
import { FileDropzone } from "@/features/documents/FileDropzone";
import type { WorkDocument } from "@/types/document";

type ViewState = "ready" | "loading" | "error";

function extensionOf(name: string): string {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index).toLowerCase() : "";
}

function isAcceptedFile(file: File): boolean {
  const extension = extensionOf(file.name);
  return (
    ACCEPTED_DOCUMENT_TYPES.includes(file.type) ||
    ACCEPTED_DOCUMENT_EXTENSIONS.includes(extension)
  );
}

export function DocumentsWorkspace() {
  const [documents, setDocuments] = useState<WorkDocument[]>(mockDocuments);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>("ready");

  const typeOptions = useMemo(() => {
    const types = Array.from(new Set(documents.map((document) => document.fileType)));
    return [
      { value: "all", label: "All types" },
      ...types.map((type) => ({ value: type, label: type })),
    ];
  }, [documents]);

  const filtered = documents.filter((document) => {
    const matchesQuery = document.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = typeFilter === "all" || document.fileType === typeFilter;
    return matchesQuery && matchesType;
  });

  const selected = documents.find((document) => document.id === selectedId) ?? null;

  async function handleFiles(files: File[]) {
    const accepted: WorkDocument[] = [];
    const rejected: string[] = [];

    for (const file of files) {
      if (!isAcceptedFile(file)) {
        rejected.push(`${file.name} (unsupported type)`);
        continue;
      }
      if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
        rejected.push(`${file.name} (too large)`);
        continue;
      }

      const localDocument: WorkDocument = {
        id: `local-${file.name}-${file.lastModified}`,
        name: file.name,
        fileType: extensionOf(file.name).replace(".", "").toUpperCase() || "FILE",
        sizeBytes: file.size,
        uploadedAt: new Date().toISOString(),
        status: "selected-locally",
        localPreviewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      };
      accepted.push(localDocument);

      try {
        await uploadDocument(file);
      } catch {
        // Expected until the student implements storage upload.
      }
    }

    if (accepted.length > 0) {
      setDocuments((current) => [...accepted, ...current]);
    }

    const parts = [
      accepted.length > 0 ? `${accepted.length} file(s) kept in local UI state.` : null,
      rejected.length > 0 ? `Skipped: ${rejected.join("; ")}.` : null,
      "Server upload is not connected.",
    ].filter(Boolean);
    setNotice(parts.join(" "));
  }

  return (
    <div className="flex flex-col gap-4">
      <Notice title="Upload is a UI-only step">
        Selecting a file does not send it to storage, extract text, or create embeddings.
      </Notice>

      <FileDropzone onFiles={handleFiles} />

      <div className="grid gap-3 md:grid-cols-[1fr_12rem]">
        <Input
          id="document-search"
          label="Search documents"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name"
        />
        <Select
          id="document-type"
          label="Filter by type"
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          options={typeOptions}
        />
      </div>

      {notice ? <Notice>{notice}</Notice> : null}

      <p className="text-xs text-slate-500">
        UI placeholders:{" "}
        <button type="button" className="underline" onClick={() => setViewState("loading")}>
          loading
        </button>
        {", "}
        <button type="button" className="underline" onClick={() => setViewState("error")}>
          error
        </button>
        {", "}
        <button type="button" className="underline" onClick={() => setViewState("ready")}>
          ready
        </button>
      </p>

      {viewState === "loading" ? (
        <LoadingState label="Loading documents…" />
      ) : null}

      {viewState === "error" ? (
        <ErrorState
          message="Could not load documents. This list is currently mock data."
          onRetry={() => setViewState("ready")}
        />
      ) : null}

      {viewState === "ready" && filtered.length === 0 ? (
        <EmptyState
          title="No documents to show"
          description="Select a supported file or clear your filters. Nothing is uploaded until you implement uploadDocument()."
          action={
            query || typeFilter !== "all" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setQuery("");
                  setTypeFilter("all");
                }}
              >
                Clear filters
              </Button>
            ) : null
          }
        />
      ) : null}

      {viewState === "ready" && filtered.length > 0 ? (
        <DocumentList
          documents={filtered}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      ) : null}

      <Dialog
        open={Boolean(selected)}
        title={selected ? selected.name : "Document"}
        onClose={() => setSelectedId(null)}
      >
        {selected ? (
          <DocumentDetails document={selected} onClose={() => setSelectedId(null)} />
        ) : null}
      </Dialog>
    </div>
  );
}
