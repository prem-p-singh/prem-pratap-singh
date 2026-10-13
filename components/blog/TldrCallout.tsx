import { Lightbulb } from "lucide-react";

interface TldrCalloutProps {
  items: string[];
}

export default function TldrCallout({ items }: TldrCalloutProps) {
  if (!items || items.length === 0) return null;

  return (
    <aside
      aria-label="Key takeaways"
      className="not-prose mb-10 rounded-2xl bg-field-wash p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        {/* On a wash the tile takes the card colour. */}
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card text-field">
          <Lightbulb size={22} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <p className="text-sm font-semibold text-field">
          Quick visual read
        </p>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-xl bg-card p-4 text-left"
          >
            <span className="text-2xl font-semibold tabular-nums text-field">0{i + 1}</span>
            <span className="mt-2 block text-sm leading-relaxed text-foreground">{item}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
