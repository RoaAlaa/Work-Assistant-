export type TaskCategory = "email" | "documents" | "reporting" | "data-entry";
export type TaskFrequency = "daily" | "weekly" | "monthly";
export type TaskStatus = "active" | "paused" | "draft";

export interface WorkTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  frequency: TaskFrequency;
  nextRunAt: string;
  status: TaskStatus;
}

export interface TaskDraft {
  title: string;
  description: string;
  category: TaskCategory;
  frequency: TaskFrequency;
  nextRunAt: string;
  status: TaskStatus;
}
