/**
 * INTEGRATION POINT — upload a selected file to storage.
 * The documents UI currently only keeps files in browser memory.
 */
export async function uploadDocument(_file: File): Promise<{ id: string }> {
  throw new Error(
    "Not implemented: connect uploadDocument() in lib/ai/documents.ts.",
  );
}

/**
 * INTEGRATION POINT — parse or extract text from a document.
 */
export async function extractDocumentText(_documentId: string): Promise<{ text: string }> {
  throw new Error(
    "Not implemented: connect extractDocumentText() in lib/ai/documents.ts.",
  );
}

/**
 * INTEGRATION POINT — chunking, embeddings, vector store, and RAG retrieval.
 */
export async function indexDocumentForRetrieval(_documentId: string): Promise<void> {
  throw new Error(
    "Not implemented: connect indexDocumentForRetrieval() in lib/ai/documents.ts.",
  );
}
