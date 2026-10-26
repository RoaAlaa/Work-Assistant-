import { cn } from "@/lib/cn";

type NoticeTone = "info" | "error" | "success";

type NoticeProps = {
  title?: string;
  children: string;
  tone?: NoticeTone;
};

const toneClass: Record<NoticeTone, string> = {
  info: "border-slate-200 bg-slate-50 text-slate-700",
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function Notice({ title, children, tone = "info" }: NoticeProps) {
  return (
    <div className={cn("rounded-md border px-3 py-2 text-sm", toneClass[tone])} role="status">
      {title ? <p className="font-medium">{title}</p> : null}
      <p>{children}</p>
    </div>
  );
}
