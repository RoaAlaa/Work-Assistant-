import type { WorkTask } from "@/types/task";

export const mockTasks: WorkTask[] = [
  {
    id: "task-1",
    title: "Triage inbound support email",
    description: "Group unread support messages by topic and draft short replies.",
    category: "email",
    frequency: "daily",
    nextRunAt: "2026-10-26T08:00:00.000Z",
    status: "active",
  },
  {
    id: "task-2",
    title: "Summarize uploaded contracts",
    description: "Create a one-page summary for newly added contract PDFs.",
    category: "documents",
    frequency: "weekly",
    nextRunAt: "2026-10-27T10:00:00.000Z",
    status: "paused",
  },
  {
    id: "task-3",
    title: "Weekly operations report",
    description: "Compile open tasks, document counts, and blockers into a report.",
    category: "reporting",
    frequency: "weekly",
    nextRunAt: "2026-10-31T09:00:00.000Z",
    status: "active",
  },
  {
    id: "task-4",
    title: "Copy invoice rows into tracker",
    description: "Move extracted invoice fields into the shared tracking sheet.",
    category: "data-entry",
    frequency: "monthly",
    nextRunAt: "2026-11-01T09:00:00.000Z",
    status: "draft",
  },
];
