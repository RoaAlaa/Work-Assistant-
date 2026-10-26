export type MessageRole = "user" | "assistant";

export interface AssistantMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  attachmentNames?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

export interface SendMessageInput {
  conversationId: string;
  content: string;
  attachmentNames?: string[];
}
