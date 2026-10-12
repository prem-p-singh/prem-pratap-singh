export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "preprint" | "thesis" | "book";
  methods?: string[];
  links?: {
    paper?: string;
    code?: string;
    doi?: string;
    slides?: string;
  };
  abstract?: string;
}

const typeLabels = {
  journal: "Journal",
  conference: "Conference",
  preprint: "Preprint",
  thesis: "Thesis",
  book: "Book Chapter",
};

// The previous design coloured two types: data for articles, decision for chapters.
const typeTags: Record<Publication["type"], string> = {
  journal: "border-data/20 bg-data-wash text-data",
  conference: "border-field/20 bg-field-wash text-field",
  preprint: "border-biology/20 bg-biology-wash text-biology",
  thesis: "border-field/20 bg-field-wash text-field",
  book: "border-decision/20 bg-decision-wash text-decision",
};

/** One publication as a row in the archive panel: year and type tag, then title, authors, venue, methods. */
export default function PublicationCard({ publication }: { publication: Publication }) {
  const { title, authors, venue, year, type, methods, links } = publication;
  const href = links?.paper && links.paper !== "#" ? links.paper : undefined;

  return (
    <div className="grid gap-x-6 gap-y-3 sm:grid-cols-[8.5rem_1fr]">
      <p className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
        <span className="text-base font-semibold leading-normal tabular-nums text-foreground">
          {year}
        </span>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${typeTags[type]}`}>
          {typeLabels[type]}
        </span>
      </p>

      <div>
        {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
        <h3 className="font-sans! text-wrap! text-base font-semibold leading-snug text-foreground">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-field hover:decoration-field"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{authors.join(", ")}</p>
        <p className="mt-1 text-sm text-foreground">{venue}</p>
        {methods && methods.length > 0 && (
          <p className="mt-1 text-sm text-muted-foreground">{methods.join(", ")}</p>
        )}
      </div>
    </div>
  );
}
