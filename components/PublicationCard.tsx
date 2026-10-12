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

/** One publication as a reference-list row: year and type, then authors, title, venue, methods. */
export default function PublicationCard({ publication }: { publication: Publication }) {
  const { title, authors, venue, year, type, methods, links } = publication;
  const href = links?.paper && links.paper !== "#" ? links.paper : undefined;

  return (
    <div className="grid gap-x-8 gap-y-1 sm:grid-cols-[9rem_1fr]">
      <p className="text-sm leading-normal tabular-nums text-muted-foreground">
        {year}
        <span className="sm:block"> {typeLabels[type]}</span>
      </p>

      <div>
        <p className="text-sm text-muted-foreground">{authors.join(", ")}</p>
        {/* The base h3 rule is unlayered, so the sans needs the important flag to win. */}
        <h3 className="font-sans! text-wrap! mt-1 text-base font-semibold leading-snug text-foreground">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="mt-1 text-sm text-foreground">{venue}</p>
        {methods && methods.length > 0 && (
          <p className="mt-1 text-sm text-muted-foreground">{methods.join(", ")}</p>
        )}
      </div>
    </div>
  );
}
