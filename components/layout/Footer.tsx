import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
        <p>
          {APP_NAME} — frontend learning project. AI, voice, and automation are not
          connected yet.
        </p>
      </div>
    </footer>
  );
}
