"use client";

import { useMemo, useState } from "react";
import { mockTasks } from "@/data/tasks";
import { runTask, saveTask } from "@/lib/ai/tasks";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Notice } from "@/components/ui/Notice";
import { Select } from "@/components/ui/Select";
import { TaskForm } from "@/features/tasks/TaskForm";
import { TaskList } from "@/features/tasks/TaskList";
import { TASK_CATEGORY_LABELS } from "@/lib/constants";
import type { TaskDraft, WorkTask } from "@/types/task";

export function TasksWorkspace() {
  const [tasks, setTasks] = useState<WorkTask[]>(mockTasks);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesStatus = statusFilter === "all" || task.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
        return matchesStatus && matchesCategory;
      }),
    [tasks, statusFilter, categoryFilter],
  );

  const editingTask = tasks.find((task) => task.id === editingId);

  async function persistPlaceholder(taskId: string) {
    try {
      await saveTask(taskId);
    } catch {
      setNotice("Task saved in local UI state only. Automation and scheduling are not connected.");
    }
  }

  function handleCreate(draft: TaskDraft) {
    const task: WorkTask = { id: `task-${Date.now()}`, ...draft };
    setTasks((current) => [task, ...current]);
    setCreating(false);
    void persistPlaceholder(task.id);
  }

  function handleEdit(draft: TaskDraft) {
    if (!editingId) {
      return;
    }
    setTasks((current) =>
      current.map((task) => (task.id === editingId ? { ...task, ...draft } : task)),
    );
    setEditingId(null);
    void persistPlaceholder(editingId);
  }

  function handleToggle(id: string) {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) {
          return task;
        }
        const nextStatus = task.status === "paused" ? "active" : "paused";
        return { ...task, status: nextStatus };
      }),
    );
    void persistPlaceholder(id);
    void runTask(id).catch(() => {
      setNotice("Pause/resume updated locally. runTask() is not implemented.");
    });
  }

  function confirmDelete() {
    if (!deleteId) {
      return;
    }
    setTasks((current) => current.filter((task) => task.id !== deleteId));
    setDeleteId(null);
    setNotice("Task removed from local UI state only.");
  }

  return (
    <div className="flex flex-col gap-4">
      <Notice title="Automation is not connected">
        You can create, edit, pause, and delete tasks in this browser session. No jobs are
        scheduled and no agents will run.
      </Notice>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid flex-1 gap-3 sm:grid-cols-2">
          <Select
            id="status-filter"
            label="Filter by status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            options={[
              { value: "all", label: "All statuses" },
              { value: "active", label: "Active" },
              { value: "paused", label: "Paused" },
              { value: "draft", label: "Draft" },
            ]}
          />
          <Select
            id="category-filter"
            label="Filter by category"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            options={[
              { value: "all", label: "All categories" },
              ...Object.entries(TASK_CATEGORY_LABELS).map(([value, label]) => ({
                value,
                label,
              })),
            ]}
          />
        </div>
        <Button onClick={() => setCreating(true)}>Create task</Button>
      </div>

      {notice ? <Notice>{notice}</Notice> : null}

      {filtered.length === 0 ? (
        <EmptyState
          title="No tasks match these filters"
          description="Create a task to start organizing repetitive work. Execution stays disconnected until you implement runTask()."
          action={<Button onClick={() => setCreating(true)}>Create task</Button>}
        />
      ) : (
        <TaskList
          tasks={filtered}
          onEdit={setEditingId}
          onToggle={handleToggle}
          onDelete={setDeleteId}
        />
      )}

      <Dialog open={creating} title="Create task" onClose={() => setCreating(false)}>
        <TaskForm onSubmit={handleCreate} onCancel={() => setCreating(false)} />
      </Dialog>

      <Dialog
        open={Boolean(editingTask)}
        title="Edit task"
        onClose={() => setEditingId(null)}
      >
        {editingTask ? (
          <TaskForm
            initial={editingTask}
            onSubmit={handleEdit}
            onCancel={() => setEditingId(null)}
          />
        ) : null}
      </Dialog>

      <Dialog
        open={Boolean(deleteId)}
        title="Delete task?"
        onClose={() => setDeleteId(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-700">
          This removes the task from local UI state. It does not cancel a backend job because
          scheduling is not connected.
        </p>
      </Dialog>
    </div>
  );
}
