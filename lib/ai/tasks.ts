/**
 * INTEGRATION POINT — schedule or run a task with an AI agent / workflow.
 * The tasks UI currently only updates local React state.
 */
export async function runTask(_taskId: string): Promise<{ runId: string }> {
  throw new Error("Not implemented: connect runTask() in lib/ai/tasks.ts.");
}

/**
 * INTEGRATION POINT — persist task definitions to your backend.
 */
export async function saveTask(_taskId: string): Promise<void> {
  throw new Error("Not implemented: connect saveTask() in lib/ai/tasks.ts.");
}
