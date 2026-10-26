import type { AssistantMessage, Conversation } from "@/types/assistant";

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "Weekly status draft",
    updatedAt: "2026-10-24T14:20:00.000Z",
  },
  {
    id: "conv-2",
    title: "Invoice follow-up",
    updatedAt: "2026-10-23T09:05:00.000Z",
  },
  {
    id: "conv-3",
    title: "Meeting notes cleanup",
    updatedAt: "2026-10-21T16:40:00.000Z",
  },
];

/** Static sample messages used only to demonstrate chat layout. */
export const mockMessages: AssistantMessage[] = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    role: "user",
    content: "Can you help me outline a weekly status update from these notes?",
    createdAt: "2026-10-24T14:18:00.000Z",
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    role: "assistant",
    content:
      "Sample assistant message (static UI mock). This is not a live model response. Connect sendAssistantMessage() to generate real replies.",
    createdAt: "2026-10-24T14:18:20.000Z",
  },
];
