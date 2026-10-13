import type { ReactNode } from "react";

// Family classes written out in full so Tailwind sees them.
const statTone = {
  data: { tile: "bg-data-wash", value: "text-data" },
  decision: { tile: "bg-decision-wash", value: "text-decision" },
};

/** Big scannable stat tiles for the top of a data report. */
export function KeyStats({
  stats = [],
  tone = "data",
}: {
  stats?: { value: string; label: string; note?: string }[];
  tone?: keyof typeof statTone;
}) {
  if (!stats.length) return null;
  return (
    <div className="not-prose mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`flex flex-col rounded-xl px-4 py-4 ${statTone[tone].tile}`}
        >
          <span className={`text-2xl font-semibold leading-none tabular-nums sm:text-3xl ${statTone[tone].value}`}>
            {s.value}
          </span>
          <span className="mt-2 text-sm font-semibold leading-snug text-foreground">
            {s.label}
          </span>
          {s.note && (
            <span className="mt-1 text-xs leading-snug text-muted-foreground">
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
    <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl bg-danger-wash p-5">
        <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-danger">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Common reading
        </p>
        <p className="text-sm leading-relaxed text-foreground">{myth}</p>
      </div>
      <div className="rounded-2xl bg-field-wash p-5">
        <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-field">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          What the data supports
        </p>
        <p className="text-sm leading-relaxed text-foreground">{reality}</p>
      </div>
    </div>
  );
}

/** One-line "so what" attached to a figure. */
export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose -mt-2 mb-8 flex items-start gap-3 rounded-2xl bg-field-wash px-5 py-4">
      <svg className="mt-1 size-4 shrink-0 text-field" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <div className="text-sm leading-relaxed text-foreground [&>p]:m-0">
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
    <div className="paper-panel not-prose mt-5 p-6 sm:px-10 sm:py-8">
      <p className="mb-3 text-sm font-semibold text-muted-foreground">
        How this was done
      </p>
      {children && (
        <p className="mb-4 max-w-[70ch] text-sm leading-relaxed text-foreground">{children}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <span
            key={i}
            className="rounded-full border border-field/20 bg-field-wash px-3 py-1 text-xs font-semibold text-field"
          >
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}
