import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { TASK_CATEGORY_LABELS, TASK_FREQUENCY_LABELS } from "@/lib/constants";
import { required } from "@/lib/validation";
import type { TaskDraft, WorkTask } from "@/types/task";

type TaskFormProps = {
  initial?: WorkTask;
  onSubmit: (draft: TaskDraft) => void;
  onCancel: () => void;
};

const categoryOptions = Object.entries(TASK_CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const frequencyOptions = Object.entries(TASK_FREQUENCY_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export function TaskForm({ initial, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState<TaskDraft["category"]>(
    initial?.category ?? "email",
  );
  const [frequency, setFrequency] = useState<TaskDraft["frequency"]>(
    initial?.frequency ?? "daily",
  );
  const [nextRunAt, setNextRunAt] = useState(
    initial?.nextRunAt ? initial.nextRunAt.slice(0, 16) : "2026-10-26T09:00",
  );
  const [status, setStatus] = useState<TaskDraft["status"]>(initial?.status ?? "draft");
  const [titleError, setTitleError] = useState<string | undefined>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const error = required(title, "Title");
    if (error) {
      setTitleError(error);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category,
      frequency,
      nextRunAt: new Date(nextRunAt).toISOString(),
      status,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        id="task-title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        error={titleError}
      />
      <Textarea
        id="task-description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Select
          id="task-category"
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value as TaskDraft["category"])}
          options={categoryOptions}
        />
        <Select
          id="task-frequency"
          label="Frequency"
          value={frequency}
          onChange={(event) => setFrequency(event.target.value as TaskDraft["frequency"])}
          options={frequencyOptions}
        />
        <Input
          id="task-next-run"
          label="Next scheduled run"
          type="datetime-local"
          value={nextRunAt}
          onChange={(event) => setNextRunAt(event.target.value)}
        />
        <Select
          id="task-status"
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value as TaskDraft["status"])}
          options={[
            { value: "draft", label: "Draft" },
            { value: "active", label: "Active" },
            { value: "paused", label: "Paused" },
          ]}
        />
      </div>
      <p className="text-xs text-slate-500">
        Saving updates local UI state only. Scheduling and AI automation are not connected.
      </p>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initial ? "Save changes" : "Create task"}</Button>
      </div>
    </form>
  );
}
