import type { ReactNode } from "react";

/** Big scannable stat tiles for the top of a data report. */
export function KeyStats({
  stats = [],
}: {
  stats?: { value: string; label: string; note?: string }[];
}) {
  if (!stats.length) return null;
  return (
    <div className="not-prose grid grid-cols-2 lg:grid-cols-4 gap-3 my-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-card p-4 flex flex-col"
        >
          <span className="text-2xl sm:text-3xl font-bold text-foreground leading-none tabular-nums">
            {s.value}
          </span>
          <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-primary">
            {s.label}
          </span>
          {s.note && (
            <span className="mt-1 text-xs text-muted-foreground leading-snug">
              {s.note}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** The central contrast: how the data is usually read vs what it supports. */
export function MythReality({
  myth,
  reality,
}: {
  myth: ReactNode;
  reality: ReactNode;
}) {
  return (
    <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
      <div className="rounded-xl border border-rose-500/25 bg-rose-500/[0.06] p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-2 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Common reading
        </p>
        <p className="text-sm text-foreground/85 leading-relaxed">{myth}</p>
      </div>
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          What the data supports
        </p>
        <p className="text-sm text-foreground/85 leading-relaxed">{reality}</p>
      </div>
    </div>
  );
}

/** One-line "so what" attached to a figure. */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose -mt-2 mb-8 flex items-start gap-2.5 rounded-lg border-l-2 border-primary bg-primary/[0.06] px-4 py-3">
      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <div className="text-sm text-foreground/85 leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

/** Closing block: what the analysis demonstrates, for a portfolio reader. */
export function Methods({
  items = [],
  children,
}: {
  items?: string[];
  children?: ReactNode;
}) {
  return (
    <div className="not-prose my-10 rounded-xl border border-border bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        How this was done
      </p>
      {children && (
        <p className="text-sm text-foreground/85 leading-relaxed mb-4">{children}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <span
            key={i}
            className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}
