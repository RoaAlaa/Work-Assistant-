import { Suspense, type ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-600">Loading workspace…</div>}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
