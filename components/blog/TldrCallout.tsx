
interface TldrCalloutProps {
  items: string[];
}

export default function TldrCallout({ items }: TldrCalloutProps) {
  if (!items || items.length === 0) return null;

  return (
    <aside
      aria-label="Key takeaways"
      className="not-prose mb-10 rounded-none bg-field-wash p-5 sm:p-6"
    >
      <div className="mb-4 flex items-center gap-3">
        <p className="text-sm font-medium text-field">
          Quick visual read
        </p>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-none bg-card p-4 text-left"
          >
            <span className="text-2xl font-medium tabular-nums text-field">0{i + 1}</span>
            <span className="mt-2 block text-sm leading-relaxed text-foreground">{item}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
