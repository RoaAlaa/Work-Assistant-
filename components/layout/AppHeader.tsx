"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { placeholderUser } from "@/data/dashboard";
import { Button } from "@/components/ui/Button";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/assistant": "Assistant",
  "/documents": "Documents",
  "/tasks": "Tasks",
};

type AppHeaderProps = {
  onOpenSidebar: () => void;
};

export function AppHeader({ onOpenSidebar }: AppHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const title = titles[pathname] ?? "Workspace";

  return (
    <header className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          className="md:hidden"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
        >
          Menu
        </Button>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
      </div>

      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs text-white">
            {placeholderUser.name.charAt(0)}
          </span>
          <span className="hidden sm:inline">{placeholderUser.name}</span>
        </button>
        {menuOpen ? (
          <div
            role="menu"
            className="absolute right-0 z-20 mt-2 w-56 rounded-md border border-slate-200 bg-white p-2 shadow-md"
          >
            <p className="px-2 py-1 text-xs text-slate-500">{placeholderUser.email}</p>
            <p className="px-2 py-1 text-sm text-slate-600">
              Profile menu is a placeholder. Auth is not connected.
            </p>
            <Link
              href="/login"
              role="menuitem"
              className="mt-1 block rounded-md px-2 py-1.5 text-sm hover:bg-slate-50"
              onClick={() => setMenuOpen(false)}
            >
              Back to login
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
