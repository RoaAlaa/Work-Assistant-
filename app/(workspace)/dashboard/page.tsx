import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { dashboardSummary, placeholderUser } from "@/data/dashboard";
import { mockConversations } from "@/data/conversations";
import { mockDocuments } from "@/data/documents";
import { mockTasks } from "@/data/tasks";
import { TASK_CATEGORY_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/format";

export default function DashboardPage() {
  const recentDocuments = mockDocuments.slice(0, 3);
  const recentTasks = mockTasks.slice(0, 3);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          Welcome back, {placeholderUser.name}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          This dashboard uses mock data. Assistant replies, uploads, and task runs are not
          connected.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500">Total documents</p>
          <p className="mt-2 text-3xl font-semibold">{dashboardSummary.totalDocuments}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Tasks</p>
          <p className="mt-2 text-3xl font-semibold">{dashboardSummary.totalTasks}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500">Recent conversations</p>
          <p className="mt-2 text-3xl font-semibold">
            {dashboardSummary.recentConversations}
          </p>
        </Card>
      </section>

      <div className="flex">
        <Link
          href="/assistant"
          className="inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          Open assistant
        </Link>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Recent documents</h3>
            <Link href="/documents" className="text-sm text-blue-700 hover:underline">
              View all
            </Link>
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            {recentDocuments.map((document) => (
              <li key={document.id} className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-800">{document.name}</span>
                <span className="text-slate-500">{formatDate(document.uploadedAt)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Recent tasks</h3>
            <Link href="/tasks" className="text-sm text-blue-700 hover:underline">
              View all
            </Link>
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            {recentTasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-800">{task.title}</span>
                <span className="text-slate-500">
                  {TASK_CATEGORY_LABELS[task.category]}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card>
        <h3 className="font-semibold text-slate-900">Recent assistant conversations</h3>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {mockConversations.map((conversation) => (
            <li key={conversation.id} className="flex justify-between gap-3">
              <span>{conversation.title}</span>
              <span className="text-slate-500">{formatDate(conversation.updatedAt)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
