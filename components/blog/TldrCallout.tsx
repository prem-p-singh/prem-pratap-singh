import { Lightbulb } from "lucide-react";

interface TldrCalloutProps {
  items: string[];
}

export default function TldrCallout({ items }: TldrCalloutProps) {
  if (!items || items.length === 0) return null;

  return (
    <aside
      aria-label="Key takeaways"
      className="not-prose mb-10 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="size-4 text-foreground" strokeWidth={1.8} aria-hidden="true" />
        <p className="text-xs font-bold text-foreground tracking-wide uppercase">
          Quick visual read
        </p>
      </div>
      <ol className="grid gap-3 sm:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-xl border border-border bg-background/70 p-4 text-left"
          >
            <span className="text-2xl font-black tabular-nums text-foreground/15">0{i + 1}</span>
            <span className="mt-2 block text-sm leading-relaxed text-foreground/90">{item}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
