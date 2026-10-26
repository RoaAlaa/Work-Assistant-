import type { SendMessageInput } from "@/types/assistant";

/**
 * INTEGRATION POINT — send a user message to your AI backend.
 *
 * Implement LLM calls, streaming, prompt construction, and persistence here.
 * The UI should call this function; do not hide model logic inside React components.
 */
export async function sendAssistantMessage(
  _input: SendMessageInput,
): Promise<{ assistantMessage: string }> {
  throw new Error(
    "Not implemented: connect sendAssistantMessage() in lib/ai/assistant.ts to your AI backend.",
  );
}

/**
 * INTEGRATION POINT — create or load a conversation from your backend.
 */
export async function createConversation(): Promise<{ id: string }> {
  throw new Error(
    "Not implemented: connect createConversation() in lib/ai/assistant.ts.",
  );
}

/**
 * INTEGRATION POINT — load conversation history from your backend.
 */
export async function loadConversationMessages(
  _conversationId: string,
): Promise<never> {
  throw new Error(
    "Not implemented: connect loadConversationMessages() in lib/ai/assistant.ts.",
  );
}
