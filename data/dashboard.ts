import { mockConversations } from "@/data/conversations";
import { mockDocuments } from "@/data/documents";
import { mockTasks } from "@/data/tasks";
import type { PlaceholderUser } from "@/types/user";

export const placeholderUser: PlaceholderUser = {
  name: "Alex Morgan",
  email: "alex@example.com",
};

export const dashboardSummary = {
  totalDocuments: mockDocuments.length,
  totalTasks: mockTasks.length,
  recentConversations: mockConversations.length,
};
