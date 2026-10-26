"use client";

import { DragEvent, useState } from "react";
import { ACCEPTED_DOCUMENT_EXTENSIONS, MAX_DOCUMENT_SIZE_BYTES } from "@/lib/constants";
import { formatBytes } from "@/lib/format";

type FileDropzoneProps = {
  onFiles: (files: File[]) => void;
};

export function FileDropzone({ onFiles }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  function collectFiles(fileList: FileList | null): File[] {
    if (!fileList) {
      return [];
    }
    return Array.from(fileList);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    onFiles(collectFiles(event.dataTransfer.files));
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`rounded-lg border-2 border-dashed px-6 py-10 text-center ${
        isDragging ? "border-blue-700 bg-blue-50" : "border-slate-300 bg-white"
      }`}
    >
      <p className="text-sm font-medium text-slate-900">Drag and drop files here</p>
      <p className="mt-1 text-sm text-slate-600">
        Files stay in the browser. Server upload is not connected. Max size{" "}
        {formatBytes(MAX_DOCUMENT_SIZE_BYTES)}.
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Supported: {ACCEPTED_DOCUMENT_EXTENSIONS.join(", ")}
      </p>
      <label className="mt-4 inline-flex cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">
        <input
          type="file"
          className="sr-only"
          multiple
          accept={ACCEPTED_DOCUMENT_EXTENSIONS.join(",")}
          onChange={(event) => {
            onFiles(collectFiles(event.target.files));
            event.target.value = "";
          }}
        />
        Browse files
      </label>
    </div>
  );
}
