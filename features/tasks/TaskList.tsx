import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TASK_CATEGORY_LABELS, TASK_FREQUENCY_LABELS } from "@/lib/constants";
import { formatDateTime } from "@/lib/format";
import type { TaskStatus, WorkTask } from "@/types/task";

type TaskListProps = {
  tasks: WorkTask[];
  onEdit: (id: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function statusTone(status: TaskStatus) {
  if (status === "active") {
    return "green" as const;
  }
  if (status === "paused") {
    return "amber" as const;
  }
  return "neutral" as const;
}

export function TaskList({ tasks, onEdit, onToggle, onDelete }: TaskListProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Task</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Frequency</th>
            <th className="px-4 py-3 font-medium">Next run</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-slate-100 align-top">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{task.title}</p>
                <p className="mt-1 text-slate-600">{task.description}</p>
              </td>
              <td className="px-4 py-3">{TASK_CATEGORY_LABELS[task.category]}</td>
              <td className="px-4 py-3">{TASK_FREQUENCY_LABELS[task.frequency]}</td>
              <td className="px-4 py-3">{formatDateTime(task.nextRunAt)}</td>
              <td className="px-4 py-3">
                <Badge tone={statusTone(task.status)}>{task.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col items-start gap-1">
                  <Button size="sm" variant="ghost" onClick={() => onEdit(task.id)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onToggle(task.id)}>
                    {task.status === "paused" ? "Resume" : "Pause"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete(task.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
