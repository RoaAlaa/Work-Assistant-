type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading…" }: LoadingStateProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-6 py-10 text-center" role="status">
      <div className="mx-auto h-6 w-6 animate-pulse rounded-full bg-slate-300" />
      <p className="mt-3 text-sm text-slate-600">{label}</p>
    </div>
  );
}
