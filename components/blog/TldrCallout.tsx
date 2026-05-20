interface TldrCalloutProps {
  items: string[];
}

export default function TldrCallout({ items }: TldrCalloutProps) {
  if (!items || items.length === 0) return null;

  return (
    <aside
      aria-label="Key takeaways"
      className="not-prose mb-10 rounded-xl border border-border bg-muted/40 p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-4 h-4 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
        <p className="text-xs font-bold text-foreground tracking-wide uppercase">
          Key Takeaways
        </p>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm sm:text-base text-foreground/90 leading-relaxed text-left"
          >
            <span className="text-muted-foreground select-none flex-shrink-0 mt-1">
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
